import DeleteIcon from "../Icons/DeleteIcon/DeleteIcon";
import EditIcon from "../Icons/EditIcon/EditIcon";
import LazyImage from "../LazyImage/LazyImage";
import { deleteImage } from "@/serverFunctions/images/deleteImage";
import ConfirmationDialog from "@/components/ConfirmationDialog/ConfirmationDialog";
import { useState } from "react";
import FormDialog from "../FormDialog/FormDialog";
import Input from "../Input/Input";
import { editImage } from "@/serverFunctions/images/editImage";
import ImageDialog from "../ImageDialog/ImageDialog";

type ImageContainerProps = {
  filename: string;
  alt: string;
  refreshCallback?: () => void;
};

export default function ImageContainer({
  filename,
  alt,
  refreshCallback,
}: ImageContainerProps) {
  const [previewPopupOpen, setPreviewPopupOpen] = useState(false);
  const [editPopupOpen, setEditPopupOpen] = useState(false);
  const [deletePopupOpen, setDeletePopupOpen] = useState(false);

  return (
    <div className="bg-neutral-850 p-4 border border-neutral-600 rounded-md flex flex-col gap-4">
      <span>{filename}</span>
      <LazyImage
        filename={filename}
        alt={alt}
        className="rounded-md aspect-[4/3] border border-neutral-400 border-opacity-0 hocus:border-opacity-100 transition-all duration-300 ease-out cursor-pointer"
        onClick={() => setPreviewPopupOpen(true)}
      ></LazyImage>
      <div className="flex justify-around h-6">
        <EditIcon
          className="h-full aspect-square"
          onClick={() => {
            setEditPopupOpen(true);
          }}
        ></EditIcon>
        <DeleteIcon
          className="h-full aspect-square"
          onClick={() => {
            setDeletePopupOpen(true);
          }}
        ></DeleteIcon>
      </div>
      <ConfirmationDialog
        open={deletePopupOpen}
        title="Delete Image"
        message={`Are you sure you want to delete ${filename}?`}
        onConfirm={() => {
          deleteImage(filename).then(() => {
            setDeletePopupOpen(false);
            refreshCallback?.();
          });
        }}
        onCancel={() => setDeletePopupOpen(false)}
      ></ConfirmationDialog>
      <FormDialog
        open={editPopupOpen}
        onClose={() => setEditPopupOpen(false)}
        onSubmit={(data) => {
          editImage(filename, data.get("filename") as string).then(() => {
            setEditPopupOpen(false);
            refreshCallback?.();
          });
        }}
        title="Edit Image"
      >
        <Input
          className="mt-4"
          name="filename"
          defaultValue={filename}
          placeholder="New Filename"
        ></Input>
      </FormDialog>
      <ImageDialog
        open={previewPopupOpen}
        filename={filename}
        onClose={() => setPreviewPopupOpen(false)}
      ></ImageDialog>
    </div>
  );
}

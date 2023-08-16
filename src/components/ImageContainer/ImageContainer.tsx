import DeleteIcon from "../DeleteIcon/DeleteIcon";
import EditIcon from "../EditIcon/EditIcon";
import LazyImage from "../LazyImage/LazyImage";
import { deleteImage } from "@/serverFunctions/Images/deleteImage";
import ConfirmationDialog from "@/components/ConfirmationDialog/ConfirmationDialog";
import { useState } from "react";

type ImageContainerProps = {
  filename: string;
  alt: string;
};

export default function ImageContainer({ filename, alt }: ImageContainerProps) {
  const [deletePopupOpen, setDeletePopupOpen] = useState(false);
  const [deletePopupTarget, setDeletePopupTarget] = useState("");

  return (
    <div className="bg-neutral-850 p-4 border border-neutral-600 rounded-md flex flex-col gap-4">
      <span>{filename}</span>
      <LazyImage
        filename={filename}
        alt={alt}
        className="rounded-md aspect-[4/3]"
      ></LazyImage>
      <div className="flex h-6">
        <EditIcon onClick={() => console.log("Edit")}></EditIcon>
        <DeleteIcon
          onClick={() => {
            setDeletePopupOpen(true);
            setDeletePopupTarget(filename);
          }}
        ></DeleteIcon>
      </div>

      <ConfirmationDialog
        open={deletePopupOpen}
        title="Delete Image"
        message={`Are you sure you want to delete ${deletePopupTarget}?`}
        onConfirm={() => {
          deleteImage(deletePopupTarget).then(() => {
            setDeletePopupOpen(false);
          });
        }}
        onCancel={() => {
          setDeletePopupOpen(false);
          console.log("Cancel");
        }}
      ></ConfirmationDialog>
    </div>
  );
}

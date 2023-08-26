import Button from "@/components/Button/Button";
import LazyImage from "../LazyImage/LazyImage";
import { useVisibility } from "@/hooks/useVisibility/useVisibility";

type ImageDialogProps = {
  open: boolean;
  filename: string;
  aspectRatio?: number;
  closeText?: string;
  onClose: () => void;
};

export default function ImageDialog({
  open,
  filename,
  aspectRatio,
  closeText,
  onClose,
}: ImageDialogProps) {
  const [visible, fadeIn] = useVisibility(open);

  return visible ? (
    <div
      className={`fixed bg-neutral-850 border border-neutral-500 h-[85vh] w-fit max-w-[80vw] rounded-md z-30 flex flex-col gap-2 top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 p-4 transition-opacity duration-300 ease-out ${
        fadeIn
          ? "opacity-100 pointer-events-auto"
          : "opacity-0 pointer-events-none"
      }`}
    >
      <span className="font-display text-2xl pl-2 text-neutral-100">
        {filename}
      </span>

      <div className="flex justify-center h-full overflow-hidden">
        <LazyImage
          className="h-full"
          filename={filename}
          alt={filename}
          aspectRatio={aspectRatio}
          cover={false}
          blur={false}
        ></LazyImage>
      </div>

      <div className="flex gap-4 mt-2 justify-end">
        <Button className="max-w-40 w-full max-w-[10rem]" onClick={onClose}>
          {closeText || "Close"}
        </Button>
      </div>
    </div>
  ) : null;
}

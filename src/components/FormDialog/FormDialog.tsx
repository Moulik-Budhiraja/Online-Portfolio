import { useVisibility } from "@/hooks/useVisibility/useVisibility";
import Button from "../Button/Button";

type FormDialogProps = {
  open: boolean;
  title: string;
  children: React.ReactNode;
  closeText?: string;
  confirmText?: string;
  onClose: () => void;
  onSubmit: (data: FormData) => void;
};

export default function FormDialog({
  open,
  title,
  children,
  closeText,
  confirmText,
  onClose,
  onSubmit,
}: FormDialogProps) {
  const [visible, fadeIn] = useVisibility(open);

  return visible ? (
    <div
      className={`fixed bg-neutral-850 border border-neutral-500 w-[80vw] max-w-2xl rounded-md z-30 flex flex-col gap-2 top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 p-6 transition-opacity duration-300 ease-out ${
        fadeIn
          ? "opacity-100 pointer-events-auto"
          : "opacity-0 pointer-events-none"
      }`}
    >
      <span className="font-display text-2xl text-neutral-100">{title}</span>

      <form action={onSubmit}>
        {children}

        <div className="flex gap-4 mt-2 justify-end">
          <Button
            className="max-w-40 w-full max-w-[10rem]"
            type="button"
            onClick={onClose}
          >
            {closeText || "Cancel"}
          </Button>
          <Button className="max-w-40 w-full max-w-[10rem]">
            {confirmText || "Submit"}
          </Button>
        </div>
      </form>
    </div>
  ) : null;
}

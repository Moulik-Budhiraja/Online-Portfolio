import { BlogDraft, BlogVersion } from "@prisma/client";
import DraftVersionCard from "../DraftVersionCard/DraftVersionCard";
import { useVisibility } from "@/hooks/useVisibility/useVisibility";
import Button from "../Button/Button";
import { useState } from "react";
import FormDialog from "../FormDialog/FormDialog";
import Input from "../Input/Input";
import { saveBlogVersion } from "@/serverFunctions/blog/saveBlogVersion";
import { useRouter } from "next/navigation";

type DraftVersionListProps = {
  open: boolean;
  currentContent: string;
  currentDraft: BlogDraft | null;
  versions?: BlogVersion[];
  onSelection?: (version: BlogVersion) => void;
};

export default function DraftVersionList({
  open,
  currentContent,
  currentDraft,
  versions,
  onSelection,
}: DraftVersionListProps) {
  const [visible, fadeIn] = useVisibility(open);
  const [saveVersionFormOpen, setSaveVersionFormOpen] = useState(false);

  const router = useRouter();

  return visible ? (
    <div
      className={`transition-all duration-300 ease-out overflow-y-scroll ${
        fadeIn ? "w-[15rem] xl:w-[25rem] ml-4 h-full" : "w-0 ml-0"
      }`}
    >
      <div className="flex justify-end">
        <Button onClick={() => setSaveVersionFormOpen(true)}>
          Save Version
        </Button>
      </div>
      <div className="flex flex-col gap-2 mt-2">
        <DraftVersionCard
          version={{
            id: "",
            draftId: currentDraft?.id ?? "",
            versionName: "Previous Save",
            content: currentDraft?.content ?? "",
            createdAt: new Date(),
            updatedAt: new Date(),
          }}
          onClick={onSelection}
        />
        {versions?.map((version) => (
          <DraftVersionCard
            key={version.id}
            version={version}
            onClick={onSelection}
          />
        ))}
      </div>

      <FormDialog
        title="Save Version"
        open={saveVersionFormOpen}
        onClose={() => setSaveVersionFormOpen(false)}
        onSubmit={(data) =>
          saveBlogVersion(
            currentDraft?.id ?? "",
            data.get("versionName") as string,
            currentDraft?.content ?? ""
          ).then(() => {
            setSaveVersionFormOpen(false);
            router.refresh();
          })
        }
      >
        <Input
          placeholder="Version Name"
          name="versionName"
          className="mt-4"
        ></Input>
        {currentContent !== currentDraft?.content && (
          <div className="text-yellow-500 mt-2 pb-2">
            <span className="font-bold">Warning:</span> Previous save does not
            match current editor content
          </div>
        )}
      </FormDialog>
    </div>
  ) : null;
}

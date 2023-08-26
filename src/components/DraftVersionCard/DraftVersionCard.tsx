import { BlogVersion } from "@prisma/client";

type DraftVersionCardProps = {
  version: BlogVersion;
  onClick?: (version: BlogVersion) => void;
};

export default function DraftVersionCard({
  version,
  onClick,
}: DraftVersionCardProps) {
  return (
    <div
      className="bg-neutral-850 border rounded-md border-neutral-600 p-2 w-full flex flex-col gap-1 cursor-pointer hocus:border-neutral-400 group transition-all duration-300 ease-out overflow-hidden"
      onClick={() => onClick?.(version)}
    >
      <div className="font-display text-xl group-hocus:text-neutral-200 transition-all duration-300 ease-out">
        {version.versionName}
      </div>
      <div className="text-sm whitespace-nowrap text-right text-neutral-500">
        {version.createdAt.toDateString()}
      </div>
    </div>
  );
}

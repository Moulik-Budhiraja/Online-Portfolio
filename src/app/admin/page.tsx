import LinkButton from "@/components/LinkButton/LinkButton";

export default async function Admin() {
  return (
    <div className="h-[calc(100vh-4rem)]">
      <h1 className="font-display text-4xl text-neutral-100">Admin</h1>
      <div className="mt-4 flex flex-col w-fit gap-4">
        <LinkButton className="w-fit" href="/admin/blogs">
          Manage Blogs
        </LinkButton>
        <LinkButton className="w-fit" href="/admin/images">
          Manage Images
        </LinkButton>
      </div>
    </div>
  );
}

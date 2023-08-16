import Button from "@/components/Button/Button";

export default function ImageUpload() {
  return (
    <div>
      <h1 className="font-display text-4xl text-neutral-100">Image Upload</h1>

      <form>
        <input className="" type="file" />
        <Button>Upload</Button>
      </form>
    </div>
  );
}

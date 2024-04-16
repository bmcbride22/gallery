import { FullPageImageView } from "~/common/full-page-image-view";

export default async function ImagePage({
  params: { id: ImageId },
}: {
  params: { id: string };
}) {
  return (
    <div className="flex h-full min-h-0 w-full min-w-0 overflow-y-hidden">
      <FullPageImageView photoId={ImageId} />
    </div>
  );
}

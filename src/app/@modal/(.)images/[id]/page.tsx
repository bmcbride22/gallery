import { Modal } from "./modal";
import { FullPageImageView } from "~/app/_components/FullPageImageView";

export default async function ImageModal({
  params: { id: imageId },
}: {
  params: { id: string };
}) {
  return (
    <Modal>
      <FullPageImageView photoId={imageId} />
    </Modal>
  );
}

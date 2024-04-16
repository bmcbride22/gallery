import { getImage } from "~/server/queries";
import { Modal } from "./modal";
import { FullPageImageView } from "~/common/full-page-image-view";

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

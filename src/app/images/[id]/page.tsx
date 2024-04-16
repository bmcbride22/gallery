import { getImage } from "~/server/queries";

export default async function ImagePage({
  params: { id: ImageId },
}: {
  params: { id: string };
}) {
  const idAsNumber = Number(ImageId);
  if (Number.isNaN(idAsNumber)) throw new Error("Invalid Image id");

  const image = await getImage(idAsNumber);
  return (
    <div className="flex flex-col items-center justify-center gap-12 px-4 py-16 ">
      <img src={image.url} className="w-96" />
    </div>
  );
}

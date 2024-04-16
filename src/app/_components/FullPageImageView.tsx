import { clerkClient } from "@clerk/nextjs/server";
// import { Button } from "~/components/ui/button";
import { getMyImages } from "~/server/queries";

export async function FullPageImageView(props: { photoId: string }) {
  const idAsNumber = Number(props.photoId);
  if (Number.isNaN(idAsNumber)) throw new Error("Invalid photo id");

  //   const image = await getImage(idAsNumber);
  const images = await getMyImages();
  if (images.length === 0 || images[0] === undefined)
    throw new Error("No images found");
  const image = images[0];
  const userId = image.userId;
  const userInfo = await clerkClient.users.getUser(userId);

  return (
    <div className="flex h-full w-screen min-w-0 items-center justify-center text-white">
      <div className="flex-shrink flex-grow">
        <img src={image.url} className="object-contain" alt={image.name} />
      </div>
      <div className="flex h-full w-56 flex-shrink-0 flex-col border-l">
        <div className="border-b p-2 text-center text-xl">{image.name}</div>

        <div className="p-2">
          <div>Uploaded By:</div>
          <div>{userInfo.fullName}</div>
        </div>

        <div className="p-2">
          <div>Created On:</div>
          <div>{image.createdAt.toLocaleDateString()}</div>
        </div>

        <div className="p-2">
          <form
            action={async () => {
              "use server";

              //   await deleteImage(idAsNumber);
            }}
          >
            {/* <Button type="submit" variant="destructive">
              Delete
            </Button> */}
          </form>
        </div>
      </div>
    </div>
  );
}

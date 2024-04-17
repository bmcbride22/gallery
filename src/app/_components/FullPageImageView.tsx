import { auth, clerkClient } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { toast } from "sonner";
import { Button } from "~/components/ui/button";
// import { Button } from "~/components/ui/button";
import { deleteMyImage, getImage } from "~/server/queries";

export async function FullPageImageView(props: { photoId: string }) {
  const idAsNumber = Number(props.photoId);
  if (Number.isNaN(idAsNumber)) throw new Error("Invalid photo id");

  const image = await getImage(idAsNumber);
  const userId = image.userId;
  const userInfo = await clerkClient.users.getUser(userId);
  const currentUser = auth();
  console.log("current user", currentUser.userId);
  console.log("image user", image.userId);
  console.log(currentUser.userId === image.userId);

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
          {image.userId === currentUser.userId ? (
            <form
              action={async () => {
                "use server";
                try {
                  // Mutate data
                  await deleteMyImage(idAsNumber);
                } catch (e) {
                  throw new Error("Failed to delete");
                }
                // Reroute back to the homepage in server action
                redirect("/");
              }}
            >
              <Button type="submit" variant="destructive">
                Delete
              </Button>
            </form>
          ) : null}
        </div>
      </div>
    </div>
  );
}

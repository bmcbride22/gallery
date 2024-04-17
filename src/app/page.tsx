export const dynamic = "force-dynamic";
import { SignedIn, SignedOut } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { getMyImages } from "~/server/queries";

async function Images() {
  const images = await getMyImages();

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
      <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
        <h1 className="text-5xl font-extrabold tracking-tight text-white ">
          Create <span className="text-[hsl(280,100%,70%)]">Gallery</span> App
        </h1>
        <div className="flex flex-wrap justify-center gap-6">
          {images.map((image) => (
            <div key={image.id} className="relative h-64 w-64 p-4 sm:w-1/4">
              <Link href={`/images/${image.id}`}>
                <Image
                  src={image.url}
                  style={{ objectFit: "cover" }}
                  className="h-64 w-64 rounded-lg object-cover"
                  alt={image.name}
                  height={208}
                  width={208}
                />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}

export default async function HomePage() {
  return (
    <div className="">
      <SignedOut>
        <div className="h-full w-full text-center text-2xl">
          Please sign in above
        </div>
      </SignedOut>
      <SignedIn>
        <Images />
      </SignedIn>
    </div>
  );
}

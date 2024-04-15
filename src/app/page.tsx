import Image from "next/image";
import Link from "next/link";
import { db } from "~/server/db";
export const dynamic = "force-dynamic";
import type { images as UserImage } from "~/server/db/schema";
export default async function HomePage() {
  const images = await db.query.images.findMany({
    orderBy: (model, { desc }) => desc(model.id),
  });
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
      <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
        <h1 className="text-5xl font-extrabold tracking-tight text-white ">
          Create <span className="text-[hsl(280,100%,70%)]">Gallery</span> App
        </h1>
        <div className="flex flex-wrap justify-center gap-6">
          {[...images, ...images, ...images].map((image, index) => (
            <div
              key={image.id + "-" + index}
              className="relative w-48 p-4 sm:w-1/4"
            >
              <img
                className="h-full w-full rounded-lg object-cover"
                src={image.url}
                alt="gallery"
                width={200}
                height={200}
              />
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}

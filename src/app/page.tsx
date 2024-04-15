export const dynamic = "force-dynamic";
import Image from "next/image";
import { getMyImages } from "~/server/queries";
export default async function HomePage() {
  const images = await getMyImages();
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
              <Image
                className="h-full w-full rounded-lg object-cover"
                src={image.url}
                alt={image.name}
                height={240}
                width={240}
              />
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}

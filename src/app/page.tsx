import Image from "next/image";
import Link from "next/link";
export default function HomePage() {
  const mockUrls = [
    "https://utfs.io/f/b6509bf9-9887-49de-bcea-8e8cd0c97240-sdyv66.jpg",
    "https://utfs.io/f/5d3fb550-be9a-4193-810f-16451a174a3b-3drd35.jpg",
    "https://utfs.io/f/d15830b4-b0f8-482a-969c-6d9cdd2e32ff-6fgjpr.jpg",
    "https://utfs.io/f/3b209551-3b48-4f29-9094-0750bd36a194-sajavg.jpg",
  ];
  const mockImages = mockUrls.map((url, i) => ({
    id: i + 1,
    url,
  }));

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
      <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
        <h1 className="text-5xl font-extrabold tracking-tight text-white ">
          Create <span className="text-[hsl(280,100%,70%)]">Gallery</span> App
        </h1>
        <div className="flex flex-wrap justify-center gap-6">
          {[...mockImages, ...mockImages, ...mockImages].map((image) => (
            <div key={image.id} className="relative w-48 p-4 sm:w-1/4">
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

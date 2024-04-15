"use client";
import { SignIn, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { UploadButton } from "~/lib/utils/uploadthing";
// import { ModeToggle } from "./darktoggle";

export default function Navbar() {
  const router = useRouter();
  return (
    <header className="flex items-center justify-between border-b-[1px] border-violet-800 bg-gradient-to-t from-violet-950 to-violet-800 px-4 py-4">
      <aside className="flex items-center gap-[2px]">
        <Link href={"/"} className="text-3xl font-bold text-white">
          Gallery
        </Link>
      </aside>
      <nav className=" text-white ">
        <ul className="flex list-none items-center gap-4">
          <li>
            <Link href="#">Products</Link>
          </li>
          <li>
            <Link href="#">Pricing</Link>
          </li>
          <li>
            <Link href="#">Clients</Link>
          </li>
          <li>
            <Link href="#">Resources</Link>
          </li>
          <li>
            <Link href="#">Documentation</Link>
          </li>
          <li>
            <Link href="#">Enterprise</Link>
          </li>
        </ul>
      </nav>
      <aside className="flex items-center gap-4">
        {/* <ModeToggle /> */}

        {/* <Link
          href="/dashboard"
          className="relative inline-flex h-10 overflow-hidden rounded-full p-[2px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50"
        >
          <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
          <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-slate-950 px-3 py-1 text-sm font-medium text-white backdrop-blur-3xl">
            <SignedIn>Dashboard</SignedIn>
            <SignedOut>Sign In</SignedOut>
          </span>
        </Link> */}
        <SignedIn>
          <UploadButton
            endpoint="imageUploader"
            onClientUploadComplete={() => {
              router.refresh();
            }}
          />
          <UserButton />
        </SignedIn>
        <SignedOut>
          <SignIn />
        </SignedOut>
        {/* <MenuIcon className="md:hidden" /> */}
      </aside>
    </header>
  );
}

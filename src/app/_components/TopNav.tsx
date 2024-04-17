"use client";
import { SignIn, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import Link from "next/link";

import { ModeToggle } from "./ModeToggle";
import { DropdownMenuIcon } from "@radix-ui/react-icons";
import { SimpleUploadButton } from "./SimpleUploadButton";

export default function TopNav() {
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
        <ModeToggle />
        <SignedIn>
          <SimpleUploadButton />
          <div className="min-w-12">
            <UserButton />
          </div>
        </SignedIn>
        <SignedOut>
          <SignIn />
        </SignedOut>
        <DropdownMenuIcon className="md:hidden" />
      </aside>
    </header>
  );
}

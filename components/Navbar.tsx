"use client";
import { Socials } from "@/constants";
import Image from "next/image";
import React from "react";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const pathname = usePathname();
  return (
    <div className="fixed top-0 bg-transparent z-[20] w-full flex gap-5 md:justify-between md:px-60 pt-0 pb-3 px-4 sm:px-6">
      {pathname !== "/scoreboard" && (
        <h1 className="text-white text-[45px]">
          Kostya <span className="font-thin">Kuznietsov</span>
          <span className="text-yellow-500">.</span>
        </h1>
      )}

      <div className="flex flex-row gap-5">
        {Socials.map((social) => (
          <Image
            key={social.name}
            src={social.src}
            alt={social.name}
            width={24}
            height={24}
          />
        ))}
      </div>
    </div>
  );
};

export default Navbar;

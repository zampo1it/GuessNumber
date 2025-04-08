"use client";

import Link from "next/link";
import Particle from "@/components/Particle";
import Image from "next/image";
import Game from "@/components/Game";

export default function Home() {
  return (
<>
  <Link
    href="/scoreboard"
    className="absolute top-4 right-4 z-30 text-white underline hover:text-yellow-300"
  >
    Scoreboard
  </Link>
  <main className="flex flex-col relative min-h-screen pt-30 px-4 overflow-hidden bg-cover bg-[url('/assets/bg-explosion.png')]">
  <div className="absolute right-0 top-0 h-full w-[80%] z-[2]">
      <Particle />
    </div>

    <div className="absolute right-10 md:right-40 bottom-0 z-[10]">
      <Image
        src="/assets/MoustacheMan.png"
        alt="Kostya"
        width={1024}
        height={1407}
        className="hidden md:block w-[300px] h-[420px] z-[1] md:h-[625px] md:w-[467px]"
        />
    </div>

    <Image
      src="/assets/top-left-img.png"
      alt="paint"
      width={230}
      height={230}
      className="absolute left-0 top-0"
    />

<div className="z-[10] flex flex-col items-center md:items-start justify-center w-full px-4 md:pr-[25%]">
      <Game />
    </div>
  </main>
</>
  );
}

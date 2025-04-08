"use client";

import Link from "next/link";
import Particle from "@/components/Particle";
import Image from "next/image";
import Game from "@/components/Game";
import FeedbackBox from "@/components/FeedbackBox";

export default function Home() {
  return (
<>
  <Link
    href="/scoreboard"
    className="absolute top-4 right-4 z-30 text-white underline hover:text-yellow-300"
  >
    Scoreboard
  </Link>
  <main className="flex items-center h-screen relative bg-cover bg-[url('/assets/bg-explosion.png')]">
    <div className="absolute right-0 top-0 h-full w-[80%] z-[2]">
      <Particle />
    </div>

    <div className="absolute right-10 md:right-40 bottom-0 z-[10]">
      <Image
        src="/assets/MoustacheMan.png"
        alt="Kostya"
        width={1024}
        height={1407}
        className="w-[300px] h-[420px] z-[1] md:h-[625px] md:w-[467px]"
      />
    </div>

    <Image
      src="/assets/top-left-img.png"
      alt="paint"
      width={230}
      height={230}
      className="absolute left-0 top-0"
    />

<div
  className="flex flex-col gap-3 z-[10] pt-20 items-start justify-start"
  style={{ marginLeft: "25%" }}
>      <Game />
      <div className="relative w-[100px] h-[100px] md:w-[160px] md:h-[160px] mt-5 pl-10">
        <Image
          src="/assets/rounded-text.png"
          alt="projects"
          width={160}
          height={160}
          className="slow-spin"
          priority={true}
        />
      </div>
    </div>

    <FeedbackBox />
  </main>
</>
  );
}

"use client";

import Link from "next/link";
// import Particle from "@/components/Particle";
import Image from "next/image";
import Game from "@/components/Game";

export default function Home() {
  return (
<>

  <main className="flex flex-col relative min-h-screen px-0 md:px-4 overflow-hidden bg-cover bg-[url('/assets/bg-explosion.png')] pt-0 md:pt-30">
  <div className="absolute right-0 top-0 h-full w-[80%] z-[2]">
      {/* <Particle /> */}
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

<div className="z-[10] flex flex-col w-full md:w-auto items-center md:items-start justify-center px-0 md:px-4 md:pr-[25%]">
  <Game />
</div>
<Link
  href="/feedback"
  className="fixed bottom-4 right-16 z-30 hover:scale-105 transition-transform"
>
  <Image
    src="/assets/feedback.png"
    alt="Feedback"
    width={50}
    height={50}
    className="w-[40px] h-[40px] md:w-[50px] md:h-[50px]"
  />
</Link>
<Link
  href="/scoreboard"
  className="fixed bottom-4 right-4 z-30 hover:scale-105 transition-transform"
>
  <Image
    src="/assets/scoreboard.png"
    alt="Scoreboard"
    width={50}
    height={50}
    className="w-[40px] h-[40px] md:w-[50px] md:h-[50px]"
  />
</Link>
  </main>
</>
  );
}

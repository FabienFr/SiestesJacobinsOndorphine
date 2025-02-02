"use client";
import { useRef, useEffect } from "react";
import Image from "next/image";

interface PannellumHotspot {
  pitch: number;
  yaw: number;
  createTooltipFunc: (hotSpotDiv: HTMLDivElement, args: HotspotArgs) => void;
  createTooltipArgs: HotspotArgs;
}

interface PannellumConfig {
  type: string;
  panorama: string;
  autoLoad: boolean;
  compass: boolean;
  hotSpots: PannellumHotspot[];
}

interface HotspotArgs {
  src: string;
  message: string;
}

interface Pannellum {
  viewer: (container: HTMLDivElement, config: PannellumConfig) => void;
}

export default function HomePage() {
  const panoRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!panoRef.current) return;
    const pannellum = (window as unknown as { pannellum: Pannellum }).pannellum;
    if (!pannellum) {
      console.error("Pannellum script not loaded");
      return;
    }

    function hotspotWithImage(hotSpotDiv: HTMLDivElement, args: HotspotArgs) {
      const el = document.createElement("img");
      el.src = args.src; // Our custom hotspot image
      el.style.width = "50px";
      el.style.height = "50px";
      el.classList.add("my-pulse");
      // Optional: add a pointer cursor or custom styling
      el.style.cursor = "pointer";
      // We append the <img> to the hotspot container
      hotSpotDiv.appendChild(el);

      // If you want a click action, you can do:
      el.onclick = () => {
        alert("Hotspot image clicked!");
      };
    }

    pannellum.viewer(panoRef.current, {
      type: "equirectangular",
      panorama: "/images/jacobins.jpg",
      autoLoad: true,
      compass: true,
      hotSpots: [
        {
          pitch: 16,
          yaw: 0,
          // We don't use 'type': 'info' or 'scene'; instead, define our own custom tooltip
          createTooltipFunc: hotspotWithImage,
          createTooltipArgs: {
            src: "/images/siestes.png",
            message: 'Hello from a custom tooltip!'// The image you want to display
          },
        },
      ],
    });
  }, []);

  return (
    <main style={{ width: "100vw", height: "100vh", backgroundColor: "black" }}>
      <div ref={panoRef} className="w-full h-full">
        <Image src="/images/jacobins.jpg" alt="Jacobins" layout="fill" objectFit="cover" />
      </div>
    </main>
  );
}

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
  dialogImage?: string;
  url?: string;
  size?: number;
}

interface Pannellum {
  viewer: (container: HTMLDivElement, config: PannellumConfig) => void;
}

function hotspotWithImage(hotSpotDiv: HTMLDivElement, args: HotspotArgs) {
  const el = document.createElement("img");
  el.src = args.src; // Our custom hotspot image
  const size = args.size || 50;
  el.style.width = `${size}px !important`;
  el.style.height = `${size}px !important`;
  el.classList.add("my-pulse");
  el.style.cursor = "pointer";
  hotSpotDiv.appendChild(el);

  const dialog = document.createElement("div");
  dialog.className = "custom-dialog";
  dialog.style.display = "none";

  // const closeBtn = document.createElement("button");
  // closeBtn.innerHTML = "×";
  // closeBtn.className = "dialog-close";
  // dialog.appendChild(closeBtn)

  const image = document.createElement("img");
  image.src = args.dialogImage || "";
  const isMobile = window.matchMedia("(max-width: 768px)").matches;
  image.style.maxWidth = isMobile ? "70vw" : "45vw"; 
  image.style.width = "auto";
  image.style.height = "auto";
  image.style.marginBottom = "10px";

  const content = document.createElement("div");
  
  if (args.url) {
    const link = document.createElement("a");
    link.href = args.url;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    link.textContent = args.message;
    link.style.color = "#4dabf7";
    link.style.textDecoration = "underline";
    content.appendChild(link);
  } else {
    const text = document.createElement("p");
    text.textContent = args.message;
    content.appendChild(text);
  }

  dialog.appendChild(image);
  dialog.appendChild(content);
  document.body.appendChild(dialog);

  // closeBtn.onclick = () => {
  //   dialog.style.display = "none";
  // };

  document.addEventListener("click", (event) => {
    if (!dialog.contains(event.target as Node) && 
        !el.contains(event.target as Node) && 
        dialog.style.display === "block") {
      dialog.style.display = "none";
    }
  });

  el.onclick = (event) => {
    event.stopPropagation();
    dialog.style.display = dialog.style.display === "none" ? "block" : "none";
  };
}

const HOTSPOTS: PannellumHotspot[] = [
  {
    pitch: 17,
    yaw: -32.5,
    createTooltipFunc: hotspotWithImage,
    createTooltipArgs: {
      src: "/images/siestes.png",
      message: "Les siestes",
      dialogImage: "/images/festival.jpg",
      url: "https://les-siestes.com/association",
      size: 50
    },
  },
  {
    pitch: 16,
    yaw: 0,
    createTooltipFunc: hotspotWithImage,
    createTooltipArgs: {
      src: "/images/siestes.png",
      message: "Ondorphine",
      dialogImage: "/images/scene.jpg",
      url: "https://ondorphine.club1.fr/",
      size: 50
    },
  },
  {
    pitch: 4,
    yaw: 30,
    createTooltipFunc: hotspotWithImage,
    createTooltipArgs: {
      src: "/images/siestes.png",
      message: "Ondorphine",
      dialogImage: "/images/chants.jpg",
      url: "https://ondorphine.club1.fr/",
      size: 40
    },
  },
  {
    pitch: 2,
    yaw: 51.6,
    createTooltipFunc: hotspotWithImage,
    createTooltipArgs: {
      src: "/images/siestes.png",
      message: "Couvent des Jacobins",
      dialogImage: "/images/cloitre.jpg",
      url: "https://jacobins.toulouse.fr/fr/",
      size: 40
    },
  },
  {
    pitch: 176,
    yaw: -19  ,
    createTooltipFunc: hotspotWithImage,
    createTooltipArgs: {
      src: "/images/siestes.png",
      message: "Ondorphine",
      dialogImage: "/images/nef.jpg",
      url: "https://ondorphine.club1.fr/",
      size: 20
    },
  },
  {
    pitch: 177,
    yaw: -3  ,
    createTooltipFunc: hotspotWithImage,
    createTooltipArgs: {
      src: "/images/siestes.png",
      message: "_Moltisanti_",
      dialogImage: "/images/molti.jpg",
      url: "https://pierrehumbert.fr/",
      size: 20
    },
  },
];

export default function HomePage() {
  const panoRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!panoRef.current) return;
    const pannellum = (window as unknown as { pannellum: Pannellum }).pannellum;
    if (!pannellum) {
      console.error("Pannellum script not loaded");
      return;
    }

    pannellum.viewer(panoRef.current, {
      type: "equirectangular",
      panorama: "/images/jacobins2.jpg",
      autoLoad: true,
      compass: true,
      hotSpots: HOTSPOTS,
    });
  }, []);

  return (
    <div style={{ width: "100vw", height: "100vh", backgroundColor: "white" }}>
      <div ref={panoRef} className="w-full h-full">
        <Image src="/images/jacobins.jpg" alt="Jacobins" layout="fill" objectFit="cover" />
      </div>
    </div>
  );
}

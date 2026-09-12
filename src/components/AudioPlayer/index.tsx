"use client";
import dynamic from "next/dynamic";
import { useContext } from "react";
import type { ComponentType } from "react";
import { AuthContext } from "@/contexts/AuthContext";

const ReactHowler = dynamic(() => import("react-howler") as any, { ssr: false }) as unknown as ComponentType<{
    src: string | string[];
    playing: boolean;
    loop: boolean;
    volume: number;
    onEnd: () => void;
}>;

export default function AudioPlayer() {
    const { isPlaying, volume, currentTrack, nextTrack } = useContext(AuthContext);

    return (
        <ReactHowler
            src={currentTrack}
            playing={isPlaying}
            loop={true}
            volume={volume}
            onEnd={nextTrack}
        />
    );
}
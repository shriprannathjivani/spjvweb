"use client";

import { useState, useEffect } from "react";
import Image from "@/components/BaseImage";
import { MapPinHouse, School, Navigation, Star, X } from "lucide-react";
import { temples } from "@/lib/temples";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { TextAnimate } from "@/components/ui/text-animate";
import {
    APIProvider,
    Map,
    AdvancedMarker,
    InfoWindow
} from "@vis.gl/react-google-maps";

type Temple = {
    id: number;
    name: string;
    address: string;
    image: string;
    lat: number;
    lng: number;
};

export default function Page() {
    const [selectedTemple, setSelectedTemple] = useState<Temple | null>(null);
    const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);

    // Automatically fetch user's live location on mount
    useEffect(() => {
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    setUserLocation({
                        lat: position.coords.latitude,
                        lng: position.coords.longitude,
                    });
                },
                (error) => {
                    console.warn("Geolocation permission denied or error: ", error.message);
                },
                { enableHighAccuracy: true }
            );
        }
    }, []);

    // Default center view covering India/Temples area if none selected
    const defaultCenter = { lat: 24.7176, lng: 80.2034 };
    const position = selectedTemple
        ? { lat: selectedTemple.lat, lng: selectedTemple.lng }
        : defaultCenter;

    const zoomLevel = selectedTemple ? 15 : 5;

    // Build directions URL dynamically using user's location if available
    const getDirectionsUrl = (temple: Temple) => {
        const destination = `${temple.lat},${temple.lng}`;
        if (userLocation) {
            const origin = `${userLocation.lat},${userLocation.lng}`;
            return `https://www.google.com/maps/dir/?api=1&origin=${origin}&destination=${destination}`;
        }
        return `https://www.google.com/maps/dir/?api=1&destination=${destination}`;
    };

    return (
        <section className="mx-auto max-w-7xl px-6 py-10 pt-32">
            {/* Global Style Override to remove Google's default InfoWindow container styling and default close button */}
            <style jsx global>{`
        .gm-style-iw-c {
          background: transparent !important;
          box-shadow: none !important;
          padding: 0 !important;
        }
        .gm-style-iw-d {
          overflow: hidden !important;
          max-height: none !important;
        }
        .gm-style-iw-tc::after {
          background: #111827 !important;
        }
        .gm-ui-hover-effect {
          display: none !important;
        }
      `}</style>

            {/* Heading */}
            <h2 className="flex flex-row text-4xl font-semibold tracking-tight text-gray-900 sm:text-5xl">
                <TextAnimate animation="blurInUp" startOnView delay={0.3}>
                    ज्ञान केंद्र /&nbsp;
                </TextAnimate>
                <span className="text-orange-500">
                    <TextAnimate animation="blurInUp" startOnView delay={0.5}>
                        मंदिर
                    </TextAnimate>
                </span>
            </h2>

            <TextAnimate
                animation="blurInUp"
                by="line"
                delay={0.3}
                segmentClassName="block"
                startOnView
                className="mb-12 mt-4 text-xl text-muted-foreground"
            >
                हमारे देश और विदेश भर में फैले ज्ञान केंद्र व मंदिर
            </TextAnimate>

            {/* Main Layout */}
            <div className="flex flex-col-reverse gap-8 lg:grid lg:grid-cols-[55%_45%]">
                {/* LEFT : CARD GRID */}
                <div className="grid gap-6 sm:grid-cols-2">
                    {temples.map((temple, index) => {
                        const isSelected = selectedTemple?.id === temple.id;

                        return (
                            <div
                                key={temple.id}
                                onClick={() => setSelectedTemple(temple)}
                                className="relative cursor-pointer"
                            >
                                <motion.div
                                    initial={{ y: 60, opacity: 0 }}
                                    whileInView={{ y: 0, opacity: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.4, delay: index * 0.05 }}
                                    className="h-full"
                                >
                                    <div className="absolute left-4 top-4 z-10 flex h-6 w-6 items-center justify-center rounded-full border-2 border-black bg-orange-500 text-xs text-white lg:h-8 lg:w-8 lg:text-base">
                                        {index + 1}
                                    </div>

                                    <div className="items-start gap-4 lg:block">
                                        <div className="relative h-20 w-24 shrink-0 lg:h-56 lg:w-full">
                                            <Image
                                                src={temple.image}
                                                alt={temple.name}
                                                fill
                                                className={`object-cover border-2 lg:border-4 rounded-xl lg:rounded-[38px] ${isSelected ? "border-orange-500" : "border-white"
                                                    }`}
                                            />
                                        </div>
                                        <div className="flex-1 p-2 pt-3 sm:p-5">
                                            <h3 className="mb-1 flex items-center gap-2 text-base lg:text-xl">
                                                <School size={14} className="shrink-0 text-red-600" />
                                                {temple.name}
                                            </h3>
                                            <div className="flex items-start gap-2 whitespace-pre-line text-base text-gray-500">
                                                <MapPinHouse size={14} className="mt-1 shrink-0 text-gray-600" />
                                                <span>{temple.address}</span>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            </div>
                        );
                    })}
                </div>

                {/* RIGHT : MAP */}
                <motion.div
                    initial={{ y: 60, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    className="relative h-[500px] overflow-hidden rounded-3xl sm:sticky sm:top-24 lg:h-[85vh]"
                >
                    <Button
                        onClick={() => setSelectedTemple(null)}
                        variant="outline"
                        className={`absolute right-6 top-6 z-20 cursor-pointer rounded-full border-2 border-black bg-orange-600 px-6 py-5 text-sm font-medium text-white shadow hover:bg-red-600 hover:text-white ${selectedTemple ? "" : "hidden"
                            }`}
                    >
                        सभी मंदिर देखें
                    </Button>

                    {/* Native React Google Map Component */}
                    <div className="h-full w-full rounded-3xl border-4 border-white bg-white overflow-hidden">
                        <APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || ""}>
                            <Map
                                center={position}
                                zoom={zoomLevel}
                                mapId="DEMO_MAP_ID"
                                style={{ width: "100%", height: "100%" }}
                                gestureHandling="auto"
                            >
                                {temples.map((temple) => {
                                    const isSelected = selectedTemple?.id === temple.id;

                                    return (
                                        <div key={temple.id}>
                                            <AdvancedMarker
                                                position={{ lat: temple.lat, lng: temple.lng }}
                                                onClick={() => setSelectedTemple(temple)}
                                                title={temple.name}
                                            >
                                                <div
                                                    className={`flex items-center justify-center transition-all duration-300 ${isSelected ? "scale-125 z-50" : "scale-100"
                                                        }`}
                                                >
                                                    <img
                                                        src={temple.image}
                                                        alt={temple.name}
                                                        className={`h-10 w-10 rounded-full object-cover border-2 shadow-lg ${isSelected ? "border-orange-500 ring-4 ring-orange-300" : "border-white"
                                                            }`}
                                                    />
                                                </div>
                                            </AdvancedMarker>

                                            {/* Apple Maps Style Horizontal Pill InfoWindow Popup with custom white close button */}
                                            {isSelected && (
                                                <InfoWindow
                                                    position={{ lat: temple.lat, lng: temple.lng }}
                                                    onCloseClick={() => setSelectedTemple(null)}
                                                    pixelOffset={[0, -10]}
                                                >
                                                    <div className="relative">
                                                        {/* Custom White Background Close Button with X Icon */}


                                                        {/* Main Pill Content */}
                                                        <div className="font-arya flex items-center gap-2.5 bg-white-200/25 backdrop-blur-xl text-white p-3 rounded-2xl shadow-4xl border border-white/70 w-85">

                                                            {/* Left Thumbnail */}
                                                            <div className="relative h-14 w-14 shrink-0 rounded-5xl overflow-hidden border border-white/10">
                                                                <Image
                                                                    src={temple.image}
                                                                    alt={temple.name}
                                                                    fill
                                                                    className="object-cover"
                                                                />
                                                            </div>

                                                            {/* Right Content */}
                                                            <div className="flex-1 min-w-0 pr-1">
                                                                <h3 className="text-sm/4 font-semibold tracking-tight  text-black">
                                                                    {temple.name}
                                                                </h3>
                                                                <div className="text-[13px]/4 text-gray-600 mt-0.5">
                                                                    {temple.address}
                                                                </div>
                                                            </div>
                                                            <div className="flex flex-col gap-2">
                                                                <button
                                                                    onClick={() => setSelectedTemple(null)}
                                                                    className="z-30 flex h-9 w-9 items-center cursor-pointer cursor justify-center rounded-full bg-white text-gray-700 shadow-md border border-gray-200 hover:bg-gray-100 transition-all active:scale-95"
                                                                    title="Close"
                                                                >
                                                                    <X size={14} />
                                                                </button>
                                                                {/* Navigation button */}
                                                                <a
                                                                    href={getDirectionsUrl(temple)}
                                                                    target="_blank"
                                                                    rel="noopener noreferrer"
                                                                    className="bg-orange-500 hover:bg-orange-600 text-white p-2.5 rounded-full transition-all shrink-0 shadow-md active:scale-95 flex items-center justify-center"
                                                                    title="दिशा निर्देश (Directions)"
                                                                >
                                                                    <Navigation size={14} />
                                                                </a>

                                                                
                                                            </div>
                                                        </div>
                                                    </div>
                                                </InfoWindow>
                                            )}
                                        </div>
                                    );
                                })}
                            </Map>
                        </APIProvider>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
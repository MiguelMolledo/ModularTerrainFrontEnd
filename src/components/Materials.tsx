"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { useState } from "react";

export interface MaterialInterface {
    id: number;
    name: string;
    description: string;
    image: string;
    price: number;
    dimensions: string;
    webLinks: string[];

}

function LinksPopup({ links }: { links: string[] }) {
    const [open, setOpen] = useState(false);

    const zones = [
        { label: "Europe Zone", link: links[0] },
        { label: "UK Zone", link: links[1] },
        { label: "EEUU Zone", link: links[2] },
    ];

    return (
        <div className="relative">
            <Button onClick={() => setOpen(!open)}>
                Buy Links <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
            {open && (
                <div className="absolute right-0 mt-2 w-48 bg-white border rounded shadow-lg z-10">
                    {zones.map(
                        (zone) =>
                            zone.link && (
                                <a
                                    key={zone.label}
                                    href={zone.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="block px-4 py-2 hover:bg-gray-100"
                                >
                                    {zone.label}
                                </a>
                            )
                    )}
                </div>
            )}
        </div>
    );
}

export function Materials({ materials }: { materials: MaterialInterface[] }) {
    return (
        <div className="grid grid-cols-3 gap-8">
            {materials.map((material) => (
                <Card
                    className="flex flex-col justify-between"
                    key={material.id}
                    style={{ maxWidth: "400px", maxHeight: "600px" }}
                >
                    <CardHeader>
                        <CardTitle>{material.name}</CardTitle>
                        <CardDescription>{material.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Image src={material.image} alt={material.name} width={400} height={300} />
                        <div>
                            {material.price.toString()}&nbsp;
                            <span role="img" aria-label="euro">
                                €
                            </span>
                        </div>
                    </CardContent>
                    <CardFooter>
                        <div className="ml-auto">
                            <LinksPopup links={material.webLinks} />
                        </div>
                    </CardFooter>
                </Card>
            ))}
        </div>
    );
}
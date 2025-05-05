import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react"


import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";

interface Materials {
    id: number;
    name: string;
    description: string;
    image: string;
    price: number;
    dimensions: string;
    webLinks: string[];
}


async function fetchMaterials(): Promise<Materials[]> {
    const res = await fetch("http://localhost:4000/materials");
    if (!res.ok) {
        throw new Error("Failed to fetch data");
    }
    return res.json();

}


export default async function Materials() {


    const materials = await fetchMaterials();


    return (
        <main>
            <section>
                <h1>Materials</h1>
                <div className="grid grid-cols-3 gap-8">


                    {materials.map((material: Materials) => (
                        <Card className='flex flex-col justify-between' key={material.id} style={{ maxWidth: "400px", maxHeight: "600px" }}>
                            <CardHeader>
                                <CardTitle>{material.name}</CardTitle>
                                <CardDescription>{material.description}</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <Image
                                    src={material.image}
                                    alt={material.name}
                                    width={400}
                                    height={300}
                                />
                                <p>Card Content</p>
                            </CardContent>
                            <CardFooter>

                                <Button variant="outline" size="icon">
                                    <ChevronRight />
                                </Button>
                            </CardFooter>
                        </Card>
                    ))}
                </div>
            </section>

        </main>

    )
}

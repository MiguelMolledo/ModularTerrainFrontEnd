"use client";

import { useEffect, useState } from "react";
import { Suspense } from "react";
import { Materials, MaterialInterface, CreateMaterialPopup } from "@/components/Materials";



async function fetchMaterials(): Promise<MaterialInterface[]> {
    // const res = await fetch("http://localhost:4000/materials");
    const res = await fetch("http://localhost:3001/materials/all");
    if (!res.ok) {
        throw new Error("Failed to fetch data");
    }
    return res.json();
}





export default function MaterialsPage() {


    const [materials, setMaterials] = useState<MaterialInterface[]>([]);
    useEffect(() => {
        fetchMaterials()
            .then(data => (setMaterials(data)))
            .catch(error => console.error("Error fetching materials:", error));
    }, []);


    const handleNewMaterial = (newMaterial: MaterialInterface) => ([...materials, newMaterial])


    return (
        <main>
            <section>
                <div><h1>Materials</h1></div>
                <div className="flex items-center justify-center h-20">
                    <input className="border rounded p-2" type="text" placeholder="  Search objects  " />
                    <div className="flex-1" />
                    <CreateMaterialPopup handleNewMaterial={handleNewMaterial} />
                </div>
                <Suspense fallback={<div>Loading...</div>}>
                    <Materials materials={materials} />
                </Suspense>
            </section>
        </main>
    );
}
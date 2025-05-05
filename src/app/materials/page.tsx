


import { Suspense } from "react";
import { Materials, MaterialInterface, CreateMaterialPopup } from "@/components/Materials";



async function fetchMaterials() {
    const res = await fetch("http://localhost:4000/materials");
    if (!res.ok) {
        throw new Error("Failed to fetch data");
    }
    return res.json();
}



export default async function MaterialsPage() {
    const materials = await fetchMaterials();

    return (
        <main>
            <section>
                <div><h1>Materials</h1></div>
                <div className="flex items-center justify-center h-20">
                    <input className="border rounded p-2" type="text" placeholder="  Search objects  " />
                    <div className="flex-1" />
                    <CreateMaterialPopup />
                </div>
                <Suspense fallback={<div>Loading...</div>}>
                    <Materials materials={materials} />
                </Suspense>
            </section>
        </main>
    );
}
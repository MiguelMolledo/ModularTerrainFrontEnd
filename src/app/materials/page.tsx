


import { Suspense } from "react";
import { Materials, MaterialInterface } from "@/components/Materials";

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
                <h1>Materials</h1>
                <Suspense fallback={<div>Loading...</div>}>
                    <Materials materials={materials} />
                </Suspense>
            </section>
        </main>
    );
}
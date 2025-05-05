"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ChevronRight, CirclePlus } from "lucide-react";
import {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent,
    CardFooter,
} from "@/components/ui/card";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogClose,
} from "@/components/ui/dialog";
import {
    Form,
    FormField,
    FormItem,
    FormLabel,
    FormControl,
    FormMessage,
} from "@/components/ui/form";

export interface MaterialInterface {
    id: number;
    name: string;
    description: string;
    image: string;
    price: number;
    dimensions: string;
    webLinks: string[];
    tags: string[];

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


const newMaterialSchema = z.object({
    name: z.string().min(1, "Username is required"),
    description: z.string().min(6, "Password must be at least 6 characters"),
    image: z.string(),
    webLinks: z.array(z.string()),
    price: z.number(),
    dimensions: z.string(),

});
type NewMaterialValues = z.infer<typeof newMaterialSchema>;


export function NewMaterialForm() {
    const form = useForm<NewMaterialValues>({
        resolver: zodResolver(newMaterialSchema),
        defaultValues: {
            name: "",
            description: "",
            image: "",
            webLinks: [""],
            price: 0.0,
            dimensions: "",
        },
    });

    const onSubmit = (data: NewMaterialValues) => {
        console.log("Login Data:", data);
        // Handle login logic here
    };



    return (<div>
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField name="name"
                    control={form.control}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Name </FormLabel>
                            <FormControl>
                                <Input placeholder=" Enter your Material Name" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )} />

                <FormField name="description"
                    control={form.control}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Description </FormLabel>
                            <FormControl>
                                <Input placeholder=" Enter your description" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )} />

                <FormField name="image"
                    control={form.control}
                    render={({ field }) => (
                        <FormItem>
                            <Label htmlFor="picture">Picture</Label>
                            <FormControl>
                                <Input id="picture" type="file" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )} />

                <FormField name="price"
                    control={form.control}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Price </FormLabel>
                            <FormControl>
                                <Input placeholder="0" type="number" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )} />

                <FormField name="dimensions"
                    control={form.control}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Description </FormLabel>
                            <FormControl>
                                <Input placeholder="Dimensions (3x3 inches / 16cm / 16x16 cm / 6 L" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )} />
                <FormField
                    name="webLinks"
                    control={form.control}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Web Links</FormLabel>
                            <FormControl>
                                <div className="flex flex-col gap-2">
                                    {field.value.map((link: string, idx: number) => (
                                        <div key={idx} className="flex gap-2 items-center">
                                            <Input
                                                placeholder={`Enter web link #${idx + 1}`}
                                                value={link}
                                                onChange={e => {
                                                    const newLinks = [...field.value];
                                                    newLinks[idx] = e.target.value;
                                                    field.onChange(newLinks);
                                                }}
                                            />
                                            <Button
                                                type="button"
                                                variant="destructive"
                                                size="icon"
                                                onClick={() => {
                                                    const newLinks = field.value.filter((_, i) => i !== idx);
                                                    field.onChange(newLinks.length ? newLinks : [""]);
                                                }}
                                                disabled={field.value.length === 1}
                                            >
                                                ×
                                            </Button>
                                        </div>
                                    ))}
                                    <Button
                                        type="button"
                                        variant="secondary"
                                        onClick={() => field.onChange([...field.value, ""])}
                                    >
                                        Add Link
                                    </Button>
                                </div>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit" className="w-full">
                    Create
                </Button>


            </form>
        </Form>

    </div>
    )

}



export function CreateMaterialPopup() {
    const [open, setOpen] = useState(false);

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button >
                    <CirclePlus /> New Material
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Create Material</DialogTitle>
                    <DialogDescription>
                        Create a new material by filling out the form below. Once you are done, click "Create" to save your material.
                    </DialogDescription>
                </DialogHeader>
                <NewMaterialForm />
                <DialogFooter className="sm:justify-start">
                    <DialogClose asChild>
                        <Button type="button" variant="secondary">
                            Close
                        </Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}



export function Materials({ materials }: { materials: MaterialInterface[] }) {
    return (
        <div className="grid grid-cols-3 gap-8">
            {materials.map((material) => (
                <Card
                    className="flex flex-col justify-between"
                    key={material.id}
                >
                    <CardHeader>

                        <CardTitle>{material.name}</CardTitle>
                        <CardDescription>{material.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Image src={material.image} alt={material.name} width={400} height={300} />

                    </CardContent>
                    <CardFooter>
                        <div className="flex flex-col gap-2">
                            <div className="grid grid-cols-3 gap-2">
                                {material.tags.map((tag) => (
                                    <Button
                                        key={tag}
                                        variant="secondary"

                                    >
                                        {tag}
                                    </Button>
                                ))}

                            </div>
                            <div className=" flex items-end">
                                <div>
                                    {material.price.toString()}&nbsp;
                                    <span role="img" aria-label="euro">
                                        €
                                    </span>
                                </div>
                                <div className="flex-1" />
                                <LinksPopup links={material.webLinks} />
                            </div>
                        </div>
                    </CardFooter>
                </Card>
            ))}
        </div>
    );
}





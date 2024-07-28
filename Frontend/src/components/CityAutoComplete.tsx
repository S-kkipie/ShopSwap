"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { toast } from "@/components/ui/use-toast";
import { useEffect, useState } from "react";
export interface Pais {
    iso2: string;
    iso3: string;
    country: string;
    cities: string[];
}
export interface Flag {
    name: string;
    flag: string;
    iso2: string;
    iso3: string;
}


const FormSchema = z.object({
    pais: z.string({
        required_error: "Please select a language.",
    }),
});

export default function ComboboxForm() {
    const [paises, setPaises] = useState<Pais[]>([]);
    const [flags, setFlags] = useState<Flag[]>([]);
    useEffect(() => {
        const fetchPaises = async function () {
            const response = await fetch("https://countriesnow.space/api/v0.1/countries");
            if (response.ok) {
                const data = await response.json();
                setPaises(data.data);
                console.log(data);
            }
        };
        const fetchFlags = async function () {
            const flagResponse = await fetch("https://countriesnow.space/api/v0.1/countries/flag/images");
            if (flagResponse.ok) {
                const data = await flagResponse.json();
                console.log(data);
                setFlags(data.data);
            }
        };
        fetchFlags();
        fetchPaises();
    }, []);
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
    });

    function onSubmit(data: z.infer<typeof FormSchema>) {
        toast({
            title: "You submitted the following values:",
            description: (
                <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
                    <code className="text-white">{JSON.stringify(data, null, 2)}</code>
                </pre>
            ),
        });
    }

    return (
        flags && (
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <FormField
                        control={form.control}
                        name="pais"
                        render={({ field }) => (
                            <FormItem className="flex flex-col">
                                <FormLabel>Pais</FormLabel>
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <FormControl>
                                            <Button variant="outline" role="combobox" className={cn("w-[200px] justify-between", !field.value && "text-muted-foreground")}>
                                                {field.value ? (
                                                    <p className="flex items-center gap-2 w-full">
                                                        {paises.find((pais: Pais) => pais.country === field.value)?.country} <img className="h-4 " src={flags.find((flag: Flag) => flag.name === field.value)?.flag} />
                                                    </p>
                                                ) : (
                                                    "Select Country"
                                                )}
                                                <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                            </Button>
                                        </FormControl>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-[200px] p-0">
                                        <Command>
                                            <CommandInput placeholder="Search language..." className="h-9" />
                                            <CommandList>
                                                <CommandEmpty>No language found.</CommandEmpty>
                                                <CommandGroup>
                                                    {paises.map((pais) => (
                                                        <CommandItem
                                                            value={pais.country}
                                                            key={pais.country}
                                                            onSelect={() => {
                                                                form.setValue("pais", pais.country);
                                                            }}
                                                        >
                                                            <p className="flex items-center justify-between w-full">
                                                                {pais.country} <img className="h-4 "  src={flags.find((flag: Flag) => flag.name === pais.country)?.flag}/>
                                                            </p>
                                                            <CheckIcon className={cn("ml-auto h-4 w-4", pais.country === field.value ? "opacity-100" : "opacity-0")} />
                                                        </CommandItem>
                                                    ))}
                                                </CommandGroup>
                                            </CommandList>
                                        </Command>
                                    </PopoverContent>
                                </Popover>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button type="submit">Submit</Button>
                </form>
            </Form>
        )
    );
}

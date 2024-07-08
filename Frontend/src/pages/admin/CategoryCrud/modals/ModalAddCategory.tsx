import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form.tsx";
import { Input } from "@/components/ui/input.tsx";
import { Button } from "@/components/ui/button.tsx";
import { Dialog, DialogClose, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog.tsx";
import { useAppSelector } from "@/store/hooks.ts";
import { useRef } from "react";
import { useToast } from "@/components/ui/use-toast.ts";
import { Textarea } from "@/components/ui/textarea";
const apiUrl = import.meta.env.VITE_BASE_URL;

const formSchema = z.object({
    name: z.string().min(2, {
        message: "El nombre debe tener al menos 2 caracteres.",
    }),
    description: z
        .string()
        .min(10, {
            message: "La descripcion debe tener al menos 10 caracteres.",
        })
        .max(160, {
            message: "La descripcion debe tener menos de 160 caracteres.",
        }),
});

function AddCategoryForm({ onCategoryAdded }: { onCategoryAdded: () => void }) {
    const { accessToken } = useAppSelector((state) => state.authReducer);
    const { toast } = useToast();
    const buttonRef = useRef<HTMLButtonElement>(null);
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            description: "",
        },
    });

    function onSubmit(values: z.infer<typeof formSchema>) {
        const fetchData = async () => {
            const response = await fetch(apiUrl + "/admin/models/category/create", {
                method: "POST",
                body: JSON.stringify(values),
                headers: {
                    "Content-type": "application/json; charset=UTF-8",
                    Authorization: `Bearer ${accessToken}`,
                },
            });
            if (!response.ok) {
                const message = await response.text();
                toast({
                    description: message,
                    variant: "destructive",
                });
            } else {
                onCategoryAdded();
                if (buttonRef.current) {
                    buttonRef.current.click();
                }
                const message = await response.text();
                toast({
                    description: message,
                    variant: "success",
                });
            }
        };
        fetchData();
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-8">
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Nombre</FormLabel>
                            <FormControl>
                                <Input placeholder="Ingresa el nombre de la categoria" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Descripcion</FormLabel>
                            <FormControl>
                                <Textarea placeholder="Escribe una breve descripcion de la categoria" className="resize-none" {...field} />
                            </FormControl>
                            <DialogClose asChild>
                                <Button ref={buttonRef} className="hidden" type="button"></Button>
                            </DialogClose>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <Button type="submit">Añadir categoria</Button>
            </form>
        </Form>
    );
}

export default function ModalAddCategory({ onCategoryAdded }: { onCategoryAdded: () => void }) {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button className="flex items-center justify-center w-1/2 px-5 py-2 text-sm  text-white transition-colors duration-200 bg-primary rounded-lg  w-auto gap-x-2 hover:bg-primary/90">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>Agregar categoria</span>
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Añadir una nueva categoria</DialogTitle>
                </DialogHeader>
                <AddCategoryForm onCategoryAdded={onCategoryAdded} />
            </DialogContent>
        </Dialog>
    );
}

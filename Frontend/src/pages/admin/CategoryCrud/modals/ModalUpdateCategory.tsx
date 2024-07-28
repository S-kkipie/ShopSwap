import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog.tsx";
import { DialogClose } from "@radix-ui/react-dialog";
import { Button } from "@/components/ui/button.tsx";
import { useAppSelector } from "@/store/hooks.ts";
import { useToast } from "@/components/ui/use-toast.ts";
import { useRef } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form.tsx";
import { Input } from "@/components/ui/input.tsx";
import { Category } from "@/Interfaces/Category";
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
        .max(300, {
            message: "La descripcion debe tener menos de 300 caracteres.",
        }),
});
function UpdateCategoryForm({ onCategoryUpdated, categoryToUpdate }: { onCategoryUpdated: () => void; categoryToUpdate: Category }) {
    const { accessToken } = useAppSelector((state) => state.authReducer);

    const { toast } = useToast();
    const buttonRef = useRef<HTMLButtonElement>(null);
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: categoryToUpdate.name,
            description: categoryToUpdate.description,
        },
    });

    function onSubmit(values: z.infer<typeof formSchema>) {
        const fetchData = async () => {
            const response = await fetch(apiUrl + "/admin/models/category/update/" + categoryToUpdate.id, {
                method: "PUT",
                body: JSON.stringify(values),
                headers: {
                    "Content-type": "application/json; charset=UTF-8",
                    Authorization: `Bearer ${accessToken}`,
                },
            });
            const message = await response.text();
            if (!response.ok) {
                toast({
                    description: message,
                    variant: "destructive",
                });
            } else {
                onCategoryUpdated();
                if (buttonRef.current) {
                    buttonRef.current.click();
                }
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
                                <Input placeholder="El nombre de la categoria" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />{" "}
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
                <Button type="submit">Editar la categoria</Button>
            </form>
        </Form>
    );
}

function ModalUpdateCategory({ onCategoryUpdated, categoryToUpdate }: { onCategoryUpdated: () => void; categoryToUpdate: Category }) {
    return (
        <Dialog>
            <DialogTrigger className="text-gray-500 transition-colors duration-200  hover:text-yellow-500 focus:outline-none cursor-pointer" asChild>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                </svg>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Editar el usuario</DialogTitle>
                </DialogHeader>
                <UpdateCategoryForm categoryToUpdate={categoryToUpdate} onCategoryUpdated={onCategoryUpdated} />
            </DialogContent>
        </Dialog>
    );
}

export default ModalUpdateCategory;

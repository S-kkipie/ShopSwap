import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form.tsx";

import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
const passwordSchema = z
    .object({
        currentPassword: z.string(),
        newPassword: z
            .string()
            .min(7, "La nueva contraseña debe tener al menos 7 caracteres")
            .refine((value) => /[A-Z]/.test(value), "La nueva contraseña debe tener al menos una letra mayúscula")
            .refine((value) => /[a-z]/.test(value), "La nueva contraseña debe tener al menos una letra minúscula")
            .refine((value) => /[0-9]/.test(value), "La nueva contraseña debe tener al menos un número")
            .refine((value) => /[!@#$%^&*]/.test(value), "La nueva contraseña debe tener al menos un carácter especial"),
        confirmNewPassword: z.string(),
    })
    .refine((data) => data.newPassword === data.confirmNewPassword, {
        message: "Las contraseñas nuevas no coinciden",
        path: ["confirmNewPassword"],
    });
export default function ChangePassword() {
    const form = useForm({
        resolver: zodResolver(passwordSchema),
    });

    const onSubmit = (data: any) => {
        console.log(data);
    };
    return (
        <div className=" lg:w-9/12 md:h-full   p-8 lg:py-10 lg:px-20  bg-white/80 shadow-xl rounded-xl border">
            <h1 className="text-2xl font-bold mb-8 w-full">Para crear una contraseña segura:</h1>
            <div className="flex flex-col lg:flex-row h-5/6">
                <div className="w-full lg:w-1/2 flex h-full flex-col items-center justify-around px-6">
                    <div className="space-y-6 border-l-2 border-dashed">
                        <div className="relative w-full">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="absolute -top-0.5 z-10 -ml-3.5 h-7 w-7 rounded-full text-primary">
                                <path fill-rule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clip-rule="evenodd" />
                            </svg>
                            <div className="ml-6">
                                <h4 className="font-bold text-primary">Para seleccionar una contraseña</h4>
                                <p className="mt-2 max-w-screen-sm text-sm text-gray-500">Elige algo que no sea obvio. Puede ser una combinación de números, caracteres especiales, mayúsculas y minúsculas. </p>
                            </div>
                        </div>
                        <div className="relative w-full">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="absolute -top-0.5 z-10 -ml-3.5 h-7 w-7 rounded-full text-primary">
                                <path fill-rule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clip-rule="evenodd" />
                            </svg>
                            <div className="ml-6">
                                <h4 className="font-bold text-primary">Caracteres</h4>
                                <p className="mt-2 max-w-screen-sm text-sm text-gray-500">La extensión de la contraseña debe ser de, como mínimo, 7 caracteres.</p>
                            </div>
                        </div>
                        <div className="relative w-full">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="absolute -top-0.5 z-10 -ml-3.5 h-7 w-7 rounded-full text-primary">
                                <path fill-rule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clip-rule="evenodd" />
                            </svg>
                            <div className="ml-6">
                                <h4 className="font-bold text-primary">Fechas</h4>
                                <p className="mt-2 max-w-screen-sm text-sm text-gray-500">No elijas tu nombre o fecha de nacimiento cuando configures una contraseña.</p>
                            </div>
                        </div>
                        <div className="relative w-full">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="absolute -top-0.5 z-10 -ml-3.5 h-7 w-7 rounded-full text-primary">
                                <path fill-rule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clip-rule="evenodd" />
                            </svg>
                            <div className="ml-6">
                                <h4 className="font-bold text-primary">Memorizala</h4>
                                <p className="mt-2 max-w-screen-sm text-sm text-gray-500">Memoriza tu contraseña. No conserves ningún registro de ella y no se la desveles a otros. Intenta cambiar tu contraseña regularmente.</p>
                            </div>
                        </div>{" "}
                        <div className="relative w-full">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="absolute -top-0.5 z-10 -ml-3.5 h-7 w-7 rounded-full text-primary">
                                <path fill-rule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clip-rule="evenodd" />
                            </svg>
                            <div className="ml-6">
                                <h4 className="font-bold text-primary">Privacidad</h4>
                                <p className="mt-2 max-w-screen-sm text-sm text-gray-500">Asegúrate de que otros no te vean cuando introduzcas la contraseña.</p>
                            </div>
                        </div>
                    </div>
                </div>
                <Separator className="lg:hidden my-8 lg:w-5/12" orientation="horizontal" />

                <div className="w-full lg:m-0 lg:w-1/2 h-full flex justify-center items-center">
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="flex w-full lg:w-4/6 flex-col gap-8">
                            <FormField
                                control={form.control}
                                name="currentPassword"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Contraseña Actual</FormLabel>
                                        <FormControl>
                                            <Input type="password" placeholder="Tu contraseña actual" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="newPassword"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Nueva Contraseña</FormLabel>
                                        <FormControl>
                                            <Input type="password" placeholder="Tu nueva contraseña" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="confirmNewPassword"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Confirmar Nueva Contraseña</FormLabel>
                                        <FormControl>
                                            <Input type="password" placeholder="Confirma tu nueva contraseña" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <Button type="submit">Cambiar Contraseña</Button>
                        </form>
                    </Form>
                </div>
            </div>
        </div>
    );
}

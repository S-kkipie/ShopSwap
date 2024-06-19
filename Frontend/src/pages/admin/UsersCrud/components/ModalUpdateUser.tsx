import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog.tsx";
import {DialogClose} from "@radix-ui/react-dialog";
import {Button} from "@/components/ui/button.tsx";
import {useAppSelector} from "@/store/hooks.ts";
import {useToast} from "@/components/ui/use-toast.ts";
import {useRef} from "react";
import {useForm} from "react-hook-form";
import {z} from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form.tsx";
import {Input} from "@/components/ui/input.tsx";
import {Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select.tsx";
import User from "@/Interfaces/User.ts";


const formSchema = z.object({
    username: z.string().min(2, {
        message: "El username debe tener al menos 2 caracteres.",
    }),
    password: z.string().min(8, {
        message: "La contraseña debe tener al menos 8 caracteres.",
    }),
    address: z.string().min(5, {
        message: "La dirección debe tener al menos 5 caracteres.",
    }),
    email: z.string().email({
        message: "Debes ingresar un email válido.",
    }),
    role: z.string({
        required_error: "Porfavor selecciona un rol.",
    }),
    status: z.string({
        message: "Debes seleccionar un estado"
    })
})

function UpdateUserForm({onUserUpdated, userToUpdate}: { onUserUpdated: () => void, userToUpdate: User }) {
    const {accessToken} = useAppSelector((state) => state.authReducer)

    const {toast} = useToast()
    const buttonRef = useRef<HTMLButtonElement>(null);
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            username: userToUpdate.username,
            password: userToUpdate.password,
            address: userToUpdate.address,
            email: userToUpdate.email,
            role: userToUpdate.role,
            status : userToUpdate.status.toString(),
        },
    })

    function onSubmit(values: z.infer<typeof formSchema>) {
        const fetchData = async () => {
            const response = await fetch('http://localhost:8080/api/models/user/update/' + userToUpdate.id, {
                method: 'PUT',
                body: JSON.stringify(values),
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                    "Authorization": `Bearer ${accessToken}`
                },
            });
            const data = await response.json();
            console.log(data);
            onUserUpdated();
            if (buttonRef.current) {
                buttonRef.current.click();
            }
            toast({
                description: "Usuario actualizado correctamente!",
                variant: "success",
            })
        }
        fetchData();
    }

    return (

        <Form {...form} >
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-8">
                <FormField
                    control={form.control}
                    name="username"
                    render={({field}) => (
                        <FormItem>
                            <FormLabel>Username</FormLabel>
                            <FormControl>
                                <Input placeholder="El nombre del Usuario" {...field} />
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="password"
                    render={({field}) => (
                        <FormItem>
                            <FormLabel>Password</FormLabel>
                            <FormControl>
                                <Input type="password" placeholder="Escribe una contraseña" {...field} />
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}/>
                <FormField
                    control={form.control}
                    name="address"
                    render={({field}) => (
                        <FormItem>
                            <FormLabel>Address</FormLabel>
                            <FormControl>
                                <Input type="text" placeholder="Escribe la direccion del usuario" {...field} />
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}/>
                <FormField
                    control={form.control}
                    name="email"
                    render={({field}) => (
                        <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input type="email" placeholder="Escribe un correo" {...field} />
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}/>
                <FormField
                    control={form.control}
                    name="status"
                    render={({field}) => (
                        <FormItem>
                            <FormLabel>Status</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                    <SelectTrigger className="w-[180px]">
                                        <SelectValue placeholder="Selecciona un rol"/>
                                    </SelectTrigger>
                                </FormControl>

                                <SelectContent>
                                    <SelectGroup>
                                        <SelectItem value="true">Activo</SelectItem>
                                        <SelectItem value="false">Inactivo</SelectItem>
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                            <FormMessage/>
                        </FormItem>
                    )}/>
                <FormField
                    control={form.control}
                    name="role"
                    render={({field}) => (
                        <FormItem>
                            <FormLabel>Role</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                    <SelectTrigger className="w-[180px]">
                                        <SelectValue placeholder="Selecciona un rol"/>
                                    </SelectTrigger>
                                </FormControl>

                                <SelectContent>
                                    <SelectGroup>
                                        <SelectItem value="ADMIN">Admin</SelectItem>
                                        <SelectItem value="USER">User</SelectItem>
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                            <DialogClose asChild>
                                <Button ref={buttonRef} className="hidden" type="button">
                                </Button>
                            </DialogClose>
                            <FormMessage/>
                        </FormItem>
                    )}/>
                <Button type="submit">Editar el usuario</Button>
            </form>
        </Form>
    )
}

function ModalUpdateUser({onUserUpdated, userToUpdate}: { onUserUpdated: () => void, userToUpdate: User }) {
    return (
        <Dialog>
            <DialogTrigger
                className="text-gray-500 transition-colors duration-200  hover:text-yellow-500 focus:outline-none cursor-pointer"
                asChild>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                     strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round"
                          d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"/>
                </svg>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Editar el usuario</DialogTitle>
                </DialogHeader>
                <UpdateUserForm userToUpdate={userToUpdate} onUserUpdated={onUserUpdated}/>

            </DialogContent>
        </Dialog>
    );
}

export default ModalUpdateUser;
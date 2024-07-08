import {z} from "zod";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form.tsx";
import {Input} from "@/components/ui/input.tsx";
import {Button} from "@/components/ui/button.tsx";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog.tsx";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select.tsx"
import {useAppSelector} from "@/store/hooks.ts";
import {useRef} from "react";
import {useToast} from "@/components/ui/use-toast.ts"
const apiUrl = import.meta.env.VITE_BASE_URL;

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
    })
})

function AddUserForm({onUserAdded}: { onUserAdded: () => void }) {
    const {accessToken} = useAppSelector((state) => state.authReducer)
    const {toast} = useToast()
    const buttonRef = useRef<HTMLButtonElement>(null);
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            username: "",
            password: "",
            address: "",
            email: "",
            role: undefined,
        },
    })

    function onSubmit(values: z.infer<typeof formSchema>) {

        const fetchData = async () => {
            const response = await fetch(apiUrl+ '/admin/models/user/create', {
                method: 'POST',
                body: JSON.stringify(values),
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                    "Authorization": `Bearer ${accessToken}`
                },
            });
            if (!response.ok) {
                const message = await response.text();
                toast({
                    description: message,
                    variant: "destructive",
                });
            } else {    
                onUserAdded();
                if (buttonRef.current) {
                    buttonRef.current.click();
                }
                const message = await response.text();
                toast({
                    description: message,
                    variant: "success",
                });
            }
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
                <Button type="submit">Añadir usuario</Button>
            </form>
        </Form>
    )
}

export default function ModalAddUser({onUserAdded}: { onUserAdded: () => void }) {

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button
                    className="flex items-center justify-center w-1/2 px-5 py-2 text-sm  text-white transition-colors duration-200 bg-primary rounded-lg  w-auto gap-x-2 hover:bg-primary/90">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5"
                         stroke="currentColor" className="w-5 h-5">
                        <path strokeLinecap="round" strokeLinejoin="round"
                              d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"/>
                    </svg>
                    <span>Add User</span>
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Añadir un nuevo usuario</DialogTitle>
                </DialogHeader>
                <AddUserForm onUserAdded={onUserAdded}/>

            </DialogContent>
        </Dialog>
    )
}
import {z} from "zod";
import {useAppDispatch} from "@/store/hooks.ts";
import {useNavigate} from "react-router-dom";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {loginThunkSpring} from "@/store/thunks/auth.thunk.ts";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form.tsx";
import {Input} from "@/components/ui/input.tsx";
import {Button} from "@/components/ui/button.tsx";

const formSchema = z.object({
    username: z.string().min(2, {
        message: "El username debe tener al menos 2 caracteres.",
    }),
    password: z.string().min(2, {
        message: "La contraseña debe tener al menos 8 caracteres.",
    }),
})

export function LoginForm() {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            username: "",
            password: "",
        },
    })

    function onSubmit(values: z.infer<typeof formSchema>) {
        dispatch(loginThunkSpring(values));
        navigate("/u");
        console.log(values)
    }

    return (
        <Form {...form} >
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-8 w-full">
                <FormField
                    control={form.control}
                    name="username"
                    render={({field}) => (
                        <FormItem>
                            <FormLabel>Username</FormLabel>
                            <FormControl>
                                <Input placeholder="Tu email" {...field} />
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
                                <Input type="password" placeholder="Tu contraseña" {...field} />
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}/>
                <Button type="submit">Login</Button>
            </form>
        </Form>
    )
}
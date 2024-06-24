import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAppSelector } from "@/store/hooks";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form.tsx";
import { CredentialResponse, GoogleLogin } from "@react-oauth/google";
import { Link } from "react-router-dom";

function Profile() {
    const userData = useAppSelector((state) => state.authReducer.userData);

    const formSchema = z.object({
        username: z.string().min(2, {
            message: "El username debe tener al menos 2 caracteres.",
        }),
        address: z.string().min(5, {
            message: "La dirección debe tener al menos 5 caracteres.",
        }),
        email: z.string().email({
            message: "Debes ingresar un email válido.",
        }),
    });
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            username: userData!.username,
            address: userData!.address,
            email: userData!.email,
        },
    });
    return (
        <div className="w-1/3">
            <h1 className="text-lg font-medium mb-8">Configuracion de perfil</h1>
            <div className="flex gap-5 flex-col">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(() => {})} className="flex flex-col gap-8 w-full">
                        <FormField
                            control={form.control}
                            name="username"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Username</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Tu email" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Tu email" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                    {userData!.provider === "google" ? (
                                        <span className="text-sm text-primary/60">Cuenta de Google Verificada</span>
                                    ) : (
                                        <>
                                            <p className="text-sm">Verifica tu cuenta de Google</p>
                                            <GoogleLogin
                                                onSuccess={(credentialResponse: CredentialResponse) => console.log(credentialResponse)}
                                                onError={() => {
                                                    console.log("Login Failed");
                                                }}
                                            />
                                        </>
                                    )}
                                </FormItem>
                            )}
                        />
                        <div className="flex w-full justify-between">
                            <h1>Contraseña</h1>
                            <Link to="/u/settings/change_password"><Button type="button" variant="outline">Cambiar contraseña</Button></Link>
                        </div>
                        <FormField
                            control={form.control}
                            name="address"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Tu direccion</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Tu direccion" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <div>
                            <Button className="mb-8" type="submit">
                                Guardar cambios
                            </Button>
                            <br />
                            <Button type="button" variant="destructive">
                                Desactivar Cuenta
                            </Button>
                        </div>
                    </form>
                </Form>
            </div>
        </div>
    );
}

export default Profile;

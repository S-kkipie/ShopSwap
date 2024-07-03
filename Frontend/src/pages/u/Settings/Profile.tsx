import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form.tsx";
import { CredentialResponse, GoogleLogin } from "@react-oauth/google";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/store/hooks.ts";
import { updateDataThunk } from "@/store/thunks/updateData.thunk";
import { useEffect } from "react";
import { Separator } from "@/components/ui/separator";
import { jwtDecode } from "jwt-decode";
import { GoogleCredential } from "@/Interfaces/GoogleCredential";
import { verifyGoogleThunk } from "@/store/thunks/auth.thunk";
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
    picture: z.string().startsWith("https://"),
});
function Profile() {
    const { userData, accessToken } = useAppSelector((state) => state.authReducer);
    const dispatch = useAppDispatch();
    function authGoogle(credentialResponse: CredentialResponse) {
        const decoded = jwtDecode<GoogleCredential>(credentialResponse.credential!);
        const values = {
            username: decoded.name,
            email: decoded.email,
            picture: decoded.picture,
        };
        dispatch(verifyGoogleThunk(values));
        console.log(credentialResponse);
        console.log("Authenticating with Google");
    }
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            username: userData?.username || "",
            address: userData?.address || "",
            email: userData?.email || "",
            picture: userData?.picture || "",
        },
    });

    const { reset } = form;

    useEffect(() => {
        reset({
            username: userData?.username || "",
            address: userData?.address || "",
            email: userData?.email || "",
            picture: userData?.picture || "",
        });
    }, [userData, reset]);

    function onSubmit(values: z.infer<typeof formSchema>) {
        dispatch(updateDataThunk({ ...values, accessToken: accessToken! }));
    }
    return (
        <div className="lg:w-9/12 lg:h-[90%] p-8 lg:py-10 lg:px-20  bg-white/80 shadow-xl rounded-xl border">
            <h1 className="text-3xl font-bold mb-3">Configuracion de perfil</h1>
            <p className="text-sm">Así es como te verán los demás en el sitio.</p>
            <Separator className="mt-5" orientation="horizontal" />

            <div className="w-full lg:h-full flex items-center">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="flex h-5/6 flex-col flex-wrap gap-10 lg:gap-12 w-full">
                        <FormField
                            control={form.control}
                            name="username"
                            render={({ field }) => (
                                <FormItem className="lg:w-5/12">
                                    <FormLabel>Nombre de usuario</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Tu nombre de usuario" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem className="lg:w-5/12">
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input disabled={userData?.provider === "google"} placeholder="Tu email" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                    {userData?.provider === "google" ? (
                                        <span className="text-sm text-primary/60">Cuenta de Google Verificada</span>
                                    ) : (
                                        <>
                                            <p className="text-sm">Verifica tu cuenta de Google</p>
                                            <GoogleLogin
                                                onSuccess={authGoogle}
                                                onError={() => {
                                                    console.log("Login Failed");
                                                }}
                                            />
                                        </>
                                    )}
                                </FormItem>
                            )}
                        />
                        <Separator className="lg:w-5/12" orientation="horizontal" />

                        <div className="flex  lg:w-5/12 items-center justify-between">
                            <h1>Contraseña</h1>
                            {userData?.provider !== "google" ? (
                                <Link to="/u/settings/change_password">
                                    <Button type="button" variant="outline">
                                        Cambiar contraseña
                                    </Button>
                                </Link>
                            ) : (
                                <h1 className="text-muted-foreground cursor-not-allowed w-1/2">Inicia sesion usando tu cuenta de Google</h1>
                            )}
                        </div>
                        <Separator className="lg:w-5/12" orientation="horizontal" />

                        <FormField
                            control={form.control}
                            name="address"
                            render={({ field }) => (
                                <FormItem className="lg:w-5/12">
                                    <FormLabel>Tu direccion</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Tu direccion" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="picture"
                            render={({ field }) => (
                                <FormItem className="lg:w-5/12">
                                    <FormLabel>Url de tu foto de perfil</FormLabel>
                                    <FormControl>
                                        <Input disabled={userData?.provider === "google"} placeholder="La URL de tu foto de perfil" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Separator className="lg:w-5/12" orientation="horizontal" />
                        <div className="flex gap-5">
                            <Button className="mb-8" variant="outline" type="submit">
                                Actualizar Perfil
                            </Button>
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

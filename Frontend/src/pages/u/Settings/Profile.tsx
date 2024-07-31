import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form.tsx";
import { CredentialResponse, GoogleLogin } from "@react-oauth/google";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/store/hooks.ts";
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";
import { updateDataThunk } from "@/store/thunks/updateData.thunk";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { useEffect, useState } from "react";
import { Separator } from "@/components/ui/separator";
import { jwtDecode } from "jwt-decode";
import { GoogleCredential } from "@/Interfaces/GoogleCredential";
import { verifyGoogleThunk } from "@/store/thunks/auth.thunk";
import { cn } from "@/lib/utils";
export interface country {
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
    country: z.string({
        required_error: "Porfavor selecciona un country.",
    }),
    city: z.string({
        required_error: "Please selecciona una city.",
    }),
});
function Profile() {
    const { userData, accessToken } = useAppSelector((state) => state.authReducer);

    const [countrys, setCountrys] = useState<country[]>([]);
    const [flags, setFlags] = useState<Flag[]>([]);
    const [citys, setCitys] = useState<string[]>([]);
    const dispatch = useAppDispatch();
    useEffect(() => {
        const fetchcountryes = async function () {
            const response = await fetch("https://countriesnow.space/api/v0.1/countries");
            if (response.ok) {
                const data = await response.json();
                setCountrys(data.data);
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
        fetchcountryes();
    }, []);
    function authGoogle(credentialResponse: CredentialResponse) {
        const decoded = jwtDecode<GoogleCredential>(credentialResponse.credential!);
        const values = {
            username: decoded.name,
            email: decoded.email,
            picture: decoded.picture,
            password: decoded.sub,
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
            city: userData?.city || "",
            country: userData?.country || "",
        },
    });

    const { reset } = form;

    useEffect(() => {
        reset({
            username: userData?.username || "",
            address: userData?.address || "",
            email: userData?.email || "",
            picture: userData?.picture || "",
            city: userData?.city || "",
            country: userData?.country || "",
        });
    }, [userData, reset]);

    function onSubmit(values: z.infer<typeof formSchema>) {
        dispatch(updateDataThunk({ ...values, accessToken: accessToken! }));
    }
    return (
        <div className="lg:w-10/12 lg:h-[90%] p-8 lg:py-10 lg:px-20 relative bg-white/80 shadow-xl rounded-xl border">
            <h1 className="text-3xl font-bold mb-3">Configuracion de perfil</h1>
            <p className="text-sm">Así es como te verán los demás en el sitio.</p>
            <Separator className="my-5" orientation="horizontal" />

            <div className="w-full lg:h-full flex items-center">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="flex h-5/6 flex-col flex-wrap gap-10 lg:gap- w-full">
                        <FormField
                            control={form.control}
                            name="username"
                            render={({ field }) => (
                                <FormItem className="w-full lg:w-5/12">
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
                                <FormItem className="w-full lg:w-5/12">
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
                        <Separator className="w-full lg:w-5/12" orientation="horizontal" />

                        <div className="flex  w-full lg:w-5/12 items-center justify-between">
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
                        <Separator className="w-full lg:w-5/12" orientation="horizontal" />

                        <FormField
                            control={form.control}
                            name="address"
                            render={({ field }) => (
                                <FormItem className="w-full lg:w-5/12">
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
                                <FormItem className="w-full lg:w-5/12">
                                    <FormLabel>Url de tu foto de perfil</FormLabel>
                                    <FormControl>
                                        <Input disabled={userData?.provider === "google"} placeholder="La URL de tu foto de perfil" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="country"
                            render={({ field }) => (
                                <FormItem className="flex flex-col">
                                    <FormLabel>Country</FormLabel>
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <FormControl>
                                                <Button variant="outline" role="combobox" className={cn("w-[200px] justify-between", !field.value && "text-muted-foreground")}>
                                                    {field.value ? (
                                                        <p className="flex items-center gap-2 w-full">
                                                            {countrys.find((country: country) => country.country === field.value)?.country} <img className="h-4 " src={flags.find((flag: Flag) => flag.name === field.value)?.flag} />
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
                                                        {countrys.map((country) => (
                                                            <CommandItem
                                                                value={country.country}
                                                                key={country.country}
                                                                onSelect={() => {
                                                                    form.setValue("country", country.country);
                                                                    setCitys(country.cities);
                                                                }}
                                                            >
                                                                <p className="flex items-center justify-between w-full">
                                                                    {country.country} <img className="h-4 " src={flags.find((flag: Flag) => flag.name === country.country)?.flag} />
                                                                </p>
                                                                <CheckIcon className={cn("ml-auto h-4 w-4", country.country === field.value ? "opacity-100" : "opacity-0")} />
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

                        <FormField
                            control={form.control}
                            name="city"
                            render={({ field }) => (
                                <FormItem className="flex flex-col">
                                    <FormLabel>City</FormLabel>
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <FormControl>
                                                <Button variant="outline" role="combobox" className={`w-[200px] justify-between ${!field.value && "text-muted-foreground"}`}>
                                                    {field.value || "Select City"}
                                                    <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                                </Button>
                                            </FormControl>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-[200px] p-0">
                                            <Command>
                                                <CommandInput placeholder="Search city..." className="h-9" />
                                                <CommandList>
                                                    <CommandEmpty>No city found.</CommandEmpty>
                                                    <CommandGroup>
                                                        {citys.map((city) => (
                                                            <CommandItem
                                                                value={city}
                                                                key={city}
                                                                onSelect={() => {
                                                                    form.setValue("city", city);
                                                                }}
                                                            >
                                                                <p className="flex items-center justify-between w-full">{city}</p>
                                                                <CheckIcon className={`ml-auto h-4 w-4 ${city === field.value ? "opacity-100" : "opacity-0"}`} />
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
                        <Separator className="w-full lg:w-5/12" orientation="horizontal" />
                        <div className="flex gap-5">
                            <Button className="mb-8 absolute top-16 right-16" variant="outline" type="submit">
                                Actualizar Perfil
                            </Button>
                        </div>
                    </form>
                </Form>
            </div>
        </div>
    );
}

export default Profile;

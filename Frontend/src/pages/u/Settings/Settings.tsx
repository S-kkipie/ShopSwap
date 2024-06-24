import {useAppSelector} from "@/store/hooks.ts";
import {Separator} from "@/components/ui/separator.tsx";
import {Link} from "react-router-dom";

function Settings() {

    const {userData} = useAppSelector((state) => state.authReducer)

    return (

        <div className="p-8">
            <div>
                <h1 className="text-2xl mb-1 font-bold tracking-tight">Configuraciones</h1>
                <p className="text-muted-foreground">Cambia las configuraciones de tu cuenta</p>
            </div>
            <Separator className="my-2"/>
            <nav className="flex flex-col">
                <Link to={}/>
                <Link to={}/>
                <Link to={}/>
            </nav>
            <div></div>
            <h1>Nombre de usuario: {userData!.username}</h1>
            <h2>Correo: {userData!.email}</h2>
            <h3>Direccion: {userData!.address}</h3>
            <h4>Permisos: {userData!.role}</h4>
        </div>
    );
}

export default Settings;
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAppSelector } from "@/store/hooks";
function Profile() {
    const userData = useAppSelector((state) => state.authReducer.userData);
    return (
        <div className="w-full">
            <h1 className="text-lg font-medium mb-8">Configuracion de perfil</h1>
            <div className="flex gap-5 flex-col">
                <div className=" flex items-center gap-5">
                    <label>Nombre:</label>
                    <Input type="text" value={userData!.username} />
                </div>
                <div className=" flex items-center gap-5">
                    <label>Email: </label>
                    <Input type="email" value={userData!.email} />
                    {userData!.provider === "google" ? <span className="text-sm text-primary/60">Cuenta de Google Verificada</span> : <Button variant="outline">Agregar cuenta de Google</Button>}
                </div>
                <div className=" flex items-center gap-5">
                    <label>Direccion:</label>
                    <Input type="text" value={userData!.address} />
                </div>
                <div className=" flex items-center gap-5">
                    <label>Contraseña:</label>
                    <Input type="password" />
                </div>
                <div className=" flex items-center gap-5">
                    <Button variant="destructive">Desactivar Cuenta</Button>
                    <Button>Guardar Cambios</Button>
                </div>
            </div>
        </div>
    );
}

export default Profile;

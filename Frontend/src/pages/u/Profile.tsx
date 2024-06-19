import {useAppSelector} from "@/store/hooks.ts";

function Profile() {

    const {userData }  = useAppSelector((state) => state.authReducer)

    return (
        <div>
            <h1>Nombre de usuario:  {userData!.username}</h1>
            <h2>Correo: {userData!.email}</h2>
            <h3>Direccion:  {userData!.address}</h3>
            <h4>Permisos: {userData!.role}</h4>
        </div>
    );
}

export default Profile;
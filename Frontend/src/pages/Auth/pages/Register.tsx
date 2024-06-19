import {useAppSelector} from "@/store/hooks.ts";
import {Link, Navigate} from "react-router-dom";
import {RegisterForm} from "@/pages/Auth/components/RegisterForm.tsx";

function Register() {
    const {isAuth} = useAppSelector((state) => state.authReducer)

    return !isAuth ? (
        <div className="flex">
            <div className="flex flex-col  w-5/12 rounded-r-3xl  h-screen bg-primary">
                <Link className="block w-full" to="/"><h1
                    className="text-3xl font-bold text-secondary m-8">ShopSwap</h1></Link>
                <div className="flex-1 flex items-center justify-center">
                    <img src="ecc.webp" alt='nothing' width='500' height='500'/>
                </div>
            </div>
            <div className="flex-1 h-screen flex  items-center justify-center">
                <div className=" w-1/3">
                    <h1 className="text-3xl font-bold mb-8 text-center text-primary">Register</h1>
                    <RegisterForm/>
                    <p className="mt-8 ">
                        <span>Don't have an account?</span> <Link className="text-primary font-bold"
                                                                  to="/register">Register</Link>
                    </p>
                </div>
            </div>
        </div>
    ) : <Navigate replace to="/u"/>
}

export default Register;
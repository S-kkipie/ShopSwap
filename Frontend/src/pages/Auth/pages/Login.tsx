import { Link, Navigate, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/store/hooks.ts";
import { LoginForm } from "@/pages/Auth/components/LoginForm.tsx";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CredentialResponse, GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { loginThunkSpring } from "@/store/thunks/auth.thunk";
import { GoogleCredential } from "@/Interfaces/GoogleCredential";

const apiUrl = import.meta.env.VITE_BASE_URL;

export default function Login() {
    const { isAuth } = useAppSelector((state) => state.authReducer);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    function logInGoole(credentialResponse: CredentialResponse){
        const decoded = jwtDecode<GoogleCredential>(credentialResponse.credential!);
        const values={
            username: decoded.name,
            password: decoded.sub,
        }
        dispatch(loginThunkSpring(values));
        navigate("/u");
    }
    return !isAuth ? (
        <div className="flex xl:h-screen flex-col ">
            <nav className=" flex  shadow p-5">
                <Link to="/">
                    <h1 className="text-3xl font-bold text-primary">ShopSwap</h1>
                </Link>
            </nav>
            <div className="flex-1 flex items-center justify-center">
                <div className="p-12 xl:p-0 mt-16  xl:mt-0 w-full md:w-8/12 xl:w-1/4">
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-3xl font-bold mb-2 text-center text-primary">Log in</CardTitle>
                            <CardDescription className="text-center">Enter your email and password to log in</CardDescription>
                        </CardHeader>
                        <CardContent className="flex flex-col items-center w-full">
                            <LoginForm />
                            <div className="relative m-5 w-full">
                                <div className="absolute inset-0 flex items-center">
                                    <span className="w-full border-t"></span>
                                </div>
                                <div className="relative flex justify-center text-xs uppercase">
                                    <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
                                </div>
                            </div>
                            <GoogleLogin 
                                onSuccess={logInGoole}
                                onError={() => {
                                    console.log("Login Failed");
                                }}
                            />
                            <p className="mt-8 ">
                                <span>Don't have an account?</span>{" "}
                                <Link className="text-primary font-bold" to="/register">
                                    Register
                                </Link>
                            </p>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    ) : (
        <Navigate replace to="/u" />
    );
}

import { useAppDispatch, useAppSelector } from "@/store/hooks.ts";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { RegisterForm } from "@/pages/Auth/components/RegisterForm.tsx";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CredentialResponse, GoogleLogin } from "@react-oauth/google";
import { GoogleCredential } from "@/Interfaces/GoogleCredential";
import { jwtDecode } from "jwt-decode";
import { registerWithGoogleThunk } from "@/store/thunks/auth.thunk";
function Register() {
    const { isAuth } = useAppSelector((state) => state.authReducer);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    function registerWithGoogle(credentialResponse: CredentialResponse): void {
        const decoded = jwtDecode<GoogleCredential>(credentialResponse.credential!);
        const values={
            username: decoded.name,
            password: decoded.sub,
            email: decoded.email,
            address: "No address provided",
            picture: decoded.picture,
            provider: "google"
        }
        dispatch(registerWithGoogleThunk(values));
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
                            <CardTitle className="text-3xl font-bold mb-2 text-center text-primary">Sign in</CardTitle>
                            <CardDescription className="text-center">Enter your information to sign in</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <RegisterForm />
                            <div className="relative m-5">
                                <div className="absolute inset-0 flex items-center">
                                    <span className="w-full border-t"></span>
                                </div>
                                <div className="relative flex justify-center text-xs uppercase">
                                    <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
                                </div>
                            </div>
                            <GoogleLogin 
                                onSuccess={registerWithGoogle}
                                onError={() => {
                                    console.log("Login Failed");
                                }}
                            />
                            <p className="mt-8 ">
                                <span>Ya tienes una cuenta?</span>{" "}
                                <Link className="text-primary font-bold" to="/login">
                                    Log in
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

export default Register;

import { Navigate, Outlet } from "react-router-dom";
import GeneralNav from "@/components/GeneralNav.tsx";
import Footer from "@/components/Footer.tsx";
import { useAppSelector } from "@/store/hooks.ts";

const PublicLayout = () => {
    const { isAuth } = useAppSelector((state) => state.authReducer);

    return !isAuth ? (
        <div>
            <GeneralNav />
            <Outlet />
            <Footer />
        </div>
    ) : (
        <Navigate to="/u" />
    );
};
export default PublicLayout;

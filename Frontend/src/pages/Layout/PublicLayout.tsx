import {Outlet} from "react-router-dom";
import GeneralNav from "@/components/GeneralNav.tsx";
import Footer from "@/components/ui/Footer.tsx";

function PublicLayout() {
    return (
        <div>
            <GeneralNav/>
            <Outlet/>
            <Footer/>
        </div>)
}

export default PublicLayout;
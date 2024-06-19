import {Outlet} from "react-router-dom";
import Nav from "@/components/Nav.tsx";
import Footer from "@/components/ui/Footer.tsx";

function PublicLayout() {
    return (
        <div>
            <Nav/>
            <Outlet/>
            <Footer/>
        </div>)
}

export default PublicLayout;
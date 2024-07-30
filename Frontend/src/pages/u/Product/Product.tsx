import {Separator} from "@/components/ui/separator.tsx";
import {Link, Outlet, useLocation} from "react-router-dom";

function Product() {

    const location = useLocation();
    return (
        <div className="p-3 lg:p-8 ">
            <div className="flex flex-col lg:flex-row gap-5 lg:gap-10 py-5 items-center lg:items-stretch">
                <nav className="flex self-stretch pb-2 md:self-center lg:self-stretch overflow-auto space-x-2 lg:flex-col lg:space-x-0 lg:space-y-1 lg:w-56">
                    <Link
                        className={`transition whitespace-nowrap rounded-md text-sm font-medium h-9 px-4 py-2 justify-start ${
                            location.pathname.includes('/newProduct') ? 'bg-muted' : ''
                        }`}
                        to="myOrders"
                    >
                        Mis compras
                    </Link>
                    <Link
                        className={`transition whitespace-nowrap rounded-md text-sm font-medium h-9 px-4 py-2 justify-start ${
                            location.pathname.includes('productList') ? 'bg-muted' : ''
                        }`}
                        to="productList"
                    >
                        Tus productos
                    </Link>
                    <Link
                        className={`transition whitespace-nowrap rounded-md text-sm font-medium h-9 px-4 py-2 justify-start ${
                            location.pathname.includes('appareance') ? 'bg-muted' : ''
                        }`}
                        to="appareance"
                    >
                        Personalizacion
                    </Link>
                    <Link
                        className={`transition whitespace-nowrap rounded-md text-sm font-medium h-9 px-4 py-2 justify-start ${
                            location.pathname.includes('dashboard') ? 'bg-muted' : ''
                        }`}
                        to="dashboard"
                    >
                        Dashboard
                    </Link>
                </nav>
                <Separator className="mx-2 lg:hidden" orientation="horizontal"/>
                <Separator className="mx-2 h-auto" orientation="vertical"/>
                <Outlet/>
            </div>
        </div>
    );
}

export default Product;
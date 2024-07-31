import {
    Dialog, DialogHeader,
    DialogContent,
    DialogTitle, DialogDescription,
    DialogTrigger, DialogFooter
} from "@/components/ui/dialog.tsx";
import {Button} from "@/components/ui/button.tsx";
import {toast} from "@/components/ui/use-toast.ts";
import {useAppSelector} from "@/store/hooks.ts";
import {DialogClose} from "@radix-ui/react-dialog";
const apiUrl = import.meta.env.VITE_BASE_URL;


function ModalDeleteProduct({productId, productName, onProductDeleted }: { productId: number, productName: string, onProductDeleted: () => void}) {
    const {accessToken} = useAppSelector((state) => state.authReducer)
    const fetchDeleteProduct = async () => {
        const response = await fetch(apiUrl+ "/u/models/product/delete/" + productId, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + accessToken,
            },
        })
        const message = await response.text();
        if (response.ok) {
            toast(
                {
                    description: message,
                    variant: "success"
                }
            )
            onProductDeleted();
        } else {
            toast(
                {
                    description: message,
                    variant: "destructive"
                }
            )
        }

    }
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button type="button" variant="destructive">Eliminar</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle className="text-xl">Estas seguro de esto?</DialogTitle>
                    <DialogDescription asChild>
                        <h1 className="text-lg">Esta accion eliminara por completo a <span
                            className="font-bold">{productName}</span></h1>
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <DialogClose asChild>
                        <Button variant="destructive" onClick={fetchDeleteProduct}>Confirm</Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}

export default ModalDeleteProduct;
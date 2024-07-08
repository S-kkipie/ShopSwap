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


function ModalConfirmDeleteCategory({categoryId, categoryName, onCategoryDeleted }: { categoryId: number, categoryName: string, onCategoryDeleted: () => void}) {
    const {accessToken} = useAppSelector((state) => state.authReducer)
    const fetchDeleteCategory = async () => {
        const response = await fetch(apiUrl+ "/admin/models/category/delete/" + categoryId, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + accessToken,
            },
        })
        if (response.ok) {
            toast(
                {
                    description: "Categoria eliminada correctamente",
                    variant: "success"
                }
            )
            onCategoryDeleted();
        } else {
            toast(
                {
                    description: "Error al eliminar la categoria",
                    variant: "destructive"
                }
            )
        }

    }
    return (
        <Dialog>
            <DialogTrigger
                className="text-gray-500 transition-colors duration-200 hover:text-red-500 focus:outline-none">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                     strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round"
                          d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"/>
                </svg>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle className="text-xl">Estas seguro de esto?</DialogTitle>
                    <DialogDescription asChild>
                        <h1 className="text-lg">Esta accion eliminara por completo a <span
                            className="font-bold">{categoryName}</span></h1>
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <DialogClose asChild>
                        <Button variant="destructive" onClick={fetchDeleteCategory}>Confirm</Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}

export default ModalConfirmDeleteCategory;
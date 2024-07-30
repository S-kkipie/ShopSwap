import { useAppSelector } from "@/store/hooks.ts";
import { useEffect, useState } from "react";
import ModalAddUser from "@/pages/admin/UsersCrud/modals/ModalAddUser";
import ModalUpdateUser from "@/pages/admin/UsersCrud/modals/ModalUpdateUser";
import User from "@/Interfaces/User.ts";
import ModalConfirmDeleteUser from "./modals/ModalConfirmDeleteUser";
const apiUrl = import.meta.env.VITE_BASE_URL;

function CrudUsers() {
    const [refreshData, setRefreshData] = useState(false); // Nuevo estado
    const { userData, accessToken } = useAppSelector((state) => state.authReducer);
    const [fetchUsers, setFetchUsers] = useState<User[]>([]);
    const fetchUsersData = async () => {
        const response = await fetch(apiUrl + "/admin/models/user/all", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${accessToken}`,
            },
        });
        const data = await response.json();
        setFetchUsers(data);
        console.log(data);
    };
    useEffect(() => {
        fetchUsersData();
    }, [accessToken, refreshData]);

    return userData!.role == "ADMIN" ? (
        <section className="container px-4 mx-auto">
            <div className="flex items-center justify-between">
                <div className="flex items-center mt-4 gap-x-3">
                    <h2 className="text-lg font-medium text-gray-800 ">Users</h2>
                    <span className="px-3 py-1 text-xs text-white bg-primary rounded-full ">{fetchUsers.length}</span>
                </div>
                <div className="flex items-center mt-4 gap-x-3">
                    <ModalAddUser onUserAdded={() => setRefreshData(!refreshData)} />
                </div>
            </div>

            <div className="flex flex-col mt-6">
                <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                        <div className="overflow-hidden border border-gray-200 ">
                            <table className="min-w-full divide-y divide-gray-200 ">
                                <thead className="bg-gray-50 ">
                                    <tr>
                                        <th scope="col" className="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500 ">
                                            <div className="flex items-center gap-x-3">
                                                <input type="checkbox" className="text-blue-500 border-gray-300 rounded " />
                                                <span>ID</span>
                                            </div>
                                        </th>
                                        <th scope="col" className="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500 ">
                                            Name
                                        </th>

                                        <th scope="col" className="px-12 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 ">
                                            <button className="flex items-center gap-x-2">
                                                <span>Status</span>

                                                <svg className="h-3" viewBox="0 0 10 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M2.13347 0.0999756H2.98516L5.01902 4.79058H3.86226L3.45549 3.79907H1.63772L1.24366 4.79058H0.0996094L2.13347 0.0999756ZM2.54025 1.46012L1.96822 2.92196H3.11227L2.54025 1.46012Z" fill="currentColor" stroke="currentColor" strokeWidth="0.1" />
                                                    <path d="M0.722656 9.60832L3.09974 6.78633H0.811638V5.87109H4.35819V6.78633L2.01925 9.60832H4.43446V10.5617H0.722656V9.60832Z" fill="currentColor" stroke="currentColor" strokeWidth="0.1" />
                                                    <path
                                                        d="M8.45558 7.25664V7.40664H8.60558H9.66065C9.72481 7.40664 9.74667 7.42274 9.75141 7.42691C9.75148 7.42808 9.75146 7.42993 9.75116 7.43262C9.75001 7.44265 9.74458 7.46304 9.72525 7.49314C9.72522 7.4932 9.72518 7.49326 9.72514 7.49332L7.86959 10.3529L7.86924 10.3534C7.83227 10.4109 7.79863 10.418 7.78568 10.418C7.77272 10.418 7.73908 10.4109 7.70211 10.3534L7.70177 10.3529L5.84621 7.49332C5.84617 7.49325 5.84612 7.49318 5.84608 7.49311C5.82677 7.46302 5.82135 7.44264 5.8202 7.43262C5.81989 7.42993 5.81987 7.42808 5.81994 7.42691C5.82469 7.42274 5.84655 7.40664 5.91071 7.40664H6.96578H7.11578V7.25664V0.633865C7.11578 0.42434 7.29014 0.249976 7.49967 0.249976H8.07169C8.28121 0.249976 8.45558 0.42434 8.45558 0.633865V7.25664Z"
                                                        fill="currentColor"
                                                        stroke="currentColor"
                                                        strokeWidth="0.3"
                                                    />
                                                </svg>
                                            </button>
                                        </th>
                                        <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 ">
                                            <button className="flex items-center gap-x-2">
                                                <span>Role</span>
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-4 h-4">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z" />
                                                </svg>
                                            </button>
                                        </th>

                                        <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 ">
                                            Password
                                        </th>

                                        <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 ">
                                            Edit
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200 ">
                                    {fetchUsers.map((user) => (
                                        <TableRow user={user} key={user.id} setRefreshData={setRefreshData} refreshData={refreshData} />
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    ) : null;
}

function TableRow({ user, setRefreshData, refreshData }: { user: User; setRefreshData: (value: boolean) => void; refreshData: boolean }) {
    return (
        <tr>
            <td className="px-4 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
                <div className="inline-flex items-center gap-x-3">
                    <input type="checkbox" className="text-blue-500 border-gray-300 rounded " />
                    <div className="flex items-center gap-x-2">
                        <h2 className="font-medium text-gray-800  ">{user.id}</h2>
                    </div>
                </div>
            </td>
            <td className="px-4 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
                <div className="inline-flex items-center gap-x-3">
                    <div className="flex items-center gap-x-2">
                        <img className="object-cover w-10 h-10 rounded-full" src={user.picture ? user.picture : "https://w7.pngwing.com/pngs/578/405/png-transparent-user-person-profile-avatar-man-male-human-login-username-people.png"} alt="" />
                        <div>
                            <h2 className="font-medium text-gray-800  ">{user.username}</h2>
                            <p className="text-sm font-normal text-gray-600 ">{user.email}</p>
                        </div>
                    </div>
                </div>
            </td>
            <td className="px-12 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
                <div className={`inline-flex items-center px-3 py-1 rounded-full gap-x-2 ${user.status ? "bg-emerald-100/60" : "bg-red-100/60"}`}>
                    {
                        user.status ? (
                            <>
                                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500"></span>
                                <h2 className="text-sm font-normal text-emerald-500">Active</h2>
                            </>
                        ) : (
                            <>
                                <span className="h-1.5 w-1.5 rounded-full bg-red-500"></span>
                                <h2 className="text-sm font-normal text-red-500">Inactive</h2>
                            </>
                        )
                    }
                </div>
            </td>
            <td className="px-4 py-4 text-sm text-gray-500 whitespace-nowrap">{user.role}</td>
            <td className="px-4 py-4 text-sm text-gray-500  whitespace-nowrap">{user.password}</td>
            <td className="px-4 py-4 text-sm whitespace-nowrap">
                <div className="flex items-center gap-x-6">
                    <ModalConfirmDeleteUser userId={user.id} userName={user.username} onUserDeleted={() => setRefreshData(!refreshData)} />
                    <ModalUpdateUser onUserUpdated={() => setRefreshData(!refreshData)} userToUpdate={user} />
                </div>
            </td>
        </tr>
    );
}

export default CrudUsers;

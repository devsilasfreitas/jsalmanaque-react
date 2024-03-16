import { Outlet } from "react-router-dom";
import AdminHeader from "../components/AdminHeader";
import { useAuth } from "../contexts/UserContext";
import { createContext, useState } from "react";

export const useName = createContext();

export default function AdminLayout () {
    const {user} = useAuth();
    const [displayName, setDisplayName] = useState(user.displayName);

    return (
        <div>
            <AdminHeader displayName={displayName}/>
            <main>
                <useName.Provider value={[displayName, setDisplayName]}>
                    <Outlet />
                </useName.Provider>
            </main>
        </div>
    )
}
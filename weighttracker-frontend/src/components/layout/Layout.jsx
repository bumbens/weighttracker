import Header from "./Header";
import { Outlet } from "react-router-dom";

function Layout({ user }) {
    return (
        <div>
            <Header user={user} />
            <Outlet />
        </div>
    )
}

export default Layout
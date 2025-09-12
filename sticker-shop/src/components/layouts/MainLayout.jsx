import { Outlet } from 'react-router-dom';
import Header from "../Header";
import Navbar from "../NavBar";

const MainLayout = () => {
    return (
        <div className="flex flex-col min-h-s">
            <Navbar />
            <Header />
            <main>
                <Outlet />
            </main>
        </div>
    );
};

export default MainLayout;

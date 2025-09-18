import { Outlet } from 'react-router-dom';
import Header from "../Header";
import Navbar from "../NavBar";
import { Toaster } from 'react-hot-toast';

const MainLayout = () => {
    return (
        <div className="flex flex-col min-h-s">
            <Navbar />
            <Header />
            <main>
                <Outlet />
            </main>
            <Toaster/>
        </div>
    );
};

export default MainLayout;

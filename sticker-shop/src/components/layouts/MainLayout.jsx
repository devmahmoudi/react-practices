import Navbar from "../NavBar";

const MainLayout = ({ children }) => {
    return (
        <div className="flex flex-col min-h-s">
            <Navbar />
            <main>{children}</main>
        </div>
    );
};

export default MainLayout;

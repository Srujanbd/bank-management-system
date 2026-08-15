import { useState } from "react";
import { Outlet } from "react-router-dom";

import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

function MainLayout() {

    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <div className="app-layout">

            <Sidebar
                sidebarOpen={sidebarOpen}
                setSidebarOpen={setSidebarOpen}
            />

            <div className="main-section">

                <Navbar />

                <button
                    className="mobile-menu-btn"
                    onClick={() =>
                        setSidebarOpen(!sidebarOpen)
                    }
                    aria-label="Open menu"
                >
                    ☰
                </button>

                <main className="page-content">
                    <Outlet />
                </main>

            </div>

        </div>
    );
}

export default MainLayout;
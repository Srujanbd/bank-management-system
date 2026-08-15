import { NavLink } from "react-router-dom";

function Sidebar({ sidebarOpen, setSidebarOpen }) {

    const handleNavigation = () => {
        setSidebarOpen(false);
    };

    return (
        <>
            {/* Mobile overlay */}
            {sidebarOpen && (
                <div
                    className="sidebar-overlay"
                    onClick={() => setSidebarOpen(false)}
                ></div>
            )}

            <aside
                className={`sidebar ${
                    sidebarOpen ? "sidebar-open" : ""
                }`}
            >

                <div className="sidebar-logo">

                    <div className="logo-icon">
                        🏦
                    </div>

                    <div>
                        <h2>BankSys</h2>
                        <span>Management</span>
                    </div>

                </div>

                <nav className="sidebar-nav">

                    <p className="nav-title">
                        MAIN MENU
                    </p>

                    <NavLink
                        to="/"
                        className="nav-link"
                        onClick={handleNavigation}
                    >
                        <span>📊</span>
                        Dashboard
                    </NavLink>

                    <NavLink
                        to="/banks"
                        className="nav-link"
                        onClick={handleNavigation}
                    >
                        <span>🏦</span>
                        Banks
                    </NavLink>

                    <NavLink
                        to="/accounts"
                        className="nav-link"
                        onClick={handleNavigation}
                    >
                        <span>👤</span>
                        Accounts
                    </NavLink>

                    <NavLink
                        to="/addresses"
                        className="nav-link"
                        onClick={handleNavigation}
                    >
                        <span>📍</span>
                        Addresses
                    </NavLink>

                    <NavLink
                        to="/transactions"
                        className="nav-link"
                        onClick={handleNavigation}
                    >
                        <span>💳</span>
                        Transactions
                    </NavLink>

                </nav>

                <div className="sidebar-bottom">

                    <div className="admin-profile">

                        <div className="avatar">
                            S
                        </div>

                        <div>
                            <strong>Admin</strong>
                            <small>Bank Manager</small>
                        </div>

                    </div>

                </div>

            </aside>
        </>
    );
}

export default Sidebar;
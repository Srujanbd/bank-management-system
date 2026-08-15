import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useNotifications } from "../context/NotificationContext";

function Navbar() {
    const navigate = useNavigate();
    const {
    notifications,
    unreadCount,
    markAsRead,
    markAllAsRead,
    clearNotifications
} = useNotifications();

    const [notificationsOpen, setNotificationsOpen] =
        useState(false);

    const [profileOpen, setProfileOpen] =
        useState(false);

    const notificationRef = useRef(null);
    const profileRef = useRef(null);
    const handleLogout = () => {

    localStorage.removeItem(
        "bankAdminLoggedIn"
    );

    setProfileOpen(false);

    navigate("/login");
};


    useEffect(() => {

        const handleClickOutside = (event) => {

            if (
                notificationRef.current &&
                !notificationRef.current.contains(event.target)
            ) {
                setNotificationsOpen(false);
            }

            if (
                profileRef.current &&
                !profileRef.current.contains(event.target)
            ) {
                setProfileOpen(false);
            }
        };

        document.addEventListener(
            "mousedown",
            handleClickOutside
        );

        return () => {
            document.removeEventListener(
                "mousedown",
                handleClickOutside
            );
        };

    }, []);

    const toggleNotifications = () => {

        setNotificationsOpen(
            !notificationsOpen
        );

        setProfileOpen(false);
    };

    const toggleProfile = () => {

        setProfileOpen(!profileOpen);

        setNotificationsOpen(false);
    };

    return (
        <header className="navbar">

            <div className="navbar-title">

                <h1>
                    Bank Management
                </h1>

                <p>
                    Manage your banking operations
                </p>

            </div>


            <div className="navbar-actions">

                {/* Notifications */}

                <div
                    className="notification-wrapper"
                    ref={notificationRef}
                >

                    <button
                        className="notification-btn"
                        onClick={toggleNotifications}
                        aria-label="Notifications"
                    >
                        🔔

             {unreadCount > 0 && (
    <span className="notification-badge">
        {unreadCount}
    </span>
)}

                    </button>


                    {notificationsOpen && (

                        <div className="notification-dropdown">

                            <div className="dropdown-header">

                                <strong>
                                    Notifications
                                </strong>

                                <span>
                                    {notifications.length} new
                                </span>

                            </div>


                           <div className="notification-list">

    {notifications.length === 0 ? (

        <div className="no-notifications">
            <span>🔔</span>

            <p>
                No notifications yet
            </p>

            <small>
                Your transaction updates will appear here.
            </small>
        </div>

    ) : (

        notifications.map((notification) => (

           <div
    className={`notification-item ${
        !notification.read
            ? "notification-unread"
            : ""
    }`}
    key={notification.id}
    onClick={() =>
        markAsRead(notification.id)
    }
>

                <div className="notification-icon">
                    {notification.icon}
                </div>

                <div className="notification-content">

                    <strong>
                        {notification.title}
                    </strong>

                    <p>
                        {notification.message}
                    </p>

                    <small>
                        {notification.time}
                    </small>

                </div>

            </div>

        ))

    )}

</div>


                            <div className="dropdown-footer">

                               {notifications.length > 0 && (
    <div className="notification-footer-actions">

        {unreadCount > 0 && (
            <button
                onClick={markAllAsRead}
            >
                Mark all as read
            </button>
        )}

        <button
            onClick={clearNotifications}
        >
            Clear All
        </button>

    </div>
)}

                            </div>

                        </div>

                    )}

                </div>


                {/* Admin Profile */}

                <div
                    className="profile-wrapper"
                    ref={profileRef}
                >

                    <button
                        className="navbar-user"
                        onClick={toggleProfile}
                    >

                        <div className="avatar">
                            S
                        </div>

                        <div className="navbar-user-info">

                            <strong>
                                Admin
                            </strong>

                            <small>
                                Administrator
                            </small>

                        </div>

                        <span className="profile-arrow">
                            ▾
                        </span>

                    </button>


                    {profileOpen && (

                        <div className="profile-dropdown">

                            <div className="profile-dropdown-header">

                                <div className="large-avatar">
                                    S
                                </div>

                                <div>

                                    <strong>
                                        Admin
                                    </strong>

                                    <small>
                                        Bank Manager
                                    </small>

                                </div>

                            </div>


                            <div className="profile-menu">

                                <button
    onClick={() => {
        window.location.href = "/admin/profile";
    }}
>
    👤
    <span>
        Admin Profile
    </span>
</button>

                                <button
    onClick={() => {
        window.location.href = "/settings";
    }}
>
    ⚙️
    <span>
        Settings
    </span>
</button>

                            </div>


                            <div className="profile-logout">

                                <button onClick={handleLogout}>
    🚪
    <span>
        Logout
    </span>
</button>

                            </div>

                        </div>

                    )}

                </div>

            </div>

        </header>
    );
}

export default Navbar;
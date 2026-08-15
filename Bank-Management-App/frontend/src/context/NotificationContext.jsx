import { createContext, useContext, useState } from "react";

const NotificationContext = createContext();

export function NotificationProvider({ children }) {

    const [notifications, setNotifications] = useState(() => {

        const saved =
            localStorage.getItem("bankNotifications");

        return saved
            ? JSON.parse(saved)
            : [];
    });

    const addNotification = ({
        title,
        message,
        icon = "🔔"
    }) => {

        const notification = {
            id: Date.now(),
            title,
            message,
            icon,
            time: new Date().toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit"
            }),
            read: false
        };

        setNotifications((previous) => {

            const updated = [
                notification,
                ...previous
            ].slice(0, 20);

            localStorage.setItem(
                "bankNotifications",
                JSON.stringify(updated)
            );

            return updated;
        });
    };

    const markAsRead = (id) => {

        setNotifications((previous) => {

            const updated = previous.map(
                (notification) =>
                    notification.id === id
                        ? {
                            ...notification,
                            read: true
                        }
                        : notification
            );

            localStorage.setItem(
                "bankNotifications",
                JSON.stringify(updated)
            );

            return updated;
        });
    };

    const markAllAsRead = () => {

        setNotifications((previous) => {

            const updated = previous.map(
                (notification) => ({
                    ...notification,
                    read: true
                })
            );

            localStorage.setItem(
                "bankNotifications",
                JSON.stringify(updated)
            );

            return updated;
        });
    };

    const clearNotifications = () => {

        setNotifications([]);

        localStorage.removeItem(
            "bankNotifications"
        );
    };

    const unreadCount = notifications.filter(
        (notification) => !notification.read
    ).length;

    return (
        <NotificationContext.Provider
            value={{
                notifications,
                unreadCount,
                addNotification,
                markAsRead,
                markAllAsRead,
                clearNotifications
            }}
        >
            {children}
        </NotificationContext.Provider>
    );
}

export function useNotifications() {

    return useContext(
        NotificationContext
    );
}
import { useState } from "react";
import { useToast } from "../context/ToastContext";

function Settings() {

    const { showToast } = useToast();

    const [settings, setSettings] = useState({
        transactionNotifications: true,
        accountNotifications: true,
        bankNotifications: true,
        compactLayout: false
    });

    const handleToggle = (name) => {

        setSettings({
            ...settings,
            [name]: !settings[name]
        });
    };

    const handleSave = () => {

        showToast(
            "Settings saved successfully",
            "success"
        );
    };

    return (
        <div className="settings-page">

            <div className="page-header">

                <div>

                    <h2>Settings</h2>

                    <p>
                        Manage your BankSys preferences
                    </p>

                </div>

            </div>


            <div className="settings-card">

                <div className="settings-section">

                    <div className="settings-section-header">

                        <div>
                            <h3>Notifications</h3>

                            <p>
                                Choose which banking activities
                                you want to receive notifications for.
                            </p>
                        </div>

                        <span className="settings-icon">
                            🔔
                        </span>

                    </div>


                    <div className="setting-row">

                        <div>

                            <strong>
                                Transaction Notifications
                            </strong>

                            <small>
                                Deposit, withdrawal and transfer updates
                            </small>

                        </div>

                        <label className="switch">

                            <input
                                type="checkbox"
                                checked={
                                    settings.transactionNotifications
                                }
                                onChange={() =>
                                    handleToggle(
                                        "transactionNotifications"
                                    )
                                }
                            />

                            <span className="slider"></span>

                        </label>

                    </div>


                    <div className="setting-row">

                        <div>

                            <strong>
                                Account Notifications
                            </strong>

                            <small>
                                New account creation and account updates
                            </small>

                        </div>

                        <label className="switch">

                            <input
                                type="checkbox"
                                checked={
                                    settings.accountNotifications
                                }
                                onChange={() =>
                                    handleToggle(
                                        "accountNotifications"
                                    )
                                }
                            />

                            <span className="slider"></span>

                        </label>

                    </div>


                    <div className="setting-row">

                        <div>

                            <strong>
                                Bank Notifications
                            </strong>

                            <small>
                                Bank creation and bank updates
                            </small>

                        </div>

                        <label className="switch">

                            <input
                                type="checkbox"
                                checked={
                                    settings.bankNotifications
                                }
                                onChange={() =>
                                    handleToggle(
                                        "bankNotifications"
                                    )
                                }
                            />

                            <span className="slider"></span>

                        </label>

                    </div>

                </div>


                <div className="settings-section">

                    <div className="settings-section-header">

                        <div>
                            <h3>Appearance</h3>

                            <p>
                                Customize the way BankSys looks.
                            </p>
                        </div>

                        <span className="settings-icon">
                            🎨
                        </span>

                    </div>


                    <div className="setting-row">

                        <div>

                            <strong>
                                Compact Layout
                            </strong>

                            <small>
                                Use smaller spacing throughout the application
                            </small>

                        </div>

                        <label className="switch">

                            <input
                                type="checkbox"
                                checked={
                                    settings.compactLayout
                                }
                                onChange={() =>
                                    handleToggle(
                                        "compactLayout"
                                    )
                                }
                            />

                            <span className="slider"></span>

                        </label>

                    </div>

                </div>


                <div className="settings-actions">

                    <button
                        className="primary-btn"
                        onClick={handleSave}
                    >
                        Save Settings
                    </button>

                </div>

            </div>

        </div>
    );
}

export default Settings;
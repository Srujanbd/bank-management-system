import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "../context/ToastContext";

function Login() {

    const navigate = useNavigate();
    const { showToast } = useToast();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = (e) => {

        e.preventDefault();

        if (!username || !password) {
            showToast(
                "Please enter username and password",
                "error"
            );
            return;
        }

        // Temporary frontend authentication
        localStorage.setItem(
            "bankAdminLoggedIn",
            "true"
        );

        showToast(
            "Login successful",
            "success"
        );

        navigate("/");
    };

    return (
        <div className="login-page">

            <div className="login-card">

                <div className="login-logo">
                    🏦
                </div>

                <h1>BankSys</h1>

                <p className="login-subtitle">
                    Bank Management System
                </p>

                <form onSubmit={handleLogin}>

                    <div className="form-group">

                        <label>
                            Username
                        </label>

                        <input
                            type="text"
                            value={username}
                            onChange={(e) =>
                                setUsername(e.target.value)
                            }
                            placeholder="Enter username"
                        />

                    </div>


                    <div className="form-group">

                        <label>
                            Password
                        </label>

                        <input
                            type="password"
                            value={password}
                            onChange={(e) =>
                                setPassword(e.target.value)
                            }
                            placeholder="Enter password"
                        />

                    </div>


                    <button
                        type="submit"
                        className="primary-btn login-btn"
                    >
                        Login
                    </button>

                </form>

                <small className="login-note">
                    Admin access
                </small>

            </div>

        </div>
    );
}

export default Login;
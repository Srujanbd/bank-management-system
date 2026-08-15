import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { getAllBanks } from "../services/bankService";
import { getAllAccounts } from "../services/accountService";

function Dashboard() {

    const navigate = useNavigate();

    const [banks, setBanks] = useState([]);
    const [accounts, setAccounts] = useState([]);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        loadDashboard();
    }, []);

    const loadDashboard = async () => {

        try {

            setLoading(true);
            setError("");

            const [banksResponse, accountsResponse] =
                await Promise.all([
                    getAllBanks(),
                    getAllAccounts()
                ]);

            setBanks(
                banksResponse.data.data || []
            );

            setAccounts(
                accountsResponse.data.data || []
            );

        } catch (error) {

            console.error(error);

            setError(
                error.response?.data?.message ||
                "Failed to load dashboard"
            );

        } finally {

            setLoading(false);
        }
    };

    const totalBalance = accounts.reduce(
        (total, account) =>
            total + Number(account.balance || 0),
        0
    );

    const savingsAccounts = accounts.filter(
        (account) =>
            account.accountType === "SAVINGS"
    ).length;

    const currentAccounts = accounts.filter(
        (account) =>
            account.accountType === "CURRENT"
    ).length;

    if (loading) {

        return (
            <div className="loading-container">

                <div className="loader"></div>

                <p>
                    Loading dashboard...
                </p>

            </div>
        );
    }

    return (
        <div className="dashboard-page">

            <div className="page-header">

                <div>

                    <h2>Dashboard</h2>

                    <p>
                        Overview of your banking system
                    </p>

                </div>

                <button
                    className="primary-btn"
                    onClick={() =>
                        navigate("/banks/add")
                    }
                >
                    + Add Bank
                </button>

            </div>

            {error && (
                <div className="error-box">
                    {error}
                </div>
            )}

            {/* Statistics */}

            <div className="stats-grid">

                <div className="stat-card">

                    <div className="stat-icon">
                        🏦
                    </div>

                    <div>

                        <span>
                            Total Banks
                        </span>

                        <strong>
                            {banks.length}
                        </strong>

                    </div>

                </div>

                <div className="stat-card">

                    <div className="stat-icon">
                        👤
                    </div>

                    <div>

                        <span>
                            Total Accounts
                        </span>

                        <strong>
                            {accounts.length}
                        </strong>

                    </div>

                </div>

                <div className="stat-card">

                    <div className="stat-icon">
                        💰
                    </div>

                    <div>

                        <span>
                            Total Balance
                        </span>

                        <strong>
                            ₹{" "}
                            {totalBalance.toLocaleString(
                                "en-IN",
                                {
                                    minimumFractionDigits: 2
                                }
                            )}
                        </strong>

                    </div>

                </div>

                <div className="stat-card">

                    <div className="stat-icon">
                        📍
                    </div>

                    <div>

                        <span>
                            Bank Branches
                        </span>

                        <strong>
                            {banks.length}
                        </strong>

                    </div>

                </div>

            </div>

            {/* Quick Actions */}

            <div className="dashboard-section">

                <h3>
                    Quick Actions
                </h3>

                <div className="quick-actions">

                    <button
                        onClick={() =>
                            navigate("/banks/add")
                        }
                        className="quick-action"
                    >

                        <span>
                            🏦
                        </span>

                        <div>
                            <strong>
                                Add Bank
                            </strong>

                            <small>
                                Create a new bank
                            </small>
                        </div>

                    </button>

                    <button
                        onClick={() =>
                            navigate("/accounts/add")
                        }
                        className="quick-action"
                    >

                        <span>
                            👤
                        </span>

                        <div>
                            <strong>
                                Add Account
                            </strong>

                            <small>
                                Create customer account
                            </small>
                        </div>

                    </button>

                    <button
                        onClick={() =>
                            navigate("/transactions")
                        }
                        className="quick-action"
                    >

                        <span>
                            💳
                        </span>

                        <div>
                            <strong>
                                Transaction
                            </strong>

                            <small>
                                Deposit or withdraw
                            </small>
                        </div>

                    </button>

                </div>

            </div>

            {/* Account Summary */}

            <div className="dashboard-section">

                <h3>
                    Account Summary
                </h3>

                <div className="account-summary">

                    <div className="summary-item">

                        <span>
                            Savings Accounts
                        </span>

                        <strong>
                            {savingsAccounts}
                        </strong>

                    </div>

                    <div className="summary-item">

                        <span>
                            Current Accounts
                        </span>

                        <strong>
                            {currentAccounts}
                        </strong>

                    </div>

                    <div className="summary-item">

                        <span>
                            Total Accounts
                        </span>

                        <strong>
                            {accounts.length}
                        </strong>

                    </div>

                </div>

            </div>

            {/* Recent Accounts */}

            <div className="dashboard-section">

                <div className="section-heading">

                    <h3>
                        Recent Accounts
                    </h3>

                    <button
                        className="text-btn"
                        onClick={() =>
                            navigate("/accounts")
                        }
                    >
                        View All →
                    </button>

                </div>

                <div className="table-card">

                    <div className="table-wrapper">

                        <table className="bank-table">

                            <thead>

                                <tr>

                                    <th>
                                        Account
                                    </th>

                                    <th>
                                        Holder
                                    </th>

                                    <th>
                                        Type
                                    </th>

                                    <th>
                                        Balance
                                    </th>

                                </tr>

                            </thead>

                            <tbody>

                                {accounts
                                    .slice(0, 5)
                                    .map((account) => (

                                        <tr
                                            key={
                                                account.accountId
                                            }
                                        >

                                            <td>

                                                <strong>
                                                    {
                                                        account.accountNumber
                                                    }
                                                </strong>

                                            </td>

                                            <td>
                                                {
                                                    account.accountHolderName
                                                }
                                            </td>

                                            <td>

                                                <span className="ifsc-badge">
                                                    {
                                                        account.accountType
                                                    }
                                                </span>

                                            </td>

                                            <td>

                                                ₹{" "}
                                                {Number(
                                                    account.balance
                                                ).toLocaleString(
                                                    "en-IN",
                                                    {
                                                        minimumFractionDigits: 2
                                                    }
                                                )}

                                            </td>

                                        </tr>

                                    ))}

                            </tbody>

                        </table>

                    </div>

                </div>

            </div>

        </div>
    );
}

export default Dashboard;
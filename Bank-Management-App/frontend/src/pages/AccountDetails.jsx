import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getAccountById } from "../services/accountService";

function AccountDetails() {

    const { id } = useParams();
    const navigate = useNavigate();

    const [account, setAccount] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        loadAccount();
    }, [id]);

    const loadAccount = async () => {
        try {
            const response = await getAccountById(id);

            setAccount(response.data.data);

        } catch (error) {
            console.error(error);

            setError(
                error.response?.data?.message ||
                "Failed to load account"
            );

        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="loading-container">
                <div className="loader"></div>
                <p>Loading account...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="error-box">
                {error}
            </div>
        );
    }

    if (!account) {
        return (
            <div className="empty-state">
                Account not found
            </div>
        );
    }

    return (
        <div className="form-page">

            <div className="page-header">

                <div>
                    <h2>Account Details</h2>
                    <p>View complete account information</p>
                </div>

                <button
                    className="secondary-btn"
                    onClick={() => navigate("/accounts")}
                >
                    ← Back
                </button>

            </div>

            <div className="details-card">

                <div className="details-header">

                    <div className="large-bank-icon">
                        👤
                    </div>

                    <div>
                        <h2>
                            {account.accountHolderName}
                        </h2>

                        <span>
                            Account ID: #{account.accountId}
                        </span>
                    </div>

                </div>

                <div className="details-grid">

                    <div className="detail-item">
                        <span>Account Number</span>
                        <strong>
                            {account.accountNumber}
                        </strong>
                    </div>

                    <div className="detail-item">
                        <span>Account Type</span>
                        <strong>
                            {account.accountType}
                        </strong>
                    </div>

                    <div className="detail-item">
                        <span>Account Holder</span>
                        <strong>
                            {account.accountHolderName}
                        </strong>
                    </div>

                    <div className="detail-item">
                        <span>Balance</span>
                        <strong>
                            ₹{" "}
                            {Number(
                                account.balance
                            ).toLocaleString(
                                "en-IN",
                                {
                                    minimumFractionDigits: 2
                                }
                            )}
                        </strong>
                    </div>

                </div>

            </div>

        </div>
    );
}

export default AccountDetails;
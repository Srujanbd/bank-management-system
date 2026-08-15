import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getBankById } from "../services/bankService";

function BankDetails() {

    const { id } = useParams();
    const navigate = useNavigate();

    const [bank, setBank] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        loadBank();
    }, [id]);

    const loadBank = async () => {

        try {

            const response = await getBankById(id);

            setBank(response.data.data);

        } catch (error) {

            console.error(error);

            setError(
                error.response?.data?.message ||
                "Failed to load bank"
            );

        } finally {

            setLoading(false);

        }
    };

    if (loading) {
        return <div className="loading-container">Loading bank...</div>;
    }

    if (error) {
        return <div className="error-box">{error}</div>;
    }

    if (!bank) {
        return <div className="empty-state">Bank not found</div>;
    }

    return (
        <div className="form-page">

            <div className="page-header">

                <div>
                    <h2>{bank.bankName}</h2>
                    <p>Bank details</p>
                </div>

                <button
                    className="secondary-btn"
                    onClick={() => navigate("/banks")}
                >
                    ← Back
                </button>

            </div>

            <div className="details-card">

                <div className="details-header">
                    <div className="large-bank-icon">
                        🏦
                    </div>

                    <div>
                        <h2>{bank.bankName}</h2>
                        <span>
                            Bank ID: #{bank.bankId}
                        </span>
                    </div>
                </div>

                <div className="details-grid">

                    <div className="detail-item">
                        <span>IFSC Code</span>
                        <strong>{bank.ifscCode}</strong>
                    </div>

                    <div className="detail-item">
                        <span>Branch Name</span>
                        <strong>{bank.branchName}</strong>
                    </div>

                    <div className="detail-item">
                        <span>Contact Number</span>
                        <strong>{bank.contactNumber}</strong>
                    </div>

                    <div className="detail-item">
                        <span>City</span>
                        <strong>
                            {bank.address?.city || "—"}
                        </strong>
                    </div>

                    <div className="detail-item">
                        <span>Street</span>
                        <strong>
                            {bank.address?.street || "—"}
                        </strong>
                    </div>

                    <div className="detail-item">
                        <span>State</span>
                        <strong>
                            {bank.address?.state || "—"}
                        </strong>
                    </div>

                    <div className="detail-item">
                        <span>Pincode</span>
                        <strong>
                            {bank.address?.pincode || "—"}
                        </strong>
                    </div>

                    <div className="detail-item">
                        <span>Total Accounts</span>
                        <strong>
                            {bank.accounts?.length || 0}
                        </strong>
                    </div>

                </div>

            </div>

        </div>
    );
}

export default BankDetails;
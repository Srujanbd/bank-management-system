import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createBank } from "../services/bankService";
import { useToast } from "../context/ToastContext";
import { useNotifications } from "../context/NotificationContext";

function AddBank() {

    const { addNotification } = useNotifications();
    const { showToast } = useToast();
    const navigate = useNavigate();

    const [form, setForm] = useState({
        bankName: "",
        ifscCode: "",
        branchName: "",
        contactNumber: "",
        address: {
            street: "",
            city: "",
            state: "",
            pincode: ""
        }
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleChange = (e) => {

        const { name, value } = e.target;

        setForm({
            ...form,
            [name]: value
        });
    };

    const handleAddressChange = (e) => {

        const { name, value } = e.target;

        setForm({
            ...form,
            address: {
                ...form.address,
                [name]: value
            }
        });
    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        setLoading(true);
        setError("");

        try {

            await createBank(form);
            addNotification({
    icon: "🏦",
    title: "Bank Created",
    message: `${form.bankName} was created successfully`
});

showToast(
    "Bank created successfully",
    "success"
);

navigate("/banks");

        } catch (error) {

            console.error(error);

           showToast(
    error.response?.data?.message ||
    "Failed to create bank",
    "error"
);

        } finally {

            setLoading(false);

        }
    };

    return (
        <div className="form-page">

            <div className="page-header">

                <div>
                    <h2>Add New Bank</h2>
                    <p>Create a new bank and address</p>
                </div>

                <button
                    className="secondary-btn"
                    onClick={() => navigate("/banks")}
                >
                    ← Back
                </button>

            </div>

            {error && (
                <div className="error-box">
                    {error}
                </div>
            )}

            <form
                className="bank-form"
                onSubmit={handleSubmit}
            >

                <div className="form-section">

                    <h3>Bank Information</h3>

                    <div className="form-grid">

                        <div className="form-group">
                            <label>Bank Name</label>

                            <input
                                type="text"
                                name="bankName"
                                value={form.bankName}
                                onChange={handleChange}
                                placeholder="Enter bank name"
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label>IFSC Code</label>

                            <input
                                type="text"
                                name="ifscCode"
                                value={form.ifscCode}
                                onChange={handleChange}
                                placeholder="Enter IFSC code"
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label>Branch Name</label>

                            <input
                                type="text"
                                name="branchName"
                                value={form.branchName}
                                onChange={handleChange}
                                placeholder="Enter branch name"
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label>Contact Number</label>

                            <input
                                type="text"
                                name="contactNumber"
                                value={form.contactNumber}
                                onChange={handleChange}
                                placeholder="10 digit contact number"
                                maxLength="10"
                                required
                            />
                        </div>

                    </div>

                </div>

                <div className="form-section">

                    <h3>Address Information</h3>

                    <div className="form-grid">

                        <div className="form-group full-width">
                            <label>Street</label>

                            <input
                                type="text"
                                name="street"
                                value={form.address.street}
                                onChange={handleAddressChange}
                                placeholder="Enter street"
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label>City</label>

                            <input
                                type="text"
                                name="city"
                                value={form.address.city}
                                onChange={handleAddressChange}
                                placeholder="Enter city"
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label>State</label>

                            <input
                                type="text"
                                name="state"
                                value={form.address.state}
                                onChange={handleAddressChange}
                                placeholder="Enter state"
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label>Pincode</label>

                            <input
                                type="text"
                                name="pincode"
                                value={form.address.pincode}
                                onChange={handleAddressChange}
                                placeholder="6 digit pincode"
                                maxLength="6"
                                required
                            />
                        </div>

                    </div>

                </div>

                <div className="form-actions">

                    <button
                        type="button"
                        className="secondary-btn"
                        onClick={() => navigate("/banks")}
                    >
                        Cancel
                    </button>

                    <button
                        type="submit"
                        className="primary-btn"
                        disabled={loading}
                    >
                        {loading
                            ? "Creating..."
                            : "Create Bank"}
                    </button>

                </div>

            </form>

        </div>
    );
}

export default AddBank;
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
    getBankById,
    updateBank
} from "../services/bankService";
import { useToast } from "../context/ToastContext";
import { useNotifications } from "../context/NotificationContext";

function EditBank() {
    const { addNotification } = useNotifications();

    const { showToast } = useToast();
    const { id } = useParams();
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

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        loadBank();
    }, [id]);

    const loadBank = async () => {
        try {
            const response = await getBankById(id);

            const bank = response.data.data;

            setForm({
                bankName: bank.bankName || "",
                ifscCode: bank.ifscCode || "",
                branchName: bank.branchName || "",
                contactNumber: bank.contactNumber || "",
                address: {
                    street: bank.address?.street || "",
                    city: bank.address?.city || "",
                    state: bank.address?.state || "",
                    pincode: bank.address?.pincode || ""
                }
            });

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

        try {
            setSaving(true);
            setError("");

            await updateBank(id, form);
            addNotification({
    icon: "✏️",
    title: "Bank Updated",
    message: `${form.bankName} was updated successfully`
});

showToast(
    "Bank updated successfully",
    "success"
);

navigate(`/banks/${id}`);

        } catch (error) {
            console.error(error);

           showToast(
    error.response?.data?.message ||
    "Failed to update bank",
    "error"
);
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return (
            <div className="loading-container">
                Loading bank...
            </div>
        );
    }

    return (
        <div className="form-page">

            <div className="page-header">

                <div>
                    <h2>Edit Bank</h2>
                    <p>Update bank information</p>
                </div>

                <button
                    className="secondary-btn"
                    onClick={() => navigate(`/banks/${id}`)}
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
                        onClick={() => navigate(`/banks/${id}`)}
                    >
                        Cancel
                    </button>

                    <button
                        type="submit"
                        className="primary-btn"
                        disabled={saving}
                    >
                        {saving ? "Saving..." : "Save Changes"}
                    </button>

                </div>

            </form>

        </div>
    );
}

export default EditBank;
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import {
    getAddressById,
    updateAddress
} from "../services/addressService";
import { useToast } from "../context/ToastContext";
import { useNotifications } from "../context/NotificationContext";

function EditAddress() {
    const { addNotification } = useNotifications();

    const { showToast } = useToast();
    const { id } = useParams();
    const navigate = useNavigate();

    const [form, setForm] = useState({
        street: "",
        city: "",
        state: "",
        pincode: ""
    });

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        loadAddress();
    }, [id]);

    const loadAddress = async () => {

        try {

            const response = await getAddressById(id);

            const address = response.data.data;

            setForm({
                street: address.street || "",
                city: address.city || "",
                state: address.state || "",
                pincode: address.pincode || ""
            });

        } catch (error) {

            console.error(error);

            showToast(
    error.response?.data?.message ||
    "Failed to update address",
    "error"
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

    const handleSubmit = async (e) => {

        e.preventDefault();

        setSaving(true);
        setError("");

        try {

            await updateAddress(id, form);
            addNotification({
    icon: "📍",
    title: "Address Updated",
    message: "Address was updated successfully"
});

showToast(
    "Address updated successfully",
    "success"
);

navigate(`/addresses/${id}`);

        } catch (error) {

            console.error(error);

           showToast(
    error.response?.data?.message ||
    "Failed to update address",
    "error"
);

        } finally {

            setSaving(false);
        }
    };

    if (loading) {

        return (
            <div className="loading-container">
                <div className="loader"></div>
                <p>Loading address...</p>
            </div>
        );
    }

    return (
        <div className="form-page">

            <div className="page-header">

                <div>
                    <h2>Edit Address</h2>
                    <p>Update address information</p>
                </div>

                <button
                    className="secondary-btn"
                    onClick={() =>
                        navigate(`/addresses/${id}`)
                    }
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

                    <h3>Address Information</h3>

                    <div className="form-grid">

                        <div className="form-group full-width">

                            <label>Street</label>

                            <input
                                type="text"
                                name="street"
                                value={form.street}
                                onChange={handleChange}
                                required
                            />

                        </div>

                        <div className="form-group">

                            <label>City</label>

                            <input
                                type="text"
                                name="city"
                                value={form.city}
                                onChange={handleChange}
                                required
                            />

                        </div>

                        <div className="form-group">

                            <label>State</label>

                            <input
                                type="text"
                                name="state"
                                value={form.state}
                                onChange={handleChange}
                                required
                            />

                        </div>

                        <div className="form-group">

                            <label>Pincode</label>

                            <input
                                type="text"
                                name="pincode"
                                value={form.pincode}
                                onChange={handleChange}
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
                        onClick={() =>
                            navigate(`/addresses/${id}`)
                        }
                    >
                        Cancel
                    </button>

                    <button
                        type="submit"
                        className="primary-btn"
                        disabled={saving}
                    >
                        {saving
                            ? "Saving..."
                            : "Save Changes"}
                    </button>

                </div>

            </form>

        </div>
    );
}

export default EditAddress;
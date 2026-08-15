import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getAddressById } from "../services/addressService";

function AddressDetails() {

    const { id } = useParams();
    const navigate = useNavigate();

    const [address, setAddress] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        loadAddress();
    }, [id]);

    const loadAddress = async () => {
        try {

            const response = await getAddressById(id);

            setAddress(response.data.data);

        } catch (error) {

            console.error(error);

            setError(
                error.response?.data?.message ||
                "Failed to load address"
            );

        } finally {

            setLoading(false);
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

    if (error) {
        return (
            <div className="error-box">
                {error}
            </div>
        );
    }

    if (!address) {
        return (
            <div className="empty-state">
                Address not found
            </div>
        );
    }

    return (
        <div className="form-page">

            <div className="page-header">

                <div>
                    <h2>Address Details</h2>
                    <p>View complete address information</p>
                </div>

                <button
                    className="secondary-btn"
                    onClick={() => navigate("/addresses")}
                >
                    ← Back
                </button>

            </div>

            <div className="details-card">

                <div className="details-header">

                    <div className="large-bank-icon">
                        📍
                    </div>

                    <div>
                        <h2>{address.street}</h2>

                        <span>
                            Address ID: #{address.addressId}
                        </span>
                    </div>

                </div>

                <div className="details-grid">

                    <div className="detail-item">
                        <span>Street</span>
                        <strong>{address.street}</strong>
                    </div>

                    <div className="detail-item">
                        <span>City</span>
                        <strong>{address.city}</strong>
                    </div>

                    <div className="detail-item">
                        <span>State</span>
                        <strong>{address.state}</strong>
                    </div>

                    <div className="detail-item">
                        <span>Pincode</span>
                        <strong>{address.pincode}</strong>
                    </div>

                </div>

                <div className="form-actions">

                    <button
                        className="primary-btn"
                        onClick={() =>
                            navigate(`/addresses/${id}/edit`)
                        }
                    >
                        ✏ Edit Address
                    </button>

                </div>

            </div>

        </div>
    );
}

export default AddressDetails;
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
    getAllAddresses
} from "../services/addressService";

function Addresses() {

    const navigate = useNavigate();

    const [addresses, setAddresses] = useState([]);
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        loadAddresses();
    }, []);

    const loadAddresses = async () => {

        try {

            setLoading(true);
            setError("");

            const response = await getAllAddresses();

            setAddresses(response.data.data || []);

        } catch (error) {

            console.error(error);

            setError(
                error.response?.data?.message ||
                "Failed to load addresses"
            );

        } finally {

            setLoading(false);

        }
    };

    const filteredAddresses = addresses.filter((address) => {

        const value = search.toLowerCase();

        return (
            address.street
                ?.toLowerCase()
                .includes(value) ||

            address.city
                ?.toLowerCase()
                .includes(value) ||

            address.state
                ?.toLowerCase()
                .includes(value) ||

            address.pincode
                ?.toLowerCase()
                .includes(value)
        );
    });

    if (loading) {

        return (
            <div className="loading-container">
                <div className="loader"></div>
                <p>Loading addresses...</p>
            </div>
        );
    }

    return (
        <div className="banks-page">

            <div className="page-header">

                <div>
                    <h2>Address Management</h2>

                    <p>
                        View and manage bank addresses
                    </p>
                </div>

            </div>

            {error && (
                <div className="error-box">
                    {error}
                </div>
            )}

            <div className="bank-toolbar">

                <div className="search-box">

                    <span>🔍</span>

                    <input
                        type="text"
                        placeholder="Search street, city, state or pincode..."
                        value={search}
                        onChange={(e) =>
                            setSearch(e.target.value)
                        }
                    />

                </div>

                <div className="bank-count">
                    {filteredAddresses.length} addresses
                </div>

            </div>

            <div className="table-card">

                {filteredAddresses.length === 0 ? (

                    <div className="empty-state">

                        <div className="empty-icon">
                            📍
                        </div>

                        <h3>No addresses found</h3>

                        <p>
                            No addresses match your search.
                        </p>

                    </div>

                ) : (

                    <div className="table-wrapper">

                        <table className="bank-table">

                            <thead>

                                <tr>

                                    <th>ID</th>
                                    <th>Street</th>
                                    <th>City</th>
                                    <th>State</th>
                                    <th>Pincode</th>
                                    <th>Action</th>

                                </tr>

                            </thead>

                            <tbody>

                                {filteredAddresses.map(
                                    (address) => (

                                        <tr
                                            key={
                                                address.addressId
                                            }
                                        >

                                            <td>
                                                #
                                                {
                                                    address.addressId
                                                }
                                            </td>

                                            <td>
                                                <strong>
                                                    {
                                                        address.street
                                                    }
                                                </strong>
                                            </td>

                                            <td>
                                                {
                                                    address.city
                                                }
                                            </td>

                                            <td>
                                                {
                                                    address.state
                                                }
                                            </td>

                                            <td>
                                                <span className="ifsc-badge">
                                                    {
                                                        address.pincode
                                                    }
                                                </span>
                                            </td>

                                            <td>

                                                <button
                                                    className="action-btn view"
                                                    title="View"
                                                    onClick={() =>
                                                        navigate(
                                                            `/addresses/${address.addressId}`
                                                        )
                                                    }
                                                >
                                                    👁
                                                </button>

                                            </td>

                                        </tr>

                                    )
                                )}

                            </tbody>

                        </table>

                    </div>
                )}

            </div>

        </div>
    );
}

export default Addresses;
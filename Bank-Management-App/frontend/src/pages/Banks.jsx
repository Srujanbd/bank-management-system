import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "../context/ToastContext";
import ConfirmModal from "../components/ConfirmModal";
import { useNotifications } from "../context/NotificationContext";
import {
    getAllBanks,
    deleteBank
} from "../services/bankService";

function Banks() {
    const { addNotification } = useNotifications();
    const [deleteId, setDeleteId] = useState(null);
    const { showToast } = useToast();
    const navigate = useNavigate();

    const [banks, setBanks] = useState([]);
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        loadBanks();
    }, []);

    const loadBanks = async () => {
        try {
            setLoading(true);
            setError("");

            const response = await getAllBanks();

            setBanks(response.data.data || []);

        } catch (error) {

            console.error(error);
            setError("Failed to load banks");

        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        try {

            await deleteBank(id);
            addNotification({
    icon: "🗑️",
    title: "Bank Deleted",
    message: `Bank ${id} was deleted successfully`
});

setBanks(
    banks.filter(
        (bank) => bank.bankId !== id
    )
);

showToast(
    "Bank deleted successfully",
    "success"
);

        } catch (error) {

            console.error(error);

            showToast(
    error.response?.data?.message ||
    "Failed to delete bank",
    "error"
);
        }
    };

    const filteredBanks = banks.filter((bank) => {

        const searchValue = search.toLowerCase();

        return (
            bank.bankName?.toLowerCase().includes(searchValue) ||
            bank.ifscCode?.toLowerCase().includes(searchValue) ||
            bank.branchName?.toLowerCase().includes(searchValue) ||
            bank.contactNumber?.includes(searchValue)
        );
    });

    if (loading) {
        return (
            <div className="loading-container">
                <div className="loader"></div>
                <p>Loading banks...</p>
            </div>
        );
    }

    return (
        <div className="banks-page">

            {/* Header */}

            <div className="page-header">

                <div>
                    <h2>Bank Management</h2>

                    <p>
                        Manage banks and their branches
                    </p>
                </div>

                <button
                    className="primary-btn"
                    onClick={() => navigate("/banks/add")}
                >
                    + Add Bank
                </button>

            </div>

            {/* Error */}

            {error && (
                <div className="error-box">
                    {error}
                </div>
            )}

            {/* Search */}

            <div className="bank-toolbar">

                <div className="search-box">

                    <span>🔍</span>

                    <input
                        type="text"
                        placeholder="Search by bank name, IFSC, branch..."
                        value={search}
                        onChange={(e) =>
                            setSearch(e.target.value)
                        }
                    />

                </div>

                <div className="bank-count">

                    {filteredBanks.length} banks

                </div>

            </div>

            {/* Table */}

            <div className="table-card">

                {filteredBanks.length === 0 ? (

                    <div className="empty-state">

                        <div className="empty-icon">
                            🏦
                        </div>

                        <h3>No banks found</h3>

                        <p>
                            Try changing your search.
                        </p>

                    </div>

                ) : (

                    <div className="table-wrapper">

                        <table className="bank-table">

                            <thead>

                                <tr>

                                    <th>ID</th>

                                    <th>Bank</th>

                                    <th>IFSC Code</th>

                                    <th>Branch</th>

                                    <th>Contact</th>

                                    <th>City</th>

                                    <th>Actions</th>

                                </tr>

                            </thead>

                            <tbody>

                                {filteredBanks.map((bank) => (

                                    <tr key={bank.bankId}>

                                        <td>
                                            #{bank.bankId}
                                        </td>

                                        <td>

                                            <div className="bank-name">

                                                <div className="bank-icon">
                                                    🏦
                                                </div>

                                                <strong>
                                                    {bank.bankName}
                                                </strong>

                                            </div>

                                        </td>

                                        <td>
                                            <span className="ifsc-badge">
                                                {bank.ifscCode}
                                            </span>
                                        </td>

                                        <td>
                                            {bank.branchName}
                                        </td>

                                        <td>
                                            {bank.contactNumber}
                                        </td>

                                        <td>
                                            {bank.address?.city || "—"}
                                        </td>

                                        <td>

                                            <div className="action-buttons">

                                                <button
                                                    className="action-btn view"
                                                    title="View"
                                                   onClick={() =>
                                                   navigate(`/banks/${bank.bankId}`)
                                                      }
                                                >
                                                    👁
                                                </button>

                                               <button
                                      className="action-btn edit"
                                    title="Edit"
                                     onClick={() =>
                                navigate(`/banks/${bank.bankId}/edit`)
                                     }
                                 >
                                 ✏
                                   </button>

                                                <button
                                                    className="action-btn delete"
                                                    title="Delete"
                                                    onClick={() => setDeleteId(bank.bankId)}
                                                >
                                                    🗑
                                                </button>
<ConfirmModal
    isOpen={deleteId !== null}
    title="Delete Bank?"
    message="Are you sure you want to delete this bank? This action cannot be undone."
    onCancel={() => setDeleteId(null)}
    onConfirm={async () => {

        await handleDelete(deleteId);

        setDeleteId(null);
    }}
/>


                                            </div>

                                        </td>

                                    </tr>

                                ))}

                            </tbody>

                        </table>

                    </div>

                )}

            </div>

        </div>
    );
}

export default Banks;
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    getAllAccounts,
    deleteAccount,
    getAccountsByType,
    getAccountsByBalance,
    getSortedAccounts
} from "../services/accountService";
import { useToast } from "../context/ToastContext";
import ConfirmModal from "../components/ConfirmModal";
import { useNotifications } from "../context/NotificationContext";

function Accounts() {
    const { addNotification } = useNotifications();
    const [deleteId, setDeleteId] = useState(null);

    const { showToast } = useToast();
    const navigate = useNavigate();

    const [accounts, setAccounts] = useState([]);
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [accountType, setAccountType] = useState("");
    const [sortField, setSortField] = useState("accountId");
    const [sortDirection, setSortDirection] = useState("asc");
    const [minimumBalance, setMinimumBalance] = useState(""); 
 
    

    useEffect(() => {
        loadAccounts();
    }, []);

    const loadAccounts = async () => {

        try {

            setLoading(true);
            setError("");

            const response = await getAllAccounts();

            setAccounts(response.data.data || []);

        } catch (error) {

            console.error(error);

            setError(
                error.response?.data?.message ||
                "Failed to load accounts"
            );

        } finally {

            setLoading(false);

        }
    };

    const applyFilters = async () => {

    try {

        setLoading(true);
        setError("");

        let response;

        if (accountType) {

            response = await getAccountsByType(accountType);

        } else if (minimumBalance !== "") {

            response = await getAccountsByBalance(
                minimumBalance
            );

        } else {

            response = await getSortedAccounts(
                sortField,
                sortDirection
            );
        }

        setAccounts(response.data.data || []);

    } catch (error) {

        console.error(error);

        setError(
            error.response?.data?.message ||
            "Failed to filter accounts"
        );

    } finally {

        setLoading(false);
    }
};

    const handleDelete = async (id) => {


        try {

            await deleteAccount(id);
             addNotification({
            icon: "🗑️",
            title: "Account Deleted",
            message: `Account ${id} was deleted successfully`
        });

setAccounts(
    accounts.filter(
        (account) => account.accountId !== id
    )
);

showToast(
    "Account deleted successfully",
    "success"
);

        } catch (error) {

            console.error(error);

            showToast(
    error.response?.data?.message ||
    "Failed to delete account",
    "error"
);
        }
    };

    const filteredAccounts = accounts.filter((account) => {

        const value = search.toLowerCase();

        return (
            account.accountNumber
                ?.toLowerCase()
                .includes(value) ||

            account.accountHolderName
                ?.toLowerCase()
                .includes(value) ||

            account.accountType
                ?.toLowerCase()
                .includes(value)
        );
    });

    if (loading) {

        return (
            <div className="loading-container">
                <div className="loader"></div>
                <p>Loading accounts...</p>
            </div>
        );
    }

    return (
        <div className="banks-page">

            <div className="page-header">

                <div>
                    <h2>Account Management</h2>

                    <p>
                        Manage customer accounts and balances
                    </p>
                </div>

                <button
                    className="primary-btn"
                    onClick={() =>
                        navigate("/accounts/add")
                    }
                >
                    + Add Account
                </button>

            </div>

            {error && (
                <div className="error-box">
                    {error}
                </div>
            )}

           <div className="account-toolbar">

    <div className="search-box">

        <span>🔍</span>

        <input
            type="text"
            placeholder="Search account number, holder..."
            value={search}
            onChange={(e) =>
                setSearch(e.target.value)
            }
        />

    </div>

    <div className="filter-group">

        <select
            value={accountType}
            onChange={(e) =>
                setAccountType(e.target.value)
            }
        >

            <option value="">
                All Types
            </option>

            <option value="SAVINGS">
                Savings
            </option>

            <option value="CURRENT">
                Current
            </option>

        </select>

        <input
            type="number"
            placeholder="Minimum balance"
            value={minimumBalance}
            onChange={(e) =>
                setMinimumBalance(e.target.value)
            }
        />

        <select
            value={sortField}
            onChange={(e) =>
                setSortField(e.target.value)
            }
        >

            <option value="accountId">
                Account ID
            </option>

            <option value="accountNumber">
                Account Number
            </option>

            <option value="accountHolderName">
                Account Holder
            </option>

            <option value="balance">
                Balance
            </option>

        </select>

        <select
            value={sortDirection}
            onChange={(e) =>
                setSortDirection(e.target.value)
            }
        >

            <option value="asc">
                Ascending
            </option>

            <option value="desc">
                Descending
            </option>

        </select>

        <button
            className="primary-btn"
            onClick={applyFilters}
        >
            Apply
        </button>
        <button
    className="secondary-btn"
    onClick={() => {
        setAccountType("");
        setMinimumBalance("");
        setSortField("accountId");
        setSortDirection("asc");
        loadAccounts();
    }}
>
    Reset
</button>

    </div>

    <div className="bank-count">
        {filteredAccounts.length} accounts
    </div>

</div>

            <div className="table-card">

                {filteredAccounts.length === 0 ? (

                    <div className="empty-state">

                        <div className="empty-icon">
                            👤
                        </div>

                        <h3>No accounts found</h3>

                        <p>
                            No accounts match your search.
                        </p>

                    </div>

                ) : (

                    <div className="table-wrapper">

                        <table className="bank-table">

                            <thead>

                                <tr>

                                    <th>ID</th>
                                    <th>Account Number</th>
                                    <th>Account Holder</th>
                                    <th>Type</th>
                                    <th>Balance</th>
                                    <th>Actions</th>

                                </tr>

                            </thead>

                            <tbody>

                                {filteredAccounts.map(
                                    (account) => (

                                        <tr
                                            key={
                                                account.accountId
                                            }
                                        >

                                            <td>
                                                #
                                                {
                                                    account.accountId
                                                }
                                            </td>

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

                                            <td>

                                                <div className="action-buttons">

                                                    <button
                                                        className="action-btn view"
                                                        title="View"
                                                        onClick={() =>
                                                            navigate(
                                                                `/accounts/${account.accountId}`
                                                            )
                                                        }
                                                    >
                                                        👁
                                                    </button>

                                                    <button
                                                        className="action-btn delete"
                                                        title="Delete"
                                                        onClick={() => setDeleteId(account.accountId)}
                                                    >
                                                        🗑
                                                    </button>
                                                    <ConfirmModal
    isOpen={deleteId !== null}
    title="Delete Account?"
    message="Are you sure you want to delete this account? This action cannot be undone."
    onCancel={() => setDeleteId(null)}
    onConfirm={async () => {
        await handleDelete(deleteId);
        setDeleteId(null);
    }}
/>

                                                </div>

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

export default Accounts;
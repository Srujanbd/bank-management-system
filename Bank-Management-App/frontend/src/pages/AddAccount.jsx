import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { getAllBanks } from "../services/bankService";
import { createAccount } from "../services/accountService";
import { useToast } from "../context/ToastContext";
import { useNotifications } from "../context/NotificationContext";

function AddAccount() {
    const { addNotification } = useNotifications();

    const { showToast } = useToast();
    const navigate = useNavigate();

    const [banks, setBanks] = useState([]);

    const [form, setForm] = useState({
        bankId: "",
        accountNumber: "",
        accountHolderName: "",
        accountType: "SAVINGS",
        balance: ""
    });

    const [loadingBanks, setLoadingBanks] = useState(true);
    const [saving, setSaving] = useState(false);


    useEffect(() => {
        loadBanks();
    }, []);

    const loadBanks = async () => {

        try {

            const response = await getAllBanks();

            setBanks(response.data.data || []);

        } catch (error) {

            console.error(error);

            setError(
                error.response?.data?.message ||
                "Failed to load banks"
            );

        } finally {

            setLoadingBanks(false);

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
        

        try {

            const account = {
                accountNumber: form.accountNumber,
                accountHolderName: form.accountHolderName,
                accountType: form.accountType,
                balance: Number(form.balance)
            };

           await createAccount(
    Number(form.bankId),
    account
);
addNotification({
    icon: "👤",
    title: "Account Created",
    message: `${account.accountHolderName} account ${account.accountNumber} was created successfully`
});

showToast(
    "Account created successfully",
    "success"
);

            setTimeout(() => {
                navigate("/accounts");
            }, 800);

        } catch (error) {

            console.error(error);

           showToast(
    error.response?.data?.message ||
    "Failed to create account",
    "error"
);

        } finally {

            setSaving(false);

        }
    };

    if (loadingBanks) {

        return (
            <div className="loading-container">

                <div className="loader"></div>

                <p>
                    Loading banks...
                </p>

            </div>
        );
    }

    return (
        <div className="form-page">

            <div className="page-header">

                <div>
                    <h2>Add New Account</h2>

                    <p>
                        Create a customer bank account
                    </p>
                </div>

                <button
                    className="secondary-btn"
                    onClick={() => navigate("/accounts")}
                >
                    ← Back
                </button>

            </div>


            <form
                className="bank-form"
                onSubmit={handleSubmit}
            >

                <div className="form-section">

                    <h3>Account Information</h3>

                    <div className="form-grid">

                        <div className="form-group">

                            <label>
                                Select Bank
                            </label>

                            <select
                                name="bankId"
                                value={form.bankId}
                                onChange={handleChange}
                                required
                            >

                                <option value="">
                                    Select a bank
                                </option>

                                {banks.map((bank) => (

                                    <option
                                        key={bank.bankId}
                                        value={bank.bankId}
                                    >
                                        {bank.bankName}
                                    </option>

                                ))}

                            </select>

                        </div>

                        <div className="form-group">

                            <label>
                                Account Number
                            </label>

                            <input
                                type="text"
                                name="accountNumber"
                                value={form.accountNumber}
                                onChange={handleChange}
                                placeholder="e.g. ACC100005"
                                required
                            />

                        </div>

                        <div className="form-group">

                            <label>
                                Account Holder Name
                            </label>

                            <input
                                type="text"
                                name="accountHolderName"
                                value={form.accountHolderName}
                                onChange={handleChange}
                                placeholder="Enter account holder name"
                                required
                            />

                        </div>

                        <div className="form-group">

                            <label>
                                Account Type
                            </label>

                            <select
                                name="accountType"
                                value={form.accountType}
                                onChange={handleChange}
                                required
                            >

                                <option value="SAVINGS">
                                    SAVINGS
                                </option>

                                <option value="CURRENT">
                                    CURRENT
                                </option>

                            </select>

                        </div>

                        <div className="form-group">

                            <label>
                                Initial Balance
                            </label>

                            <input
                                type="number"
                                name="balance"
                                value={form.balance}
                                onChange={handleChange}
                                placeholder="Enter initial balance"
                                min="0"
                                step="0.01"
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
                            navigate("/accounts")
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
                            ? "Creating..."
                            : "Create Account"}
                    </button>

                </div>

            </form>

        </div>
    );
}

export default AddAccount;
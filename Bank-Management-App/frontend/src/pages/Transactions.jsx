import { useState } from "react";
import {
    depositAmount,
    withdrawAmount,
    transferAmount
} from "../services/accountService";
import { useToast } from "../context/ToastContext";
import { useNotifications } from "../context/NotificationContext";

function Transactions() {
    
    const { showToast } = useToast();
    const { addNotification } = useNotifications();

    const [activeTab, setActiveTab] = useState("deposit");

    const [depositForm, setDepositForm] = useState({
        accountNumber: "",
        amount: ""
    });

    const [withdrawForm, setWithdrawForm] = useState({
        accountNumber: "",
        amount: ""
    });

    const [transferForm, setTransferForm] = useState({
        senderAccount: "",
        receiverAccount: "",
        amount: ""
    });

    const [loading, setLoading] = useState(false);
    

    const handleDeposit = async (e) => {

    e.preventDefault();
    setLoading(true);

        try {

            const response = await depositAmount(depositForm);
            addNotification({
    icon: "💰",
    title: "Deposit Successful",
    message: `₹${depositForm.amount} deposited into ${depositForm.accountNumber}`
});
            

            showToast(
    response.data.message ||
    "Amount deposited successfully",
    "success"
);

            setDepositForm({
                accountNumber: "",
                amount: ""
            });

        } catch (error) {

            console.error(error);

            showToast(
    error.response?.data?.message ||
    "Failed to deposit amount",
    "error"
);

        } finally {
            setLoading(false);
        }
    };

    const handleWithdraw = async (e) => {

    e.preventDefault();
    setLoading(true);

        try {

            const response = await withdrawAmount(withdrawForm);
            addNotification({
    icon: "💸",
    title: "Withdrawal Successful",
    message: `₹${withdrawForm.amount} withdrawn from ${withdrawForm.accountNumber}`
});

          showToast(
    response.data.message ||
    "Amount withdrawn successfully",
    "success"
);

            setWithdrawForm({
                accountNumber: "",
                amount: ""
            });

        } catch (error) {

            console.error(error);

            showToast(
    error.response?.data?.message ||
    "Failed to withdraw amount",
    "error"
);

        } finally {
            setLoading(false);
        }
    };

    const handleTransfer = async (e) => {

    e.preventDefault();
    setLoading(true);

        try {

            const response = await transferAmount(transferForm);
            addNotification({
    icon: "🔄",
    title: "Transfer Successful",
    message: `₹${transferForm.amount} transferred from ${transferForm.senderAccount} to ${transferForm.receiverAccount}`
});

            showToast(
    response.data.message ||
    "Amount transferred successfully",
    "success"
);

            setTransferForm({
                senderAccount: "",
                receiverAccount: "",
                amount: ""
            });

        } catch (error) {

            console.error(error);

            showToast(
    error.response?.data?.message ||
    "Failed to transfer amount",
    "error"
);

        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="transactions-page">

            <div className="page-header">

                <div>
                    <h2>Transactions</h2>

                    <p>
                        Manage deposits, withdrawals and transfers
                    </p>
                </div>

            </div>

          

            <div className="transaction-tabs">

                <button
                    className={
                        activeTab === "deposit"
                            ? "transaction-tab active"
                            : "transaction-tab"
                    }
                    onClick={() => {
                        setActiveTab("deposit");
                       
                    }}
                >
                    💰 Deposit
                </button>

                <button
                    className={
                        activeTab === "withdraw"
                            ? "transaction-tab active"
                            : "transaction-tab"
                    }
                    onClick={() => {
                        setActiveTab("withdraw");
                        
                    }}
                >
                    💸 Withdraw
                </button>

                <button
                    className={
                        activeTab === "transfer"
                            ? "transaction-tab active"
                            : "transaction-tab"
                    }
                    onClick={() => {
                        setActiveTab("transfer");
                        
                    }}
                >
                    🔄 Transfer
                </button>

            </div>

            <div className="transaction-card">

                {activeTab === "deposit" && (

                    <form
                        onSubmit={handleDeposit}
                        className="transaction-form"
                    >

                        <h3>Deposit Money</h3>

                        <p>
                            Add money to a customer's account.
                        </p>

                        <div className="form-group">

                            <label>
                                Account Number
                            </label>

                            <input
                                type="text"
                                value={
                                    depositForm.accountNumber
                                }
                                onChange={(e) =>
                                    setDepositForm({
                                        ...depositForm,
                                        accountNumber:
                                            e.target.value
                                    })
                                }
                                placeholder="e.g. ACC100001"
                                required
                            />

                        </div>

                        <div className="form-group">

                            <label>
                                Amount
                            </label>

                            <input
                                type="number"
                                min="0.01"
                                step="0.01"
                                value={
                                    depositForm.amount
                                }
                                onChange={(e) =>
                                    setDepositForm({
                                        ...depositForm,
                                        amount:
                                            e.target.value
                                    })
                                }
                                placeholder="Enter amount"
                                required
                            />

                        </div>

                        <button
                            type="submit"
                            className="primary-btn transaction-submit"
                            disabled={loading}
                        >
                            {loading
                                ? "Processing..."
                                : "Deposit Amount"}
                        </button>

                    </form>
                )}

                {activeTab === "withdraw" && (

                    <form
                        onSubmit={handleWithdraw}
                        className="transaction-form"
                    >

                        <h3>Withdraw Money</h3>

                        <p>
                            Withdraw money from a customer's account.
                        </p>

                        <div className="form-group">

                            <label>
                                Account Number
                            </label>

                            <input
                                type="text"
                                value={
                                    withdrawForm.accountNumber
                                }
                                onChange={(e) =>
                                    setWithdrawForm({
                                        ...withdrawForm,
                                        accountNumber:
                                            e.target.value
                                    })
                                }
                                placeholder="e.g. ACC100001"
                                required
                            />

                        </div>

                        <div className="form-group">

                            <label>
                                Amount
                            </label>

                            <input
                                type="number"
                                min="0.01"
                                step="0.01"
                                value={
                                    withdrawForm.amount
                                }
                                onChange={(e) =>
                                    setWithdrawForm({
                                        ...withdrawForm,
                                        amount:
                                            e.target.value
                                    })
                                }
                                placeholder="Enter amount"
                                required
                            />

                        </div>

                        <button
                            type="submit"
                            className="primary-btn transaction-submit"
                            disabled={loading}
                        >
                            {loading
                                ? "Processing..."
                                : "Withdraw Amount"}
                        </button>

                    </form>
                )}

                {activeTab === "transfer" && (

                    <form
                        onSubmit={handleTransfer}
                        className="transaction-form"
                    >

                        <h3>Transfer Money</h3>

                        <p>
                            Transfer money between two accounts.
                        </p>

                        <div className="form-group">

                            <label>
                                Sender Account
                            </label>

                            <input
                                type="text"
                                value={
                                    transferForm.senderAccount
                                }
                                onChange={(e) =>
                                    setTransferForm({
                                        ...transferForm,
                                        senderAccount:
                                            e.target.value
                                    })
                                }
                                placeholder="e.g. ACC100001"
                                required
                            />

                        </div>

                        <div className="form-group">

                            <label>
                                Receiver Account
                            </label>

                            <input
                                type="text"
                                value={
                                    transferForm.receiverAccount
                                }
                                onChange={(e) =>
                                    setTransferForm({
                                        ...transferForm,
                                        receiverAccount:
                                            e.target.value
                                    })
                                }
                                placeholder="e.g. ACC100002"
                                required
                            />

                        </div>

                        <div className="form-group">

                            <label>
                                Amount
                            </label>

                            <input
                                type="number"
                                min="0.01"
                                step="0.01"
                                value={
                                    transferForm.amount
                                }
                                onChange={(e) =>
                                    setTransferForm({
                                        ...transferForm,
                                        amount:
                                            e.target.value
                                    })
                                }
                                placeholder="Enter amount"
                                required
                            />

                        </div>

                        <button
                            type="submit"
                            className="primary-btn transaction-submit"
                            disabled={loading}
                        >
                            {loading
                                ? "Processing..."
                                : "Transfer Amount"}
                        </button>

                    </form>
                )}

            </div>

        </div>
    );
}

export default Transactions;
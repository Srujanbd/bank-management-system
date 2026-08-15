function ConfirmModal({
    isOpen,
    title = "Confirm Delete",
    message,
    onConfirm,
    onCancel
}) {

    if (!isOpen) {
        return null;
    }

    return (
        <div className="modal-overlay">

            <div className="confirm-modal">

                <div className="confirm-icon">
                    ⚠️
                </div>

                <h3>
                    {title}
                </h3>

                <p>
                    {message}
                </p>

                <div className="confirm-actions">

                    <button
                        className="secondary-btn"
                        onClick={onCancel}
                    >
                        Cancel
                    </button>

                    <button
                        className="delete-btn"
                        onClick={onConfirm}
                    >
                        Delete
                    </button>

                </div>

            </div>

        </div>
    );
}

export default ConfirmModal;
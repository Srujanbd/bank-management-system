import api from "./api";

// Get all accounts
export const getAllAccounts = () => {
    return api.get("/accounts");
};

// Get account by ID
export const getAccountById = (id) => {
    return api.get(`/accounts/${id}`);
};

// Get account by account number
export const getAccountByNumber = (number) => {
    return api.get(`/accounts/number/${number}`);
};

// Get accounts by bank
export const getAccountsByBank = (bankId) => {
    return api.get(`/accounts/bank/${bankId}`);
};

// Get accounts by account type
export const getAccountsByType = (type) => {
    return api.get(`/accounts/type/${type}`);
};

// Get accounts by balance
export const getAccountsByBalance = (amount) => {
    return api.get(`/accounts/balance/${amount}`);
};

// Sort accounts
export const getSortedAccounts = (field, direction) => {
    return api.get(
        `/accounts/sort?field=${field}&direction=${direction}`
    );
};

// Create account
export const createAccount = (bankId, account) => {
    return api.post(`/accounts/bank/${bankId}`, account);
};

// Deposit
export const depositAmount = (request) => {
    return api.patch("/accounts/deposit", request);
};

// Withdraw
export const withdrawAmount = (request) => {
    return api.patch("/accounts/withdraw", request);
};

// Transfer
export const transferAmount = (request) => {
    return api.patch("/accounts/transfer", request);
};

// Delete account
export const deleteAccount = (id) => {
    return api.delete(`/accounts/${id}`);
};
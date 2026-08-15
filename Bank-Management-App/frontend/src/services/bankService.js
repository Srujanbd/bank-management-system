import api from "./api";

export const getAllBanks = () => {
    return api.get("/banks");
};

export const getBankById = (id) => {
    return api.get(`/banks/${id}`);
};

export const createBank = (bank) => {
    return api.post("/banks", bank);
};

export const updateBank = (id, bank) => {
    return api.put(`/banks/${id}`, bank);
};

export const patchBank = (id, bank) => {
    return api.patch(`/banks/${id}`, bank);
};

export const deleteBank = (id) => {
    return api.delete(`/banks/${id}`);
};
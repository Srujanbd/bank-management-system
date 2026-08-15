import api from "./api";

// Get all addresses
export const getAllAddresses = () => {
    return api.get("/address");
};

// Get address by ID
export const getAddressById = (id) => {
    return api.get(`/address/${id}`);
};

// Get address by bank
export const getAddressByBankId = (bankId) => {
    return api.get(`/address/bank/${bankId}`);
};

// Get addresses by city
export const getAddressesByCity = (city) => {
    return api.get(`/address/city/${city}`);
};

// Search address
export const searchAddress = (city, street) => {
    return api.get(
        `/address/search?city=${encodeURIComponent(city)}&street=${encodeURIComponent(street)}`
    );
};

// Update complete address
export const updateAddress = (id, address) => {
    return api.put(`/address/${id}`, address);
};

// Partially update address
export const patchAddress = (id, address) => {
    return api.patch(`/address/${id}`, address);
};
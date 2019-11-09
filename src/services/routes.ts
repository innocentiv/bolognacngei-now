export const login = () => "/login";
export const register = () => "/register";
export const overview = () => "/overview";
export const home = () => "/";
export const membership = () => "/membership";
export const membershipData = (id = ":id") => `/membership/${id}/data`;
export const membershipHealth = (id = ":id") => `/membership/${id}/health`;
export const membershipPayment = (id = ":id") => `/membership/${id}/payment`;

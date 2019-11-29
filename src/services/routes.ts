export const home = () => "/";
export const overview = () => "/overview";
export const auth = () => "/auth";
export const authForgot = (code = ":code") => `/auth/forgot/${code}`;
export const authHandler = () => "/auth/handler";
export const membership = () => "/membership";
export const membershipSupporter = (id = ":id") =>
  `/membership/${id}/supporter`;
export const membershipData = (id = ":id") => `/membership/${id}/data`;
export const membershipHealth = (id = ":id") => `/membership/${id}/health`;
export const membershipReduction = (id = ":id") =>
  `/membership/${id}/reduction`;
export const membershipPayment = (id = ":id") => `/membership/${id}/payment`;
export const permission = () => "/permission";

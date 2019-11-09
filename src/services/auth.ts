import React from "react";

const apiEndpoint =
  process.env.REACT_APP_API_ENDPOINT || "http://localhost:1337";

export const authContext = React.createContext({});
export const AuthProvider = authContext.Provider;

export interface IUserData {
  _id: string;
  confirmed: boolean;
  blocked: boolean;
  username: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ILoginResponse {
  jwt: string;
  user: IUserData;
}

export interface ILoginError {
  statusCode: number;
  error: string;
  message: string;
}

export interface IForgotPasswordResponse {
  ok: Boolean;
}

class AuthService {
  apiEndpoint: string;

  constructor(apiEndpoint: string) {
    this.apiEndpoint = apiEndpoint;
  }

  post(url: string, data: any) {
    return fetch(`${this.apiEndpoint}${url}`, {
      method: "POST",
      headers: new Headers({ "content-type": "application/json" }),
      body: JSON.stringify(data)
    });
  }

  async login(email: string, password: string) {
    const response = await this.post("/auth/local", {
      identifier: email,
      password
    });

    if (!response.ok) {
      const error = (await response.json()) as ILoginError;
      throw Error(error.message);
    }

    return (await response.json()) as ILoginResponse;
  }

  async register(username: string, email: string, password: string) {
    const response = await this.post("/auth/local/register", {
      username,
      email,
      password
    });

    if (!response.ok) {
      const error = (await response.json()) as ILoginError;
      throw Error(error.message);
    }

    return (await response.json()) as ILoginResponse;
  }

  async forgotPassword(email: string) {
    const response = await this.post("/auth/forgot-password", {
      email,
      url: `${this.apiEndpoint}/admin/plugins/users-permissions/auth/reset-password`
    });

    if (!response.ok) {
      const error = (await response.json()) as ILoginError;
      throw Error(error.message);
    }

    return (await response.json()) as IForgotPasswordResponse;
  }
}

export const authService = new AuthService(apiEndpoint);

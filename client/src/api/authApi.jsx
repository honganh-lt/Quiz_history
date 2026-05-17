// import { use } from "react";
// import axios from "axios";

// import axiosClient from "../../../api/axiosClient";

const API_URL = "http://localhost:5000/api/auth";

export const login = async (username, password) => {

    const response = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: {
            "Content-Type":"application/json"
        },
        body: JSON.stringify({
            username,
            password
        })
    });
    const data = await response.json();

    if(!response.ok) {
        throw data;
    }

    return data;
};

export const register = async (username,fulName, email, password) => {
    const response = await fetch(`${API_URL}/register`, {
        method: "POST",
        headers: {
            "Content-Type":"application/json"
        },
        body: JSON.stringify({
            username,
            full_name: fulName,
            email,
            password
        })
    });

    const data = await response.json();

    //  BẮT LỖI 400, 500
    if (!response.ok) {
        throw data; //  QUAN TRỌNG
    }

    return data;
};

export const logout = async (refresh_token) => {
    const response = await fetch(`${API_URL}/logout`, {
        method: "POST",
        headers: {
            "Content-Type":"application/json"
        },
        body: JSON.stringify({ refresh_token })
    });

    return response.json();
};


const API_URL = "http://localhost:3000/api/auth";

export const login = async (username, password) => {

    const response = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            username,
            password
        })
    });

    return response.json();
};
import users from "./citizenauth.json";

export const login = (email, password) => {
    const user = users.find(
        (u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password
    );
    if (user) {
        localStorage.setItem("user", JSON.stringify(user));
        return user;
    }
    return null;
};

export const logout = () => {
    localStorage.removeItem("user");
};

export const getCurrentUser = () => {
    const stored = localStorage.getItem("user");
    return stored ? JSON.parse(stored) : null;
};

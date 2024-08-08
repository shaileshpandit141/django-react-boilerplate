import { jwtDecode } from 'jwt-decode';

// Function to check if a token is expired
export const isTokenExpired = (token) => {
    if (!token) return true;

    try {
        const decoded = jwtDecode(token);
        const currentTime = Date.now() / 1000; // Current time in seconds
        return decoded.exp < currentTime;
    } catch (e) {
        return true; // If decoding fails, treat as expired
    }
};
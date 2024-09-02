import { jwtDecode } from 'jwt-decode' 

// Function to check if a token is expired
export const isTokenExpired = (token) => {
    if (!token) return true 

    try {
        const decoded = jwtDecode(token) 
        // Current time in seconds
        const currentTime = Date.now() / 1000  
        return decoded.exp < currentTime 
    } catch (e) {
        // If decoding fails, treat as expired
        return true  
    }
} 
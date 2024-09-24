// Named Import.
import { useSelector } from "react-redux"

export function useAuthSelectors() {

    const { accessToken, refreshToken, isAuthenticated, pk, status, error } = useSelector((state) => state.auth)

    // Return the auth state object.
    return { accessToken, refreshToken, isAuthenticated, pk, status, error }
}

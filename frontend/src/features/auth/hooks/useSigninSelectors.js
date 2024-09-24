// Named Import.
import { useSelector } from "react-redux"

export function useSigninSelectors() {

    const { accessToken, refreshToken, isAuthenticated, pk, status, error } = useSelector((state) => state.signin)

    // Return the auth state object.
    return { accessToken, refreshToken, isAuthenticated, pk, status, error }
}

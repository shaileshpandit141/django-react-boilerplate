// Named Import.
import { useSelector } from "react-redux"

export function useSignupSelectors() {

    const { status, data, error } = useSelector((state) => state.signup)

    // Return the auth state object.
    return { status, data, error }
}
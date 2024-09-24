// Named Import.
import { useSelector } from "react-redux"

export function useForgotPasswordSelectors() {

    const { status, data, error } = useSelector((state) => state.forgotPassword)
    
    // Return the auth state object.
    return { status, data, error }
}

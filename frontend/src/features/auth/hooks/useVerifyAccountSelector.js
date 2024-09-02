// Named Import.
import { useSelector } from "react-redux" 

export function useVerifyAccountSelector() {

    // Return the auth state object.
    return useSelector((state) => state.verifyAccount) 
}
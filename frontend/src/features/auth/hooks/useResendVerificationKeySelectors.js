// Named Import.
import { useSelector } from "react-redux";

export function useResendVerificationKeySelectors() {

    // Return the auth state object.
    return useSelector((state) => state.resendVerificationKey);
}
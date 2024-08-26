// Named Import.
import { useSelector } from "react-redux";

export default function useResendVerificationKeySelectors() {

    // Return the auth state object.
    return useSelector((state) => state.resendVerificationKey);
}
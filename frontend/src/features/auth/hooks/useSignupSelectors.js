// Named Import.
import { useSelector } from "react-redux";

export function useSignupSelectors() {

    // Return the auth state object.
    return useSelector((state) => state.signup);
}
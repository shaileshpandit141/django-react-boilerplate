// Named Import.
import { useSelector } from "react-redux";

export default function useSignupSelectors() {

    // Return the auth state object.
    return useSelector((state) => state.signup);
}
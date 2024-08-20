// Named Import.
import { useSelector } from "react-redux";

export default function useAuthSelectors() {

    // Return the auth state object.
    return useSelector((state) => state.auth);
}
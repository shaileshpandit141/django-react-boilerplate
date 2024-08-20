// Named Import.
import { useSelector } from "react-redux";

export default function useVerifyAccountSelector() {

    // Return the auth state object.
    return useSelector((state) => state.verifyAccount);
}
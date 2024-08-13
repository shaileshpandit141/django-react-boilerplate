// Named Import.
import { useSelector } from "react-redux";

export default function useToastSelectors() {

    // Return the auth state object.
    return useSelector((state) => state.toast);
}
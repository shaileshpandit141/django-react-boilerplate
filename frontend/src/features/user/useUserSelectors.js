// Named Import.
import { useSelector } from "react-redux" 

export default function useUserSelectors() {

    // Return the user state object.
    return useSelector((state) => state.user)
}

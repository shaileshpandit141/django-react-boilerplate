// Named Import.
import { useSelector } from "react-redux"

export default function useUserSelectors() {

  const { status, data, error } = useSelector((state) => state.user)

  // Return the user state object.
  return { status, data, error }
}

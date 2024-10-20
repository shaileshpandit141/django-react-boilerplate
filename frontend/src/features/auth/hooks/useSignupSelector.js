// Named Import.
import { useSelector } from "react-redux"

export function useSignupSelector() {

  const { status, data, error } = useSelector((state) => state.signup)

  // Return the auth state object.
  return { status, data, error }
}

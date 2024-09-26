// Named Import.
import { useSelector } from "react-redux"

export function useVerifyAccountSelector() {

  const { status, data, error } = useSelector((state) => state.verifyAccount)

  // Return the auth state object.
  return { status, data, error }
}

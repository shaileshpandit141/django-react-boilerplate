// Named Import.
import { useSelector } from "react-redux"

export function useResendVerificationKeySelectors() {

  const { status, data, error } = useSelector((state) => state.resendVerificationKey)

  // Return the auth state object.
  return { status, data, error }
}

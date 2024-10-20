import { useSelector } from "react-redux"

export function useResendVerificationKeySelector() {

  const { status, data, error } = useSelector((state) => state.resendVerificationKey)

  // Return the selected state object.
  return { status, data, error }
}

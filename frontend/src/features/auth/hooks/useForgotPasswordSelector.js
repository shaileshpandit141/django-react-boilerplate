import { useSelector } from "react-redux"

export function useForgotPasswordSelector() {

  const { status, data, error } = useSelector((state) => state.forgotPassword)

  // Return the selected state object.
  return { status, data, error }
}

// Named Import.
import { useSelector } from "react-redux"

export function useSigninSelectors() {

  const { accessToken, refreshToken, isAuthenticated, status, error } = useSelector((state) => state.signin)

  // Return the auth state object.
  return { accessToken, refreshToken, isAuthenticated, status, error }
}

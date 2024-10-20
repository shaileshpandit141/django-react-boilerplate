import { useSelector } from "react-redux"

export function useSignoutSelector() {

  const { status, data, error } = useSelector((state) => state.signout)

  // Return the selected state object.
  return { status, data, error }
}

import { useState } from "react"

export default function useFormDataChange(initialFormData) {
  if (typeof initialFormData !== 'object') {
    throw new Error("The useFormHook only accept the initialData value as object type.")
  }

  const [formData, setFormData] = useState(initialFormData)

  function handleFormDataChange(event) {
    const { name, type, checked, value } = event.target
    setFormData((prevFormData) => {
      return {
        ...prevFormData,
        [name]: type === 'checkbox' ? checked : value
      }
    })
  }

  return [formData, handleFormDataChange]
}

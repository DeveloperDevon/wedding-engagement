import { useState } from 'react'

export const useForm = initialValues => {
  const [values, setValues] = useState(initialValues)

  return [values, e => {
    const value = (e.target.name === 'secretCode') ? e.target.value.toUpperCase() : e.target.value
    setValues({ ...values, [e.target.name]: value })
  }]
}
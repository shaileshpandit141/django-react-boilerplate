import React from 'react'
import { useParams } from 'react-router-dom'

export default function VerifyAccount() {

  const { key } = useParams()
  return (
    <div>VerifyAccount {key}</div>
  )
}

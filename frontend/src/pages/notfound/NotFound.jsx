import React from 'react'
import { NavLink } from 'react-router-dom'

export default function NotFound() {
  return (
    <section>
      <h3>Page Not Found 404</h3>
      <NavLink to='..' >Return back to</NavLink>
    </section>
  )
}

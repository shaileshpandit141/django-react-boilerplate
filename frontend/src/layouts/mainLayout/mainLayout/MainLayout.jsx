import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from '../header/Header'
import Footer from '../footer/Footer'
import ReturnToTopButton from 'components/specific/returnToTopButton/ReturnToTopButton'

export default function MainLayout() {

  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
      <ReturnToTopButton />
      <Footer />
    </>
  )
}

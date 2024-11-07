import React from 'react'
import './MainLayout.scss'
import { Outlet } from 'react-router-dom'
import Header from '../header/Header'
import Footer from '../footer/Footer'
import ReturnToTopButton from 'components/specific/returnToTopButton/ReturnToTopButton'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export default function MainLayout() {

  return (
    <>
      <ToastContainer
        position='top-right'
        theme={localStorage.getItem('theme') && 'light'}
      />
      <Header />
      <main className='main'>
        <Outlet />
      </main>
      <ReturnToTopButton />
      <Footer />
    </>
  )
}

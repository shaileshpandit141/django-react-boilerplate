import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from './header/Header'
import Toast from '../../features/toast/components/toast/Toast'

export default function MainLayout() {
    return (
        <>
            <Toast />
            <Header />
            <Outlet />
        </>
    )
}
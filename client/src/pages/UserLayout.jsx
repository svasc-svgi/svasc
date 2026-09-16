import React from 'react'
import Navbar from '../components/Home/Navbar'
import Footer from '../components/Common/Footer'
import { Outlet } from 'react-router-dom'
import { useState } from 'react'

const UserLayout = () => {
    const [isNavbarVisible, setIsNavbarVisible] = useState(true);

    return (
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <Navbar className={!isNavbarVisible ? 'header-hidden' : ''} />
            <main style={{ flex: 1 }}>
                <Outlet context={{ setIsNavbarVisible }} />
            </main>
            <Footer />
        </div>
    )
}

export default UserLayout
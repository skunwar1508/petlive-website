import Footer from '@/components/Footer';
import Header from '@/components/Header';
import { Fredoka } from "next/font/google";
import { Poppins } from "next/font/google";
import React from 'react'

const fredoka = Fredoka({
    subsets: ["latin"],
    weight: ["400"],
    variable: "--font-fredoka",
    display: "swap",
});

const poppins = Poppins({
    subsets: ["latin"],
    weight: ["400", "500", "600", "700"],
    variable: "--font-poppins",
    display: "swap",
});

const Layout = ({ children }) => {
    return (
        <>
            <div className={`${fredoka.variable} ${poppins.variable}`}>
                <Header />
                <main>
                    {children}
                </main>
                <Footer />
            </div>
        </>
    )
}

export default Layout;

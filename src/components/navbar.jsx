import React from 'react'
import styles from './navbar.module.css'

export function Navbar() {
    return(
        <header className={style.header}>
            <a href="#" className={styles.logo}>RH</a>
            <nav></nav>
        </header>
    )
}
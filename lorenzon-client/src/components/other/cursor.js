import { useEffect } from 'react'
import { useMotionValue, motion, useSpring } from 'framer-motion'
import styles from "../../styles/module/style.module.scss"

export default function Cursor() {

    const cursorSize = 20
    const mouse = {
        x: useMotionValue(0),
        y: useMotionValue(0),
    }

    const smoothOptions = { damping: 20, stiffness: 300, mass: 0.5, }
    const smoothMouse = {
        x: useSpring(mouse.x, smoothOptions),
        y: useSpring(mouse.y, smoothOptions),
    }

    const manageMouseMove = (e) => {
        const { clientX, clientY } = e
        mouse.x.set(clientX - cursorSize / 2)
        mouse.y.set(clientY - cursorSize / 2)
    }

    useEffect(() => {
        window.addEventListener('mousemove', manageMouseMove)
        return () => window.removeEventListener('mousemove', manageMouseMove)
    }, [])

    return (
        <motion.div
            className={styles.cursor}
            style={{ left: smoothMouse.x, top: smoothMouse.y, zIndex: 100000 }}
        ></motion.div>
    )
}

import styles from './styles.module.scss'
import { useState, useEffect } from 'react';
import { FaAngleUp } from "react-icons/fa6";



export default function ScrollToTop() {
    const [isVisible, setIsVisible] = useState(true);
    const [scrollY, setScrollY] = useState<number>()
    const [windows, setWindows] = useState(globalThis)
    const [position, setPosition] = useState({
        x: 1,
        y: 1
    })


    const [scrollPosition, setScrollPosition] = useState(1);

    function handleScroll(e) {
        console.log(e)
        const height =
            document.documentElement.scrollHeight -
            document.documentElement.clientHeight;

        const windowScroll = document.documentElement.scrollTop;

        const scrolled = (windowScroll / height) * 100;

        setScrollPosition(scrolled);
    }
    function handleClick(e) {
        // console.log(e)
    }


    useEffect(() => {
        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, [scrollPosition]);

    console.log("scroll:", scrollPosition);
    // console.log(window)


    return (
        <>

            {isVisible && (
                <button title="Voltar ao topo" className={styles.button} onClick={handleClick}>
                    <div className={styles.icon}>
                        <FaAngleUp size={25} />
                    </div>
                </button>
            )}
        </>
    )
}
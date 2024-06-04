import styles from './styles.module.scss'
import { ReactNode, InputHTMLAttributes } from 'react';


interface CheckBoxProps extends InputHTMLAttributes<HTMLInputElement> {
    children?: ReactNode,


}

export default function CheckBox({ children, ...rest }: CheckBoxProps) {
    return (
        <>
            <label className={styles.customCheckbox}>
                <input type="checkbox" {...rest} />
                <span className={styles.checkmark}></span>
                {children}
            </label>
        </>
    )
}
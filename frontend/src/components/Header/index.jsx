import { Link } from "react-router-dom";

import styles from './styles.module.css'
import { SearchBox } from "../SearchBox";

export const Header = () => {

    return (
        <header className={styles.header}>
            <Link to='/'>
                <h1>JS Almanaque</h1>
            </Link>
            <SearchBox />
        </header>
    )
}
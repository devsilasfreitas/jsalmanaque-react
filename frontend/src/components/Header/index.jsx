import { useNavigate } from "react-router-dom"
import { Link } from "react-router-dom"

export const Header = () => {
  const URLparameters = new URLSearchParams(window.location.search);
  const searchTerm = URLparameters.get('q');
    return (
        <header>
            <Link to='/'>
                <h1>JS Almanaque</h1>
            </Link>
        <form action="/search" method="get">
            <input type="text" name="q" defaultValue={searchTerm}/>
            <button type="submit">Pesquisar</button>
        </form>
        </header>
    )
}
import { Input } from 'antd';
const { Search } = Input;


export const SearchBox = ({style}) => {

    const onSearch = (value) => {
        URLparameters.set('q', value);
        window.location.search = URLparameters.toString();
    }

    return (
        <form action="/search" method="get">
            <Search
                placeholder="Pesquisa..."
                onSearch={onSearch}
                name="q"
                style={{display: "block", ...style}}
            />
        </form>
    )
}
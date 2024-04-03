import { Input } from 'antd';
import { useRef } from 'react';
const { Search } = Input;


export const SearchBox = ({style, hidden}) => {
    const form = useRef();

    const onSearch = () => {
        form.current?.submit();
    }


    return (
        <form action="/search" method="get" ref={form} hidden={hidden}>
            <Search
                placeholder="Pesquisa..."
                onSearch={onSearch}
                name="q"
                style={{display: "block", ...style}}
            />
        </form>
    )
}
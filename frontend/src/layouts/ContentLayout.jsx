import { useEffect, useState } from "react";
import { useContents } from "../contexts/ContentsContext"
import { useParams, Outlet } from "react-router-dom";

export default function ContentLayout ()  {
    const { getContentsSorted } = useContents();
    const [contents, setContents] = useState();
    const { language } = useParams();
    useEffect(() => {
        const contents = getContentsSorted(language);
        setContents(contents);
        console.log(contents);
    }, [getContentsSorted, language]);
    return (
        <Outlet />
    )
}
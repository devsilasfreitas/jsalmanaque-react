import { Link } from "react-router-dom";
import { useContents } from "../../contexts/ContentsContext";
import { useEffect, useState } from "react";
import { makeSearch } from "../../functions/makeSearch";

export default function Search() {
  const { contents } = useContents();
  const [results, setResults] = useState([]);
  const URLparameters = new URLSearchParams(window.location.search);
  const searchTerm = URLparameters.get('q');
  
  useEffect(() => {
    async function fetchData() {
      const results = await makeSearch({ searchTerm, contents });
      setResults(results);
    }

    fetchData();
  }, [searchTerm, contents]);

  // Atualiza o título da página
  useEffect(() => {
    document.title = searchTerm ? `Resultados para "${searchTerm}"` : 'Pesquisa';
  }, [searchTerm]);

  return (
    <div>
      {results?.map((content) => (
        <Link to={content.pagePath} key={content.id}>
          <h3>{content.title}</h3>
          <p> {content.module} - {content.language}</p>
          <p>Atualizado por {content.userName} em {new Date(content?.updatedAt.seconds * 1000 + content?.updatedAt.nanoseconds / 1000000).toLocaleString()}</p>
        </Link>
      ))}
    </div>
  )
}

import { Link } from "react-router-dom";
import { useContents } from "../../contexts/ContentsContext";
import { useEffect, useState } from "react";
import { makeSearch } from "../../functions/makeSearch";

import Styles from "./Search.module.css";

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
    <div className={Styles.container}>
      {results?.map((content) => (
        <Link to={content.pagePath} key={content.id}>
          <div className={Styles.card}>
            <section className={Styles.titleSection}>
              <h3 className={Styles.title}>{content.title}</h3>
              <p className={Styles.subtitle}> {content.module} - {content.language}</p>
            </section>
            <p className={Styles.date}>Atualizado por {content.userName} em {new Date(content?.updatedAt.seconds * 1000 + content?.updatedAt.nanoseconds / 1000000).toLocaleDateString()}</p>
          </div>
        </Link>
      ))}
    </div>
  )
}

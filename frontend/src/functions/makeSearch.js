export const makeSearch = ({ searchTerm, contents }) => {
    try {
        if (!searchTerm) {
            // Se não houver termo de pesquisa, retorne todos os conteúdos
            return contents;
        }

        // Converta searchTerm para minúsculas para tornar a pesquisa insensível a maiúsculas e minúsculas
        const searchTermLower = searchTerm.toLowerCase();

        // Filtrar documentos que contêm o termo de pesquisa na pagePath, keywords ou htmlContent
        const results = contents?.filter(content => {
            // Verifique se o termo de pesquisa está presente na pagePath ou nas keywords
            const pagePathMatches = content.pagePath.toLowerCase().includes(searchTermLower);
            const keywordMatches = content.keyWords.some(keyword =>
                keyword.toLowerCase().includes(searchTermLower)
            );

            // Verifique se o termo de pesquisa está presente no htmlContent
            const htmlContent = content.htmlContent;
            const contentWithoutTags = htmlContent.replace(/<[^>]*>/g, '').toLowerCase();
            const contentMatches = contentWithoutTags.includes(searchTermLower);

            // Se houver uma correspondência em algum lugar, retorne true
            return pagePathMatches || keywordMatches || contentMatches;
        });

        return results || []; // Retorna os resultados ou um array vazio se não houver correspondência
    } catch (error) {
        alert('Erro ao pesquisar conteúdos!');
        console.error('Erro ao pesquisar conteúdos:', error);
        return [];
    }
}

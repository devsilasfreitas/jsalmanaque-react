import { useContents } from "../../../contexts/ContentsContext";

export default function Excluir ({id}) {
    const { removeContent } = useContents();

    const handleClick = () => {
        console.log(id);
        if (window.confirm('Tem certeza que deseja excluir este conteúdo?')) {
            removeContent(id).then(() => alert('Conteúdo excluído com sucesso!')).catch((error) => {
                alert('Erro ao excluir o conteúdo. Tente novamente mais tarde.');
                console.log(error);
            });
        } else {
            alert('Operação cancelada!');
        }
    }
    return (
        <button onClick={handleClick}>Excluir</button>
    )
}
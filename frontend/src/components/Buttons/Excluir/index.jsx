import { getDoc, doc } from "firebase/firestore";
import { useContents } from "../../../contexts/ContentsContext";
import { updateOrderPages } from "../../../functions/updateOrderPages";
import { db } from "../../../config/firebase";

export default function Excluir ({id}) {
    const { removeContent } = useContents();

    const handleClick = async () => {
        if (window.confirm('Tem certeza que deseja excluir este conteúdo?')) {
            const content = await getDoc(doc(db, 'contents', id)).then((doc) => doc.data());
            await updateOrderPages(content, true);
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
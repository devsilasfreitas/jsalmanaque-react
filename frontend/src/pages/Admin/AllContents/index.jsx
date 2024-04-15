import {useContents} from "../../../contexts/ContentsContext"
import Ver from "../../../components/Buttons/Ver"
import Atualizar from "../../../components/Buttons/Atualizar"
import Excluir from "../../../components/Buttons/Excluir"
import { ExcluirTudo } from "../../../components/Buttons/ExcluirTudo";

export default function AllContents () {


    const {contents} = useContents();

    return (
        <>
            <div style={{maxHeight: "100vh"}}>
                <section style={{display: 'flex', justifyContent: 'flex-end', margin: '20px 50px'}}><ExcluirTudo /></section>
                <table style={{borderCollapse: 'collapse', margin: '50px auto', maxWidth: '100vw', overflow: 'scroll'}}>
                    <thead style={{backgroundColor: 'black', color: 'white', borderRadius: '10px'}}>
                        <tr>
                            <th>Titulo</th>
                            <th>Modulo</th>
                            <th>Linguagem</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody style={{backgroundColor: 'white', color: 'black', borderRadius: '10px'}}>
                        {contents?.map(content => (
                            <tr key={content?.id} >
                                <th style={{padding: '5px 20px'}}>{content?.title}</th>
                                <th style={{padding: '5px 20px'}}>{content?.module}</th>
                                <th style={{padding: '5px 20px'}}>{content?.language}</th>
                                <th style={{padding: '5px 20px'}}>
                                    <div style={{display: 'flex', justifyContent: 'space-around', alignSelf: 'center', gap: '5px'}}>
                                        <Ver id={content?.id} />
                                        <Atualizar id={content?.id} />
                                        <Excluir id={content?.id} />
                                    </div>
                                    
                                </th>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    )
}
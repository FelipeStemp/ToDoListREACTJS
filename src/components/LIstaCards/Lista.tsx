import * as S from './styled';
import CardTarefa from '../../components/CardTarefa/CardTarefa';
import { ApiModel } from '../../Interface/Model';

interface conteudo {
    data: ApiModel[]
}

function ListaTarefas({data} : conteudo) {

    
  const filterPendente = data.filter((item) => item.completed == false)
  const filterComplete = data.filter((item) => item.completed == true)
    return (
        <S.ListaBody>
            <S.ConteudosBody>
                <S.Titulo>Pendente</S.Titulo>
                <S.CardsDiv>
                    {filterPendente.map((tarefas) => (
                        <CardTarefa
                            name={tarefas.name}
                            _id={tarefas._id}
                            description={tarefas.description}
                            completed={tarefas.completed}
                        />
                    ))}
                </S.CardsDiv>
            </S.ConteudosBody>

            <S.Separacao />

            <S.ConteudosBody>
                <S.Titulo>Em Porgresso</S.Titulo>
                <S.CardsDiv>
                    {filterComplete.map((tarefas) => (
                        <CardTarefa
                            name={tarefas.name}
                            _id={tarefas._id}
                            description={tarefas.description}
                            completed={tarefas.completed}
                        />
                    ))}
                </S.CardsDiv>
            </S.ConteudosBody>

            <S.Separacao />

            <S.ConteudosBody>
                <S.Titulo>Concluído</S.Titulo>
                <S.CardsDiv>
                    {filterComplete.map((tarefas) => (
                        <CardTarefa
                            name={tarefas.name}
                            _id={tarefas._id}
                            description={tarefas.description}
                            completed={tarefas.completed}
                        />
                    ))}
                </S.CardsDiv>
            </S.ConteudosBody>
        </S.ListaBody>
    )
}

export default ListaTarefas
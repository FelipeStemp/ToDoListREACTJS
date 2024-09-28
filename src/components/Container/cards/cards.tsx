import { useEffect, useState } from 'react';
import { ApiModel } from '../../../Interface/Model';
import CardList from '../../Card/Card';
import * as S from './styled';

function CardsFormat() {

  
  const [data, setData] = useState<ApiModel[]>([]);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    fetch('https://api-to-do-list-lu3m.onrender.com/', { method: 'GET',
      mode: 'cors',})
      .then((response)=>
      {
        if(!response.ok){
          throw new Error('Erro ao buscar atividades');
        }
        return response.json();
      })
      .then((data) => {
        setData(data);
        console.log(data);
      })
      .catch((error)=>{
        setError(error);
        console.log("data");
      });
  }, []);

  return(
    <S.CardsDiv>

      {error && <p>{error.message}</p>}
      {data.map((lista) =>(
        <CardList
        key={lista._id}
        _id={lista._id}
        name={lista.name}
        description={lista.description}
        completed={lista.completed}
        />

      ))}

    </S.CardsDiv>
  )
}

export default CardsFormat
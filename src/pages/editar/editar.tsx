import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import CardList from '../../components/Card/Card';
import { ApiModel } from '../../Interface/Model';
import * as S from './styled';

function Editar() {

  const location = useLocation();
  const { id } = location.state;

  const [data, setData] = useState<ApiModel | null>(null);
  const [error, setError] = useState<Error | null>(null);


  console.log("id passado", id)
  useEffect(() => {

    if (id) {
      fetch(`https://api-to-do-list-lu3m.onrender.com/id/${id}`, {
        method: 'GET',
        mode: 'cors',
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error('Erro ao buscar atividades');
          }
          return response.json();
        })
        .then((data) => {
          setData(data);
          console.log(data);
        })
        .catch((error) => {
          setError(error);
          console.log(error);
        });
    }
  }, []);

  return (
    <S.EditarBody>

      {data && (
        <CardList
          data={{
            _id: data._id,
            name: data.name,
            description: data.description,
            completed: data.completed,
          }}
        />
      )}

    </S.EditarBody>
  )
}

export default Editar
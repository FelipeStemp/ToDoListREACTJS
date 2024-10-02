import { useEffect, useState } from 'react';
import { ApiModel } from '../../Interface/Model';
import TableList from '../../components/Table/Table';
import * as S from './styled';

function Home() {
  const [data, setData] = useState<ApiModel[]>([]);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    fetch('https://api-to-do-list-lu3m.onrender.com/', {
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
  }, []);
  console.log(data);


  return (
    <S.HomeBody>
      <TableList data={data}></TableList>
    </S.HomeBody>

  )
}

export default Home
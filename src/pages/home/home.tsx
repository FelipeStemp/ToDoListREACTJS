import { useEffect, useState } from 'react';
import { ApiModel } from '../../Interface/Model';
import TableList from '../../components/Table/Table';
import * as S from './styled';
import { Box, CircularProgress, Modal } from '@mui/material';
import CardTarefa from '../../components/CardTarefa/CardTarefa';
import { Key } from '@mui/icons-material';

function Home() {
  const [data, setData] = useState<ApiModel[]>([]);
  const [error, setError] = useState<Error | null>(null);
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    setLoading(true)
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
        setLoading(false)
      })
      .catch((error) => {
        setError(error);
        console.log(error);
      });
  }, []);

  if (loading) {
    return (
      <Box style={{ width: '100vw', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: '#2F333F' }}>
        <CircularProgress />
      </Box>
    )
  }
  return (
    <S.HomeBody>
      {/* <TableList data={data}></TableList>  */}
      {data.map((tarefas) => (
        <CardTarefa 
          name={tarefas.name} 
          _id={tarefas._id} 
          description={tarefas.description}
          completed={tarefas.completed}
        />
      ))}
      
    </S.HomeBody>

  )
}

export default Home
import { useEffect, useState } from 'react';
import { ApiModel } from '../../Interface/Model';
import TableList from '../../components/Table/Table';
import * as S from './styled';
import { Box, ButtonGroup, CircularProgress, Modal } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import CardList from '../../components/Card/Card';
import ListaTarefas from '../../components/LIstaCards/Lista';
import TableRowsIcon from '@mui/icons-material/TableRows';
import ViewColumnIcon from '@mui/icons-material/ViewColumn';

function Home() {
  const [data, setData] = useState<ApiModel[]>([]);
  const [error, setError] = useState<Error | null>(null);
  const [loading, setLoading] = useState<boolean>(true)
  const [isModalOpenCriar, setIsModalOpenCriar] = useState(false);
  const [showComponent, setShowComponente] = useState(() =>{
    const valueSelected = localStorage.getItem('showComponent');
    return valueSelected === 'true'
  })
  const handleOpenModalCriar = () => setIsModalOpenCriar(true);
  const handleCloseModalCriar = () => setIsModalOpenCriar(false);
  const toggleComponent = (mostrar: boolean) => setShowComponente(mostrar);

  useEffect(() => {
    localStorage.setItem('showComponent', showComponent.toString());
  }, [showComponent])

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

      <S.HomeHeader>

        <AddIcon sx={{ color: "white" }} fontSize="large" onClick={handleOpenModalCriar} />

        <ButtonGroup variant="contained" aria-label="Basic button group" sx={{ gap: '10px', display:'flex', alignItems: 'center', padding:'5px' }}>
          <TableRowsIcon sx={{ color: "white" }} fontSize="large" onClick={() => toggleComponent(false)}/>
          <ViewColumnIcon sx={{ color: "white" }} fontSize="large" onClick={() => toggleComponent(true)}/>
        </ButtonGroup>

        <CardList
          ativo={true}
          open={isModalOpenCriar}
          handleClose={handleCloseModalCriar}
        />
      </S.HomeHeader>

        {showComponent ? <ListaTarefas data={data} /> : <TableList data={data}></TableList>}
        {/* <TableList data={data}></TableList> */}



    </S.HomeBody>

  )
}

export default Home
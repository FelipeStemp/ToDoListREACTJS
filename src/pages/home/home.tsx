import { useEffect, useState } from 'react';
import { ApiModel } from '../../Interface/Model';
import TableList from '../../components/Table/Table';
import * as S from './styled';
import { Box, ButtonGroup, CircularProgress } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import CardList from '../../components/Modal/cardTarefas/Card';
import ListaTarefas from '../../components/LIstaCards/Lista';
import TableRowsIcon from '@mui/icons-material/TableRows';
import ViewColumnIcon from '@mui/icons-material/ViewColumn';
import { fetchData } from '../../methods/fetch';
import Header from '../../components/HeaderDiv/header';

function Home() {
  const [data, setData] = useState<ApiModel[]>([]);
  const [error, setError] = useState<Error | null>(null);
  const [loading, setLoading] = useState<boolean>(true)
  const [isModalOpenCriar, setIsModalOpenCriar] = useState(false);
  const [showComponent, setShowComponente] = useState(() => {
    const valueSelected = localStorage.getItem('showComponent');
    return valueSelected === 'true'
  })
  const [firstAcess, setFirst] = useState(true)

  const handleOpenModalCriar = () => setIsModalOpenCriar(true);
  const handleCloseModalCriar = () => { setIsModalOpenCriar(false) }
  const toggleComponent = (mostrar: boolean) => setShowComponente(mostrar);

  useEffect(() => {
    localStorage.setItem('showComponent', showComponent.toString());
  }, [showComponent])

  useEffect(() => {
    setLoading(true)
    fetchData()
      .then((data: ApiModel[]) =>
        setData(data))
      .catch((error: string) =>
        console.log(error));
    setFirst(false);
    setLoading(false)
  })

  if (loading) {
    return (
      <S.HomeBody>
        <Header>
          <ButtonGroup variant="contained" aria-label="Basic button group" sx={{ gap: '10px', display: 'flex', alignItems: 'center', padding: '5px' }}>
            <AddIcon sx={{ color: "white" }} fontSize="large" onClick={handleOpenModalCriar} />
            <TableRowsIcon sx={{ color: "white" }} fontSize="large" onClick={() => toggleComponent(false)} />
            <ViewColumnIcon sx={{ color: "white" }} fontSize="large" onClick={() => toggleComponent(true)} />
          </ButtonGroup>

          <CardList
            ativo={true}
            open={isModalOpenCriar}
            handleClose={handleCloseModalCriar}
          />
        </Header>
        <Box style={{ width: '100vw', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: '#2F333F' }}>
          <CircularProgress />
        </Box>
      </S.HomeBody>

    )
  }
  return (
    <S.HomeBody>

      <Header justify='center'>
        <ButtonGroup variant="contained" aria-label="Basic button group" sx={{ gap: '10px', display: 'flex', alignItems: 'center', padding: '5px' }}>
          <AddIcon sx={{ color: "white" }} fontSize="large" onClick={handleOpenModalCriar} />
          <TableRowsIcon sx={{ color: "white" }} fontSize="large" onClick={() => toggleComponent(false)} />
          <ViewColumnIcon sx={{ color: "white" }} fontSize="large" onClick={() => toggleComponent(true)} />
        </ButtonGroup>

        <CardList
          ativo={true}
          open={isModalOpenCriar}
          handleClose={handleCloseModalCriar}
        />
      </Header>

      {showComponent ? <ListaTarefas data={data} /> : <TableList data={data}></TableList>}

    </S.HomeBody>

  )
}

export default Home
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Alert, Switch, TextField } from '@mui/material';
import { ApiModel } from '../../Interface/Model';

import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ButtonContainer from '../button/ButtonCont';
import * as S from './styled';

interface dataProps {
  data: ApiModel;
  ativo?: boolean | false;
}

function CardList({ data, ativo }: dataProps) {

  const navigate = useNavigate();
  const [isComplete, setCompleto] = useState(data.completed);
  const [nome, setNome] = useState(data.name);
  const [desc, setDesc] = useState(data.description);
  const [alertUpdate, setAlertUpdateOpen] = useState(false);
  const [alertDelete, setAlertDeleteOpen] = useState(false);
  const [alertCreate, setAlertCreateOpen] = useState(false);

  useEffect(() => {
    setCompleto(data.completed);
    setNome(data.name);
    setDesc(data.description);
  }, [data.completed, data.name, data.description]);

  const handleDeleteSuccess = (value: boolean) => {
    if (value) {
      setAlertDeleteOpen(value);
      setTimeout(() => {
        setAlertDeleteOpen(false);
        navigate("/")
      }, 2000);

    }
  }
  const handleUpdateSuccess = (value: boolean) => {
    if (value) {
      setAlertUpdateOpen(value);
      setTimeout(() => {
        setAlertUpdateOpen(false);
        navigate("/")
      }, 2000);
    }
  }
  const handleCreateSuccess = (value: boolean) => {
    if (value) {
      setAlertCreateOpen(value);
      setTimeout(() => {
        setAlertCreateOpen(false);
        navigate("/")
      }, 2000);
    }
  }


  return (
    <S.DivCard>
      <TextField
        label="Título"
        onChange={(e) => setNome(e.target.value)}
        variant='standard'
        value={nome}

        InputProps={{
          sx: { color: 'white', margin: "2vw 0px", textAlign: "center" }, // Muda a cor do texto
        }}

        InputLabelProps={{
          sx: { color: 'white' }, // Muda a cor do rótulo
        }}
      />

      <TextField
        sx={{ color: "white" }}
        fullWidth
        label="Descrição"
        multiline
        maxRows={4}
        value={desc}
        margin='dense'
        variant='standard'
        onChange={(e) => setDesc(e.target.value)}
        InputProps={{
          sx: { color: 'white', margin: "2vw 0px" },
        }}
        InputLabelProps={{
          sx: { color: 'white' },
        }}
      />

      <label>Completo</label>
      <Switch checked={isComplete} onChange={() => setCompleto(!isComplete)} />

      {alertUpdate && <Alert severity='success'> Tarefa atualizada com sucesso</Alert>}
      {alertDelete && <Alert severity='success'> Tarefa deletada com sucesso</Alert>}
      {alertCreate && <Alert severity='success'> Tarefa criada com sucesso</Alert>}
      <S.DivBtn>       
          <ButtonContainer variant='contained' 
            data={{ _id: "", name: nome, description: desc, completed: isComplete }} 
            action='criar' children='Criar' desabilitar={!ativo} colorS='success' click={() => handleCreateSuccess(true)}
          />

          <ButtonContainer id={data._id} variant='contained'
            data={{ _id: data._id, name: nome, description: desc, completed: isComplete }}
            action="Edit" children="Editar" desabilitar={ativo} click={() => handleUpdateSuccess(true)} 
          />

          <ButtonContainer id={data._id} variant='contained' 
            action='delete' children='Excluir' colorS='error' 
            desabilitar={ativo} click={() => handleDeleteSuccess(true)} 
          />
      </S.DivBtn>
    </S.DivCard>
  )
}

export default CardList;
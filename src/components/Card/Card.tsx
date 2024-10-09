/* eslint-disable @typescript-eslint/no-unused-vars */
import { Alert, Switch, TextField } from '@mui/material';
import { ApiModel } from '../../Interface/Model';

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ButtonContainer from '../button/ButtonCont';
import * as S from './styled';

interface dataProps {
  data: ApiModel;
}

function CardList({ data }: dataProps) {

  const navigate = useNavigate();
  const [isComplete, setCompleto] = useState(data.completed);
  const [nome, setNome] = useState(data.name);
  const [desc, setDesc] = useState(data.description);
  const [alertUpdate, setAlertUpdateOpen] = useState(false);
  const [alertDelete, setAlertDeleteOpen] = useState(false);

  console.log("is aqui:", data._id)

  const handleToggle = () => {
    setCompleto(!isComplete)
  }

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNome(event.target.value);
  };

  const handleDescChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDesc(event.target.value);
  };

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
      setAlertDeleteOpen(value);
      setTimeout(() => {
        setAlertDeleteOpen(false);
        navigate("/")
      }, 2000);
    }
  }


  return (
    <S.DivCard>


      <TextField
        label="Título"
        onChange={handleNameChange}
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
        onChange={handleDescChange}

        InputProps={{
          sx: { color: 'white', margin: "2vw 0px" }, // Muda a cor do texto
        }}

        InputLabelProps={{
          sx: { color: 'white' }, // Muda a cor do rótulo
        }}
      />

      <label>Completo</label>
      <Switch checked={isComplete} onChange={handleToggle} />

      {alertUpdate && <Alert severity='success'> Atualizado com sucesso</Alert>}
      {alertDelete && <Alert severity='success'> Deletado com sucesso</Alert>}
      <S.DivBtn>
        <div style={{ display: "flex", width: "10vw" }}>
          <ButtonContainer variant='contained' data={{ _id: "", name: nome, description: desc, completed: isComplete }} action='criar' children='Criar' colorS='success' />
        </div>

        <div onClick={() => handleUpdateSuccess(true)} style={{ display: "flex", width: "10vw" }}>
          <ButtonContainer id={data._id} variant='contained' data={{ _id: data._id, name: nome, description: desc, completed: isComplete }} action="Edit" children="Editar" />
        </div>

        <div onClick={() => handleDeleteSuccess(true)} style={{ display: "flex", width: "10vw" }}>
          <ButtonContainer id={data._id} variant='contained' action='delete' children='Excluir' colorS='error' />
        </div>
      </S.DivBtn>
    </S.DivCard>
  )
}

export default CardList;
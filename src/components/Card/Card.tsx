/* eslint-disable @typescript-eslint/no-unused-vars */
import { Alert, Button, Switch, TextField } from '@mui/material';
import { ApiModel } from '../../Interface/Model';

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as S from './styled';


function CardList({_id, name, description, completed} : ApiModel){

  const navigate = useNavigate();
  const [isComplete, setCompleto] = useState(completed);
  const [nome, setNome] = useState(name);
  const [desc, setDesc] = useState(description);
  const [alertOpen, setAlertOpen] = useState(false);

  const handleToggle = () => {
    setCompleto(!isComplete)
  }

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNome(event.target.value);
  };

  const handleDescChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDesc(event.target.value);
  };

  const handleSave = () => {
    fetch(`https://api-to-do-list-lu3m.onrender.com/updateByName/${name}`, 
      { method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          completed: isComplete,
          name: nome,
          description: desc,
        })
      }
    ).then((response) => {
      if(!response.ok){
        throw new Error("Erro ao atualizar")
      }
    }).then(data => {
      console.log('att bem sucedida', data)
      setAlertOpen(true);

      setTimeout(() => {
        navigate("/Home")
      }, 2000)

    }).catch(error => {
      console.log('Error: ', error)
    })
  }

  return(
    <S.DivCard>
      

      <TextField
        label="Título"
        onChange={handleNameChange}
        variant='standard'
        value={nome}

        InputProps={{
          sx: { color: 'white', margin:"2vw 0px", textAlign:"center"}, // Muda a cor do texto
        }}

        InputLabelProps={{
          sx: { color: 'white' }, // Muda a cor do rótulo
        }}
      />

      <TextField
        sx={{color:"white"}}
        fullWidth
        label="Descrição"
        multiline
        maxRows={4}
        value={desc}
        margin='dense'
        variant='standard'
        onChange={handleDescChange}

        InputProps={{
          sx: { color: 'white', margin:"2vw 0px" }, // Muda a cor do texto
        }}

        InputLabelProps={{
          sx: { color: 'white' }, // Muda a cor do rótulo
        }}  
      />

      <label>Completo</label>
      <Switch checked={isComplete} onChange={handleToggle}/>

      {alertOpen && <Alert severity='success'> Atualizado com sucesso</Alert>}
      <S.DivBtn>
        <Button sx={{width:"20vw"}} variant='contained' onClick={handleSave}>SALVAR</Button>
        <Button sx={{width:"20vw"}} variant="contained" color="error">EXCLUIR</Button>
      </S.DivBtn>

      
      
    </S.DivCard>
  )
}

export default CardList;
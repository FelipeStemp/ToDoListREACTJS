/* eslint-disable @typescript-eslint/no-unused-vars */
import { Button, Switch, TextField } from '@mui/material';
import { ApiModel } from '../../Interface/Model';

import { useState } from 'react';
import * as S from './styled';


function CardList({_id, name, description, completed} : ApiModel){

  const [isComplete, setCompleto] = useState(completed);

  const handleToggle = () => {
    setCompleto(!isComplete)
  }

  const handleSave = () => {
    fetch(`https://api-to-do-list-lu3m.onrender.com/updateByName/${name}`, 
      { method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          completed: isComplete,
          name: name,
          description: description,
        })
      }
    ).then((response) => {
      if(!response.ok){
        throw new Error("Erro ao atualizar")
      }
    }).then(data => {
      console.log('att bem sucedida', data)
    }).catch(error => {
      console.log('Error: ', error)
    })
  }

  return(
    <S.DivCard>

      <a>{name}</a>

      <TextField
        fullWidth
        label="Descrição"
        multiline
        maxRows={4}
        value={description}
        margin='dense'
      />

      <Switch checked={isComplete} onChange={handleToggle}/>

      <S.DivBtn>
        <Button fullWidth variant='contained' onClick={handleSave}>SALVAR</Button>
        <Button fullWidth variant="outlined" color="error">EXCLUIR</Button>
      </S.DivBtn>
      
    </S.DivCard>
  )
}

export default CardList;
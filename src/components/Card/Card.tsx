/* eslint-disable @typescript-eslint/no-unused-vars */
import { Alert, Box, CircularProgress, Modal, Switch, TextField } from '@mui/material';
import { ApiModel } from '../../Interface/Model';

import { useEffect, useState } from 'react';
import ButtonContainer from '../button/ButtonCont';
import CloseIcon from '@mui/icons-material/Close';
import * as S from './styled';

interface dataProps {
  id?: string,
  ativo?: boolean | false;
  open: boolean,
  handleClose: () => void;
  fetchData: () => void;
}

function CardList({ id, ativo, open, handleClose, fetchData }: dataProps) {
  const [data, setData] = useState<ApiModel>({});
  const [alertError, setError] = useState(false);
  const [alertSucess, setSucess] = useState(false);
  const [alertaText, setAlertaTxt] = useState("")
  const [loading, setLoading] = useState<boolean>(false)

  const [isComplete, setCompleto] = useState(data.completed);
  const [nome, setNome] = useState(data.name);
  const [desc, setDesc] = useState(data.description);

  useEffect(() => {
    setLoading(true)
    setCompleto(data.completed);
    setNome(data.name);
    setDesc(data.description);
    setLoading(false)
  }, [data.completed, data.name, data.description]);

  const resetData = () => {
    setData({} as ApiModel);
    setNome("");
    setDesc("");
    setCompleto(false);
    setError(false);
    setSucess(false);
    setAlertaTxt("");
  };

  const handleSuccess = (message: string) => {
    setSucess(true);
    setAlertaTxt(message)
    setTimeout(() => {
      resetData();
      fetchData();
    }, 1300);
  };
  
  const handleCloseWithoutUpdate = () => {
    resetData();
    handleClose();
  };

  const handleError = (message: string) => {
    setError(true);
    setAlertaTxt(message)
    setTimeout(() => {
      setError(false)
    }, 1000);
  };

  useEffect(() => {
    if (id) {
      setLoading(true)
      fetch(`https://api-to-do-list-lu3m.onrender.com/id/${id}`, {
        method: 'GET',
        mode: 'cors',
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error('Erro ao buscar atividades');
          }
          return response.json();
        }).then((data) => {
          setData(data);
          setLoading(false)
        })
        .catch((error) => {
          setError(error);
        });
    }
  }, []);

  if (loading == true) {
    return (
      <Modal open={open} style={{ width: '100vw', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <CircularProgress />
      </Modal>
    )
  } else {
    return (
      <Modal open={open} style={{ width: '100vw', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <S.DivCard>
          <S.HeaderDiv>
            <button style={{ backgroundColor: 'transparent', border: 'none', color: 'white' }} onClick={handleCloseWithoutUpdate}>
              <CloseIcon fontSize='large' />
            </button>
          </S.HeaderDiv>
          <TextField
            label="Título"
            onChange={(e) => setNome(e.target.value)}
            variant='standard'
            value={nome}

            InputProps={{
              sx: { color: 'white', margin: "2vw 0px", textAlign: "center" },
            }}

            InputLabelProps={{
              sx: { color: 'white' },
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
          <Switch disabled={ativo} checked={isComplete} onChange={() => setCompleto(!isComplete)} />

          <S.DivBtn>
            <ButtonContainer variant='contained'
              data={{ _id: "", name: nome, description: desc, completed: isComplete }}
              action='criar' children='Criar' desabilitar={!ativo} colorS='success'
              onSuccess={() => handleSuccess("Criado com sucesso")}
              onError={() => handleError("Erro ao criar, insira todos os dados obrigatorios")}
            />

            <ButtonContainer id={data._id} variant='contained'
              data={{ _id: data._id, name: nome, description: desc, completed: isComplete }}
              action="Edit" children="Salvar" desabilitar={ativo}
              onSuccess={() => handleSuccess("Atualizado com sucesso")}
              onError={() => handleError("Erro ao atualizar, insira todos os dados obrigatorios")}
            />

            <ButtonContainer id={data._id} variant='contained'
              action='delete' children='Excluir' colorS='error'
              desabilitar={ativo}
              onSuccess={() => handleSuccess("Deletado com sucesso")}
              onError={() => handleError("Erro ao deletar")}
            />

          </S.DivBtn>
          {alertSucess && <Alert severity='success'> {alertaText}</Alert>}
          {alertError && <Alert severity='error'> {alertaText}</Alert>}
        </S.DivCard>
      </Modal>
    )
  }

}

export default CardList;
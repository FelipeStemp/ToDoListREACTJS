import { Button } from "@mui/material";
import { useNavigate } from 'react-router-dom';
import { ApiModel } from "../../Interface/Model";

interface props {
  id?: string,
  action?: string,
  children?: string,
  data?: ApiModel,
  colorS?: 'primary' | 'error' | 'success';
  variant?: 'contained' | 'outlined';
  desabilitar?: boolean,
}
function ButtonContainer({ id = '', action = '', children = '', data, colorS, variant }: props) {
  const navigate = useNavigate();

  const HandleEdit = (id: string) => {
    navigate("/Editar", { state: { id } });
  }

  const handleCriar = (dataCriar: ApiModel) => {
    console.log("dasdsads", dataCriar)
    fetch("https://api-to-do-list-lu3m.onrender.com/createitem", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: dataCriar.name,
        description: dataCriar.description,
      }),
    }).then((response) => {
      if (!response.ok) {
        throw new Error("Erro ao Criar")
      }
      return response.json();
    }).then(data => {
      console.log('Criação bem-sucedida', data);
    }).catch(error => {
      console.log('Error: ', error);
    });
  }

  const handleAtualizar = (dataAtt: ApiModel) => {
    fetch(`https://api-to-do-list-lu3m.onrender.com/updateByID/${dataAtt._id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        completed: dataAtt.completed,
        name: dataAtt.name,
        description: dataAtt.description,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Erro ao atualizar");
        }
        return response.json();
      })
      .then(data => {
        console.log('Atualização bem-sucedida', data);
      })
      .catch(error => {
        console.log('Error: ', error);
      });
  };

  const handleDeleter = (id_coleted: string) => {
    fetch('https://api-to-do-list-lu3m.onrender.com/delete', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: id_coleted,
      })
    }).then((response) => {
      if (!response.ok) {
        throw new Error("Erro ao deletar")
      }
      return response.json()
    }).catch(error => {
      console.log('Error:', error)
    })
  }

  const handleAction = (action: string) => {
    switch (action) {
      case "delete":
        handleDeleter(id);
        break;
      case "criar":
        if (data) {
          console.log(data)
          handleCriar(data);
        } else {
          console.error("Data is undefined, cannot update.");
        }
        break;
      case "editOpen":
        HandleEdit(id);
        break;
      case "Edit":
        if (data) {
          handleAtualizar(data);
        } else {
          console.error("Data is undefined, cannot update.");
        }
        break;
    }
  }

  return (
    <Button sx={{ margin: "10px" }}
      size="small"
      variant={variant}
      onClick={() => handleAction(action)}
      color={colorS}
      fullWidth
    >
      {children}
    </Button>
  )
}

export default ButtonContainer
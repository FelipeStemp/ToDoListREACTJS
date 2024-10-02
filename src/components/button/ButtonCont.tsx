import { Button } from "@mui/material";
import { useNavigate } from 'react-router-dom';

interface props {
  id?: string,
  action?: string,

}
function ButtonContainer({ id = '', action = '' }: props) {
  const navigate = useNavigate();

  

  const handleDeleter = (id_coleted: string) {
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
      setTimeout(() => {
        navigate("/")
      }, 1500)
      return response.json()
    }).catch(error => {
      console.log('Error:', error)
    })
  }
/*
  if(atualizar){
    fetch(`https://api-to-do-list-lu3m.onrender.com/updateByID/${id_coleted}`,
      {
        method: 'PUT',
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
      if (!response.ok) {
        throw new Error("Erro ao atualizar")
      }
    }).then(data => {
      console.log('att bem sucedida', data)

      setTimeout(() => {
        navigate("/")
      }, 2000)
    }).catch(error => {
      console.log('Error: ', error)
    })
  }*/

    const handleAction = (action: string) => {
      switch(action){
        case "delete":
          handleDeleter(id);
          break;
        ///case "criar":
          //handleCriar(data);
          //break;
        //case "atualizar":
          //handleUpdate(id_coleted, data);
          //break;
      }
    }
  
  return (
    <Button sx={{ boxShadow: "1px 1px 1px #E00000", color: "white", border: "solid 1px #E00000", margin: "10px" }} size="small" variant='outlined'
      onClick={() => handleAction(action)}>Excluir</Button>
  )
}

export default ButtonContainer
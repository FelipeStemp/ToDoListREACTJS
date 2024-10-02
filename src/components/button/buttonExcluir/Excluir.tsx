import { Button } from "@mui/material";
import { useNavigate } from 'react-router-dom';

interface props {
  id: string,
  deletado: (sucess: boolean) => void,
}
function ButtonExcluir({ id, deletado }: props) {
  const navigate = useNavigate();
  const HandleDelete = (id: string) => {

    fetch('https://api-to-do-list-lu3m.onrender.com/delete', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: id,
      })
    }).then((response) => {
      if (!response.ok) {
        throw new Error("Erro ao deletar")
      }
      deletado(true)
      setTimeout(() => {
        navigate("/")
      }, 1500)
      return response.json()
    }).catch(error => {
      console.log('Error:', error)
    })

  }
  return (
    <Button sx={{ boxShadow: "1px 1px 1px #E00000", color: "white", border: "solid 1px #E00000" }} size="small" variant='outlined'
      onClick={() => HandleDelete(id)}>Excluir</Button>
  )
}

export default ButtonExcluir
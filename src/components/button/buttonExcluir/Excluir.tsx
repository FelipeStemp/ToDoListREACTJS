import { Button } from "@mui/material";
import { useNavigate } from 'react-router-dom';

interface props {
  name: string,
  deletado: (sucess: boolean) => void,
}
function ButtonExcluir({ name, deletado }: props) {
  const navigate = useNavigate();
  const HandleDelete = (name: string) => {

    fetch('https://api-to-do-list-lu3m.onrender.com/delete', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: name,
      })
    }).then((response) => {
      if (!response.ok) {
        throw new Error("Erro ao deletar")
      }
      deletado(true)
      setTimeout(() => {
        navigate("/Home")
      }, 1500)
      return response.json()
    }).catch(error => {
      console.log('Error:', error)
    })

  }
  return (
    <Button sx={{ boxShadow: "1px 1px 1px #E00000", color: "white", border: "solid 1px #E00000" }} size="small" variant='outlined'
      onClick={() => HandleDelete(name)}>Excluir</Button>
  )
}

export default ButtonExcluir
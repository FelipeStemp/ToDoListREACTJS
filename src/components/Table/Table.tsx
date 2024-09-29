import { Button, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { ApiModel } from "../../Interface/Model";
import * as S from './styled';

interface dataProps {
    data: ApiModel[];
}

function TableList({data}: dataProps){

    const navigate = useNavigate();

    const HandleEdit = (name:string) => {
        navigate("/Editar", {state: {name}});
    }

    return(
        <S.DivTable>
            <TableContainer sx={{maxWidth: "90vw", borderRadius:"3px"}}>
            <TableHead >
                <TableRow 
                sx={{ 
                    backgroundColor: "#2F333F",  
                }}>
                    <TableCell sx={{color: "white", textAlign: "left"}}>Título</TableCell>
                    <TableCell sx={{color: "white", textAlign: "left"}}>Descrição</TableCell>
                    <TableCell sx={{color: "white", textAlign: "center"}}>Completo</TableCell>
                    <TableCell></TableCell>
                    <TableCell></TableCell>
                </TableRow>
            </TableHead>

            <TableBody>
                {data.map((lista) => (
                    <TableRow
                        key={lista._id}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                        <TableCell 
                        sx={{ 
                            color: "white",
                            width:"10vw",
                            maxWidth: "10vw",
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            textAlign: "left",
                        }}
                        >
                            {lista.name}
                        </TableCell>

                        <TableCell 
                        sx={{ 
                            color: "white",
                            width:"20vw",
                            maxWidth: "20vw",
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            textAlign: "left",
                        }}
                        >
                            {lista.description}
                        </TableCell>

                        <TableCell sx={{color: "white", textAlign: "center"}}>{lista.completed ? `Sim` : `Não`}</TableCell>

                        <TableCell>

                        <Button 
                        sx=
                        {{ 
                            boxShadow: "1px 1px 1px #156AEB", 
                            color: "white", 
                            border: "solid 1px #156AEB"
                        }} 
                        size="small" 
                        fullWidth 
                        variant='outlined'
                        onClick={() => HandleEdit(lista.name)}
                        >
                            Editar
                        </Button>
                        </TableCell>

                        <TableCell>

                        <Button sx={{boxShadow: "1px 1px 1px #E00000", color: "white", border: "solid 1px #E00000"}} size="small" fullWidth variant='outlined'
                        >
                            Excluir
                        </Button>
                        </TableCell>
                    </TableRow>
                ))}
                </TableBody>

            </TableContainer>
    
        </S.DivTable>
        
    )
}

export default TableList
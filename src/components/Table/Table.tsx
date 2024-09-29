import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material"
import { ApiModel } from "../../Interface/Model"
import * as S from './styled'

interface dataProps {
    data: ApiModel[];
}

function TableList({data}: dataProps){
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
                            maxWidth: "30vw",
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
                            maxWidth: "60vw",
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

                        <Button sx={{ boxShadow: "1px 1px 1px #156AEB", color: "white", border: "solid 1px #156AEB"}} size="small" fullWidth variant='outlined'
                        >
                            Editar
                        </Button>
                        </TableCell>

                        <TableCell>

                        <Button sx={{boxShadow: "1px 1px 1px #930500", color: "white", border: "solid 1px #930500"}} size="small" fullWidth variant='outlined'
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
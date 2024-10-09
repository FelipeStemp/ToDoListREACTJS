import AddIcon from '@mui/icons-material/Add';
import { TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow } from "@mui/material";
import { useNavigate } from 'react-router-dom';
import { ApiModel } from "../../Interface/Model";
import ButtonContainer from "../button/ButtonCont";
import * as S from './styled';
import { useState } from 'react';

interface dataProps {
    data: ApiModel[];
}

function TableList({ data }: dataProps) {
    const [page, setPage] = useState(0)
    const [rowsPerPage, setRows] = useState(5)

    const hangleChangePage = (event: React.MouseEvent<HTMLButtonElement>, newPage: number) =>{
        setPage(newPage);
    }

    const handleChangeRows = (event: React.MouseEvent<HTMLButtonElement>) =>{
        setRows(parseInt(event.target, 10));
        setPage(0)
    }

    const navigate = useNavigate();

    const handleCriar = () => {
        navigate("/Criar", {state: {ativo: true}});
    }

    return (
        <S.DivTable>
            <TableContainer sx={{ maxWidth: "90vw", borderRadius: "3px" }}>
                <TableHead >
                    <TableRow
                        sx={{
                            backgroundColor: "#2F333F",
                        }}>
                        <TableCell sx={{ color: "white", textAlign: "left" }}>Título</TableCell>
                        <TableCell sx={{ color: "white", textAlign: "left" }}>Descrição</TableCell>
                        <TableCell sx={{ color: "white", textAlign: "center" }}>Completo</TableCell>
                        <TableCell sx={{ display: "flex", justifyContent: "center" }}><AddIcon sx={{ color: "white" }} fontSize="large" onClick={handleCriar} /></TableCell>
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
                                    width: "10vw",
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
                                    width: "20vw",
                                    maxWidth: "20vw",
                                    whiteSpace: "nowrap",
                                    overflow: "hidden",
                                    textOverflow: "ellipsis",
                                    textAlign: "left",
                                }}
                            >
                                {lista.description}
                            </TableCell>

                            <TableCell sx={{ color: "white", textAlign: "center" }}>{lista.completed ? `Sim` : `Não`}</TableCell>

                            <TableCell sx={{ display: "flex" }}>
                                <ButtonContainer id={lista._id} colorS="primary" variant="contained" action="editOpen" children="Abrir" />
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>

            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[2, data.length]} // Opções de linhas por página
                component="div"
                count={data.length} // Total de linhas
                rowsPerPage={rowsPerPage} // Número de linhas por página atual
                page={page} // Página atual
                onPageChange={hangleChangePage} // Função para mudar a página
                onRowsPerPageChange={handleChangeRows} // Função para mudar o número de linhas por página
            />
            
        </S.DivTable>

    )
}

export default TableList
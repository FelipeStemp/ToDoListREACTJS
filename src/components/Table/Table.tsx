import { Alert, Button, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ApiModel } from "../../Interface/Model";
import ButtonContainer from "../button/ButtonCont";
import * as S from './styled';

interface dataProps {
    data: ApiModel[];
}

function TableList({ data }: dataProps) {
    const navigate = useNavigate();
    const [alertOpen, setAlertOpen] = useState(false);

    const HandleEdit = (id: string) => {
        navigate("/Editar", { state: { id } });
    }

    const HandleCriar =() => {
        navigate("/Editar")
    }

    const handleDeleteSuccess = (success: boolean) => {
        if (success) {
            setAlertOpen(true);
            setTimeout(() => {
                window.location.reload(); // Recarrega a página após fechar o alerta
            }, 1500);
        }
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
                        <TableCell sx={{textAlign: "center"}}><Button onClick={HandleCriar}>Criar</Button></TableCell>
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

                            <TableCell>

                                <Button
                                    sx=
                                    {{
                                        boxShadow: "1px 1px 1px #156AEB",
                                        color: "white",
                                        border: "solid 1px #156AEB",
                                        margin:"10px"
                                    }}
                                    size="small"
                                    
                                    variant='outlined'
                                    onClick={() => HandleEdit(lista._id)}
                                >
                                    Editar
                                </Button>

                                <ButtonContainer id_coleted={lista._id}/>

                                <ButtonContainer id_coleted={lista._id} />
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>

            </TableContainer>
            {alertOpen && <Alert severity='success'> Deletado com sucesso</Alert>}
        </S.DivTable>

    )
}

export default TableList
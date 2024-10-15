import AddIcon from '@mui/icons-material/Add';
import { Chip, Table, TableBody, TableCell, TableContainer, TableFooter, TableHead, TablePagination, TableRow } from "@mui/material";
import { useNavigate } from 'react-router-dom';
import { ApiModel } from "../../Interface/Model";
import ButtonContainer from "../button/ButtonCont";
import * as S from './styled';
import { useState } from 'react';
import CardList from '../Card/Card';

interface dataProps {
    data: ApiModel[];
}

function TableList({ data }: dataProps) {
    const [page, setPage] = useState<number>(0);
    const [rowsPerPage, setRowsPerPage] = useState<number>(5);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isModalOpenCriar, setIsModalOpenCriar] = useState(false);
    const [idSelected, setIdSelected] = useState<string | null>();

    const handleOpenModal = (id: string) => {
        setIdSelected(id)
        setIsModalOpen(true)
    };
    const handleCloseModal = () => {
        setIdSelected(null)
        setIsModalOpen(false);
    }
    const handleOpenModalCriar = () => setIsModalOpenCriar(true);
    const handleCloseModalCriar = () => setIsModalOpenCriar(false);


    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };
    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };
    const currentRows = data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
    const navigate = useNavigate();
    return (
        <S.DivTable>
            <TableContainer sx={{ maxWidth: "90vw", borderRadius: "3px" }}>
                <Table>
                    <TableHead >
                        <TableRow
                            sx={{
                                backgroundColor: "#2F333F",
                            }}>
                            <TableCell sx={{ color: "white", textAlign: "left" }}>Título</TableCell>
                            <TableCell sx={{ color: "white", textAlign: "left" }}>Descrição</TableCell>
                            <TableCell sx={{ color: "white", textAlign: "center" }}>Completo</TableCell>
                            <TableCell sx={{ display: "flex", justifyContent: "center" }}><AddIcon sx={{ color: "white" }} fontSize="large" onClick={handleOpenModalCriar} /></TableCell>
                        </TableRow>
                    </TableHead>

                    <CardList
                        ativo={true}
                        open={isModalOpenCriar}
                        handleClose={handleCloseModalCriar}
                    />

                    <TableBody>
                        {currentRows.map((lista) => (
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

                                <TableCell sx={{ color: "white", textAlign: "center" }}>
                                    <Chip
                                        label={lista.completed ? 'Concluído' : 'Pendente'}
                                        sx={{ color: "white", backgroundColor: lista.completed ? 'rgba(0, 255, 0, 0.1)' : 'rgba(175, 3, 0, 0.3)', border: lista.completed ? ' 2px solid #00FF00' : '2px solid #AF0300' }}
                                        variant={lista.completed ? 'outlined' : 'filled'}
                                        size="small"
                                    />
                                </TableCell>

                                <TableCell sx={{ display: "flex" }}>
                                    <ButtonContainer id={lista._id} colorS="primary" variant="contained" click={() => handleOpenModal(lista._id || "")} children="Abrir" />
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>

                </Table>
                <TablePagination sx={{ color: "White" }}
                    rowsPerPageOptions={[3, 5, 7]}
                    component="div"
                    count={data.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </TableContainer>

            {idSelected &&
                <CardList
                    id={idSelected}
                    ativo={false}
                    open={isModalOpen}
                    handleClose={handleCloseModal}
                />
            }
        </S.DivTable>
    )
}

export default TableList
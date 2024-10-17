import { useState } from "react";
import LoginModal from "../../components/Modal/Login/Login";
import * as S from './styled'
import Header from "../../components/HeaderDiv/header";
import ButtonContainer from "../../components/button/ButtonCont";
import { ButtonGroup } from "@mui/material";

function LoginPage() {
    const [openModalLogin, setOpenModalLogin] = useState(false)

    const handleOpen = () => { setOpenModalLogin(true) }
    const handleClose = () => { setOpenModalLogin(false) }
    return (
        <S.BodyLogin >
            <Header display="flex">
                <a>Sistema de ToDo list</a>
                <ButtonGroup sx={{ width: '200px' }}>
                    <ButtonContainer variant="contained">Login</ButtonContainer>
                    <ButtonContainer variant="outlined">Cadastro</ButtonContainer>
                </ButtonGroup>


            </Header>
            <LoginModal open={openModalLogin} handleClose={handleClose}></LoginModal>
        </S.BodyLogin>
    )
}

export default LoginPage
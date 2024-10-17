import { useState } from "react";
import LoginModal from "../../components/Modal/Login/Login";
import * as S  from './styled'

function LoginPage(){
    const [openModalLogin, setOpenModalLogin] = useState(false)

    const handleOpen = () => { setOpenModalLogin(true)}
    return(
        <S.BodyLogin>
            <button onClick={handleOpen}>OPEN MODAL</button>

            

            <LoginModal open={openModalLogin}></LoginModal>
        </S.BodyLogin>
    )
}

export default LoginPage
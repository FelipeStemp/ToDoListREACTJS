import { PropsAll } from '../../Interface/props';
import *  as S  from './styled'

interface props extends PropsAll {
    children?: React.ReactNode;
}

function Header({children} : props) {
    return(
        <S.HomeHeader>
            {children}
        </S.HomeHeader>
    )
}

export default Header
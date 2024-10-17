import { PropsAll } from '../../Interface/props';
import *  as S  from './styled'

export interface props extends PropsAll {
    children?: React.ReactNode;
}

function Header({children, justify} : props) {
    return(
        <S.HomeHeader justify={justify}>
            {children}
        </S.HomeHeader>
    )
}

export default Header
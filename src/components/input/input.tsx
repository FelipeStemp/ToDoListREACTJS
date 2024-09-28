import { PropsAll } from '../../Interface/props';
import * as S from './styled';

function InputAll({width, height, radius, color, backgroundColor, type} : PropsAll){
  return(
    <S.InputStyle
      width={width}
      height={height}
      color={color}
      radius={radius}
      backgroundColor={backgroundColor}
      type={type}
    />
  )
}

export default InputAll;


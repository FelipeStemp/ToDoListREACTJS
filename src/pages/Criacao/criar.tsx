import { useLocation } from "react-router-dom";
import CardList from "../../components/Card/Card";
import * as S from './styled';

function Criar() {
  const location = useLocation();
  const {ativo} = location.state;
  return (
    <S.CriarBody>
      <CardList data={{}} ativo={ativo}/>
    </S.CriarBody>
  )
}

export default Criar
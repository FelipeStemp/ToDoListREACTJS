import styled from "styled-components";
import { props } from "./header";

export const HomeHeader = styled.div<props>`
width: 100%;
height: 10vh;
position: absolute;
top: 0;
background-color: #00000078;
backdrop-filter: blur(1px);  
box-shadow: 0px 5px rgba(21, 106, 235, 0.1);
display: flex;
align-items: center;
padding-x: 10px;
justify-content: ${(props) => props.justify || 'space-between'};
@media(max-width: 720px){
    justify-content: left;
    padding-left: 20px;
}
`
import styled from "styled-components";

export const HomeBody = styled.div`
display: flex;
width: 100vw;
height: 100vh;
justify-content: center;
align-items:center;
background-color: #2F333F;
`

export const HomeHeader = styled.div`
width: 100vw;
height: 10vh;
position: absolute;
top: 0;
background-color: #00000078;
backdrop-filter: blur(1px);  
box-shadow: 0px 5px rgba(21, 106, 235, 0.1);
display: flex;
align-items: center;
padding-x: 10px;
justify-content: center;
`

export const HomeConteudo = styled.div`
width: 95vw;
height: 80vh;
background-color: #00000078;
margin-top: 5%;
padding: .5vw;
box-shadow: 5px 5px rgba(21, 106, 235, 0.2);
border: solid 1px rgba(21, 106, 235, 0.5);
border-radius: .5rem;
display: flex;
justify-content: space-around;
`

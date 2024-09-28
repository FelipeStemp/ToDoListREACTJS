import styled from "styled-components";
import { PropsAll } from "../../Interface/props";

export const InputStyle = styled.input<PropsAll>`
width: ${(props) => props.width};
height: ${(props) => props.height};
color: ${(props) => props.color};
border-radius: ${(props) => props.radius};
background-color: ${(props) => props.backgroundColor};
`
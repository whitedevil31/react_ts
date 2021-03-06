import { create } from "domain";
import styled, { createGlobalStyle } from "styled-components";
import BG from "./images/bg.jpg";

export const GlobalStyle = createGlobalStyle`
html{height:100%}
body{background-image:url(${BG});background-size:cover;margin:0;padding:0 0px;display:flex;justify-content:center;min-width:100%}
*{box-size:border-box}
`;

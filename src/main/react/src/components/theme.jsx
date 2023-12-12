import * as styledComponents from "styled-components";
// import { ThemedStyledComponentsModule } from "styled-components";

const color = {
  correct: "#5babab",
  present: "#fdb800",
  absent: "#908790",
};

export const light = {
  background1: "#fefefe",
  background2: "#fefefe", // 다이얼로그
  text: "#202124",
  keyBg1: "#e3e1e3",
  KeyBg2: "#cfcbcf",
  boardBg: "white",
  boardBorder1: "#cfcbcf",
  boardBorder2: "#202124", // 활성화시
  button1: "#e3e1e3",
  button2: "908790",
  color: { ...color },
};

export const dark = {
  background1: "#202124",
  background2: "#38393e", // 다이얼로그
  text: "#fefefe",
  keyBg1: "#403c40",
  KeyBg2: "#766c76",
  boardBg: "#131213",
  boardBorder1: "#766c76",
  boardBorder2: "#e3e1e3", // 활성화시
  button1: "#5c565c",
  button2: "#908790",
  color: { ...color },
};

export const Theme = light;
export const { default: styled, createGlobalStyle } = styledComponents;

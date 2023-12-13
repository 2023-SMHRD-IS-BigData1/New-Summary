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
  boardBorder2: "#cecece", // 활성화시
  button1: "#f0f0f0",
  button2: "#908790",
  header:"rgba(255,255,255,0.5)",
  disableback:"#999999",
  modalbackground: "#14141499",
  backgroundmain: "#F0E6DD",
  backgrounfix1: "#2A9D8F",
  backgrounfix2: "#F4A261",
  backgrounfix3: "#F0BE4D",
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
  boardBorder2: "#5f5f5f", // 활성화시
  button1: "#5c565c",
  button2: "#908790",
  header:"#20212486",
  disableback:"#555555",
  modalbackground: "#ffffffa6",
  backgroundmain: "#38393e",
  backgrounfix1: "#ffffff00",
  backgrounfix2: "#ffffff00",
  backgrounfix3: "#202124",
  color: { ...color },
};

export const Theme = light;
export const { default: styled, createGlobalStyle } = styledComponents;

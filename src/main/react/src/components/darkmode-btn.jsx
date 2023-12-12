import React, { useContext } from 'react';
import styled from 'styled-components';
import { ThemeContext } from '../data/themeProvider';

function ThemeToggle() {
  const { theme, onChangeTheme } = useContext(ThemeContext);
  return (
    <ToggleWrapper onClick={onChangeTheme}>
      {theme === 'light' ? '🌝' : '🌚'}
    </ToggleWrapper>
  );
}

export default ThemeToggle;

const ToggleWrapper = styled.button`
  position: fixed;
  z-index: 999999;
  bottom: 5%;
  right: 6%;

  /* background-color: ${props => props.theme.bgColor}; */
  /* border: ${props => props.theme.borderColor}; */
  font-size: 20px;

  display: flex;
  justify-content: center;
  align-items: center;
  width: 48px;
  height: 48px;
  border-radius: 30px;
  /* box-shadow: ${
    props => props.mode === 'dark' ? '0px 5px 10px rgba(40, 40, 40, 1), 0px 2px 4px rgba(40, 40, 40, 1)'
    : '0 5px 10px rgba(100, 100, 100, 0.15), 0 2px 4px rgba(100, 100, 100, 0.15)'
  } */
`;
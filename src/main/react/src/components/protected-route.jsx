import React from 'react';
import {  Navigate } from 'react-router-dom';


export default function ProtectedRoute({ children }){
  const userDataString = sessionStorage.getItem('userData');

  if (!userDataString) {
    alert("로그인이 필요합니다!")
    // 로그인 페이지로 리디렉션 (replace 속성 사용)
    return <Navigate to="/login"/>
  }
  return children
}

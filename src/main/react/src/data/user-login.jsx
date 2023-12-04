import { createContext, useContext, useEffect, useState } from 'react';

// 새로운 컨텍스트 생성
const AuthContext = createContext();

// 컨텍스트의 Provider와 useContext를 내보내줌
export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState(null);

  // 세션 스토리지에서 유저 정보 가져오기
  useEffect(() => {
    const storedUserData = sessionStorage.getItem('userData');
    if (storedUserData) {
      setUserData(JSON.parse(storedUserData));
      setIsLoggedIn(true);
    }
  }, []);

  // 로그인 함수
  const login = (userData) => {
    setUserData(userData);
    setIsLoggedIn(true);
    sessionStorage.setItem('userData', JSON.stringify(userData));
  };

  // 로그아웃 함수
  const logout = () => {
    setUserData(null);
    setIsLoggedIn(false);
    sessionStorage.removeItem('userData');
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn, userData, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// 커스텀 훅으로 useContext 사용을 쉽게 함
export const useAuth = () => {
  return useContext(AuthContext);
};

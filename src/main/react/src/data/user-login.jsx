import { createContext, useContext, useState } from 'react';

// 새로운 컨텍스트 생성
const AuthContext = createContext();

// 컨텍스트의 Provider와 useContext를 내보내줌
export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
      {children}
    </AuthContext.Provider>
  );
};

// 커스텀 훅으로 useContext 사용을 쉽게 함
export const useAuth = () => {
  return useContext(AuthContext);
};

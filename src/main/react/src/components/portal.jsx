import reactDom from "react-dom";

const ModalPortal = ({ children }) => {
  const el = document.getElementById("modal");
  return reactDom.createPortal(children, el);
};

export default ModalPortal;

// modal div를 가져와 
// children으로 넣어주는, Portal역할을 할 Portal.js를 만들어준다.
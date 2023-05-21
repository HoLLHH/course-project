import React from "react";
import "../../css/modal.css";

function Modal({ isVisible = false, title, content, onClose }) {
  React.useEffect(() => {
    // 监听事件
    document.addEventListener("keydown", keydownHandler);
    // 取消监听
    return () => document.removeEventListener("keydown", keydownHandler);
  });

  function keydownHandler({ key }) {
    // esc 键，关闭模态框
    switch (key) {
      case "Escape":
        onClose();
        break;
      default:
    }
  }
  // 控制模态框显示
  return !isVisible ? null : (
    <div className="modal">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h3 className="modal-title">{title}</h3>
            <span className="modal-close" onClick={onClose}>&times;</span>
          </div>
          <div className="modal-body">
            <div>{content}</div>
          </div>
          
        </div>
      </div>
    </div>
  );
}

export default Modal;
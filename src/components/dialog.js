import React from "react";
const DialogComponent = ({ dialogMsg, dialogClass, renderDialog, onConfirm }) => {

  const handleCloseDialog = () => {
    renderDialog(null);
  };

  // if (dialogClass === "loading") {
  //   setTimeout(() => {
  //     renderDialog(null);
  //   }, 1000);
  // };
  
  return (
    <div className={`dialog-wrap ${dialogClass}`}>
      <div className="dialog">
        <div className="dialog-msg">{dialogMsg}</div>
        {dialogClass === "open" && 
        <div className="dialog-confirm">
          <button onClick={handleCloseDialog}>확인</button>
        </div>
        }
        {dialogClass === "confirm" && 
        <div className="dialog-confirm">
          <button onClick={() => onConfirm("confirmed")}>확인</button>
          <button onClick={handleCloseDialog}>취소</button>
        </div>
        }
      </div>
    </div>
  );
};

export default DialogComponent;

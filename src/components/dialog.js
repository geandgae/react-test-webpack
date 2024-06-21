import React from "react";
const DialogComponent = ({ dialogMsg, dialogClass, renderDialog }) => {

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
      </div>
    </div>
  );
};

export default DialogComponent;

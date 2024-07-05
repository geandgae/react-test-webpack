import React from "react";
// store
import { useAppState, useAppDispatch } from "../store/Store"; 

const DialogComponent = () => {
  // store
  const { dialog } = useAppState();
  const { setDialog, setConfirmed } = useAppDispatch(); 

  const handleCloseDialog = () => {
    setDialog({ id: null, message: "", class: "" });
  };

  const onConfirm = (v) => {
    setConfirmed(v);
    handleCloseDialog();
  };

  return (
    <div className={`dialog-wrap ${dialog.class}`}>
      <div className="dialog">
        <div className="dialog-msg">{dialog.message}</div>
        {dialog.class === "open" && 
        <div className="dialog-confirm">
          <button onClick={handleCloseDialog}>확인</button>
        </div>
        }
        {dialog.class === "confirm" && 
        <div className="dialog-confirm">
          <button onClick={() => onConfirm(dialog.class)}>확인</button>
          <button onClick={handleCloseDialog}>취소</button>
        </div>
        }
      </div>
    </div>
  );
};

export default DialogComponent;

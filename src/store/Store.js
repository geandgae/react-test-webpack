import React, { createContext, useReducer, useContext, useEffect } from "react";

// Context 생성
const AppStateContext = createContext();
const AppDispatchContext = createContext();

// 초기 상태 정의
const initialState = {
  isProfileSaved: false,
  currentPage: "intro",
  trophy: 1,
};

// 액션 타입 정의
const actionTypes = {
  SET_IS_PROFILE_SAVED: "SET_IS_PROFILE_SAVED",
  SET_CURRENT_PAGE: 'SET_CURRENT_PAGE',
  SET_TROPHY: 'SET_TROPHY',
};

// 리듀서 함수 정의
const reducer = (state, action) => {
  switch (action.type) {
    case actionTypes.SET_PROFILE:
      return { ...state, profile: action.payload };
    case actionTypes.SET_STAGE:
      return { ...state, stage: action.payload, trophy: action.payload }; // stage 업데이트 시 trophy도 함께 업데이트
    case actionTypes.SET_ENVIRONMENTS:
      return { ...state, environments: action.payload };
    case actionTypes.SET_IS_PROFILE_SAVED:
      return { ...state, isProfileSaved: action.payload };  
    case actionTypes.SET_CURRENT_PAGE:
      return { ...state, currentPage: action.payload };  
    case actionTypes.SET_TROPHY:
      return { ...state, trophy: action.payload };
    default:
      return state;
  }
};


// Context Provider 컴포넌트 생성
const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    // // storedProfile
    // const storedProfile = JSON.parse(localStorage.getItem("user"));
    // if (storedProfile) {
    //   dispatch({ type: actionTypes.SET_PROFILE, payload: storedProfile });
    //   dispatch({ type: actionTypes.SET_IS_PROFILE_SAVED, payload: true });
    // }

    // // savedStage
    // const savedStage = localStorage.getItem("stage");
    // if (savedStage) {
    //   dispatch({ type: actionTypes.SET_STAGE, payload: parseInt(savedStage, 10) });
    // }

    // // storedEnvironments
    // const storedEnvironments = JSON.parse(localStorage.getItem("stageEnvironments"));
    // if (storedEnvironments) {
    //   dispatch({ type: actionTypes.SET_ENVIRONMENTS, payload: storedEnvironments });
    // }

    // savedIsProfileSaved
    const savedIsProfileSaved = localStorage.getItem("isProfileSaved");
    if (savedIsProfileSaved) {
      dispatch({ type: actionTypes.SET_IS_PROFILE_SAVED, payload: JSON.parse(savedIsProfileSaved) });
    }

    // savedCurrentPage
    const savedCurrentPage = localStorage.getItem("currentPage");
    if (savedCurrentPage) {
      dispatch({ type: actionTypes.SET_CURRENT_PAGE, payload: savedCurrentPage });
    }

    // savedTrophy
    const savedTrophy = localStorage.getItem("trophy");
    if (savedTrophy) {
      dispatch({ type: actionTypes.SET_TROPHY, payload: parseInt(savedTrophy, 10) });
    }
  }, []);

  // 모든 상태 업데이트 시 로컬 스토리지에 저장
  useEffect(() => {
    // localStorage.setItem("user", JSON.stringify(state.profile));
    // localStorage.setItem("stage", state.stage);
    // localStorage.setItem("stageEnvironments", JSON.stringify(state.environments));
    localStorage.setItem("isProfileSaved", state.isProfileSaved);
    localStorage.setItem("currentPage", state.currentPage);
    localStorage.setItem("trophy", state.trophy);
  }, [state]);

  const setCurrentPage = (page) => {
    dispatch({ type: actionTypes.SET_CURRENT_PAGE, payload: page });
  };

  return (
    <AppStateContext.Provider value={state}>
      <AppDispatchContext.Provider value={{dispatch, setCurrentPage}}>{children}</AppDispatchContext.Provider>
    </AppStateContext.Provider>
  );
};

// 커스텀 훅 생성
const useAppState = () => {
  const context = useContext(AppStateContext);
  if (context === undefined) {
    throw new Error("useAppState must be used within a AppProvider");
  }
  return context;
};

const useAppDispatch = () => {
  const context = useContext(AppDispatchContext);
  if (context === undefined) {
    throw new Error("useAppDispatch must be used within a AppProvider");
  }
  return context;
};

export { AppProvider, useAppState, useAppDispatch, actionTypes };

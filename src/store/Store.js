import React, { createContext, useReducer, useContext, useEffect } from "react";

// Context 생성
const AppStateContext = createContext();
const AppDispatchContext = createContext();

// 초기 상태 정의
const initialState = {
  // env set
  profile: {
    name: "test",
    head: "bald",
    eyes: "smallEyes",
    face: "round",
    job: "none",
    skill: "swordsmanship",
    str: 1,
    vit: 10,
    inv: 5,
  },
  stage: 1,
  environments: [],
  isProfileSaved: false,
  currentPage: "intro",
  trophy: 1,
  // dialog
  dialog: {
    id: null,
    message: "",
    class: "",
  },
  confirmed: false,
  // gamestage
  looting: false,
  gameResult: null,
  bless: 0,
  // reserved word
  rword: {
    equip: "장비",
    clear: "해제",
    hp: "체력",
    heal: "회복",
    reward: "보상",
    item: "아이템",
    dice: "주사위",
    env0: "!!환경0",
    env1: "!!환경1",
    env2: "!!환경2",
    env3: "!!환경3",
    env4: "!!환경4",
    env5: "!!환경5",
    env6: "!!환경6",
  },
};

// 액션 타입 정의
const actionTypes = {
  SET_PROFILE: "SET_PROFILE",
  SET_STAGE: "SET_STAGE",
  SET_ENVIRONMENTS: "SET_ENVIRONMENTS",
  SET_IS_PROFILE_SAVED: "SET_IS_PROFILE_SAVED",
  SET_CURRENT_PAGE: "SET_CURRENT_PAGE",
  SET_TROPHY: "SET_TROPHY",
  SET_DIALOG: "SET_DIALOG",
  SET_CONFIRMED: "SET_CONFIRMED",
  SET_LOOTING: "SET_LOOTING",
  SET_RESULT: "SET_RESULT",
  SET_BLESS: "SET_BLESS",
  INCREMENT_BLESS: "INCREMENT_BLESS",
  DECREMENT_BLESS: "DECREMENT_BLESS",
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
    case actionTypes.SET_DIALOG:
      return { ...state, dialog: action.payload };
    case actionTypes.SET_CONFIRMED:
      return { ...state, confirmed: action.payload };
    case actionTypes.SET_LOOTING:
      return { ...state, looting: action.payload };
    case actionTypes.SET_RESULT:
      return { ...state, gameResult: action.payload };
    case actionTypes.SET_BLESS:
      return { ...state, bless: action.payload };
    case actionTypes.INCREMENT_BLESS:
      return { ...state, bless: state.bless + action.payload };
    case actionTypes.DECREMENT_BLESS:
      return { ...state, bless: state.bless - action.payload };
    default:
      return state;
  }
};

// Context Provider 컴포넌트 생성
const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    // 로컬 스토리지에서 데이터 불러오기

    // storedProfile
    const storedProfile = JSON.parse(localStorage.getItem("user"));
    if (storedProfile) {
      dispatch({ type: actionTypes.SET_PROFILE, payload: storedProfile });
      dispatch({ type: actionTypes.SET_IS_PROFILE_SAVED, payload: true });
    }

    // savedStage
    const savedStage = localStorage.getItem("stage");
    if (savedStage) {
      dispatch({ type: actionTypes.SET_STAGE, payload: parseInt(savedStage, 10) });
    }

    // storedEnvironments
    const storedEnvironments = JSON.parse(localStorage.getItem("stageEnvironments"));
    if (storedEnvironments) {
      dispatch({ type: actionTypes.SET_ENVIRONMENTS, payload: storedEnvironments });
    }

    // savedIsProfileSaved
    const savedIsProfileSaved = localStorage.getItem("isProfileSaved");
    if (savedIsProfileSaved) {
      dispatch({ type: actionTypes.SET_IS_PROFILE_SAVED, payload: JSON.parse(savedIsProfileSaved) });
    }

    // savedTrophy
    const savedTrophy = localStorage.getItem("trophy");
    if (savedTrophy) {
      dispatch({ type: actionTypes.SET_TROPHY, payload: parseInt(savedTrophy, 10) });
    }

    // savedLooting
    const savedLooting = localStorage.getItem("looting");
    if (savedLooting) {
      dispatch({ type: actionTypes.SET_LOOTING, payload: JSON.parse(savedLooting) });
    }

    // savedGameResult
    const savedGameResult = localStorage.getItem("gameResult");
    if (savedGameResult) {
      dispatch({ type: actionTypes.SET_RESULT, payload: JSON.parse(savedGameResult) });
    }

    // savedBless
    const savedBless = localStorage.getItem("bless");
    if (savedBless) {
      dispatch({ type: actionTypes.SET_BLESS, payload: JSON.parse(savedBless) });
    }
  }, []);

  // 모든 상태 업데이트 시 로컬 스토리지에 저장
  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(state.profile));
    localStorage.setItem("stage", state.stage);
    localStorage.setItem("stageEnvironments", JSON.stringify(state.environments));
    localStorage.setItem("isProfileSaved", state.isProfileSaved);
    // localStorage.setItem("trophy", state.trophy);
    localStorage.setItem("looting", JSON.stringify(state.looting));
    localStorage.setItem("gameResult", JSON.stringify(state.gameResult));
    localStorage.setItem("bless", JSON.stringify(state.bless));
  }, [state]);

  // renderDialog
  const renderDialog = (state, message) => {
    if (state === "open") {
      setDialog({
        id: Date.now(),
        message: message,
        class: "open",
      });
    } else if (state === "confirm") {
      setDialog({
        id: Date.now(),
        message: message,
        class: "confirm",
      });
    } else if (state === "loading") {
      setDialog({
        id: Date.now(),
        message: message,
        class: "loading",
      });
    } else if (state === null) {
      setDialog({
        id: null,
        message: "",
        class: "",
      });
    }
  };
  // setCurrentPage
  const setCurrentPage = (v) => {
    dispatch({ type: actionTypes.SET_CURRENT_PAGE, payload: v });
  };
  // setDialog
  const setDialog = (v) => {
    dispatch({ type: actionTypes.SET_DIALOG, payload: v });
  };
  // setconfirmed
  const setConfirmed = (v) => {
    dispatch({ type: actionTypes.SET_CONFIRMED, payload: v });
  };
  // setLooting
  const setLooting = (v) => {
    dispatch({ type: actionTypes.SET_LOOTING, payload: v });
  }
  // setGameResult
  const setGameResult = (v) => {
    dispatch({ type: actionTypes.SET_RESULT, payload: v });
  };
  // setBless
  const setBless = (v) => {
    // dispatch({ type: actionTypes.SET_BLESS, payload: v });
    if (v > 0) {
      dispatch({ type: actionTypes.INCREMENT_BLESS, payload: v });
    } else {
      dispatch({ type: actionTypes.DECREMENT_BLESS, payload: Math.abs(v) });
    }
  };

  return (
    <AppStateContext.Provider value={state}>
      <AppDispatchContext.Provider value={{ initialState, dispatch, setCurrentPage, setDialog, renderDialog, setConfirmed, setLooting, setGameResult, setBless }}>{children}</AppDispatchContext.Provider>
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

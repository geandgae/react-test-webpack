* rolldice

my-react-app/
│
├── public/
│   └── index.html
│
├── src/
│   ├── assets/
│   │   └── scss/
│   │       └── default.scss
│   ├── components/
│   │   ├── Login.js
│   │   ├── Signup.js
│   │   └── ForgotPassword.js
│   ├── App.js
│   └── index.js
│
├── .babelrc
├── package.json
└── webpack.config.js

* 시작시 로그인 변경 - 로컬에 사용자 정보 있나 없나로 판단 있을경우 기존 save / 없을경우 생성
* 사용자는 최종 목적지에 도달
* 방해자는 사용자의 행동을 방해
* 턴으로 진행

* intro > main > load(ViewProfile) > stage
* intro / main 은 app (사용자 정보);
* stage 는 dice / inven (진행정보)

* 방해요소 이벤트(lose)
* 보상설정(굴림설정/확률값)

* result(턴리셋) 개선 > dice에서 결과 연산후 stage에서 호출

* max-hp 설정 필요

* stage 패턴 설정(환경에 따른 이벤트)
* 특정스테이지 보상 강화 / 능력강화 / 보스전

* 다이얼로그 콜백 또는 보상스테이지 변경(next 이벤트 변경) / 전투결과창 따로 / 아이템 획득창 따로
* 보스전은 게이지 100% 일때? / 케릭생성 / 메뉴 인트로 변경

* html 태그정리

* 영구적인 버프 / 디버프(find 조건)
* 장비 슬롯 추가

* 수치표시 세분화
* enemyStep 삭제 / 환경변수에 따른 랜덤 수치 적용

* 자주쓰는 용어 함수처리


<!-- 스토어 구성 예 폴더 -->
src/
│
├── components/          # 재사용 가능한 프레젠테이셔널 컴포넌트
│   ├── CreateProfile.js
│   ├── ViewProfile.js            
│
├── context/             # Context 및 Reducer 관련 파일
│   ├── AppStateContext.js   # 상태를 제공하는 Context 컴포넌트
│   ├── AppReducer.js        # 상태 변경을 관리하는 Reducer
│   └── initialState.js      # 초기 상태 정의
│
├── hooks/               # 커스텀 훅
│   └── useLocalStorage.js   # localStorage 사용을 추상화한 커스텀 훅
│
├── pages/               # 페이지 단위 컴포넌트
│   ├── HomePage.js
│   ├── LoadPage.js
│   ├── NewProfilePage.js
│   ├── IntroPage.js
│   ├── GameOverPage.js
│   └── TestPage.js
│
├── utils/               # 유틸리티 함수
│   └── generateEnvironments.js
│
├── App.js               # 최상위 App 컴포넌트
├── index.js             # 엔트리 포인트



* 스토어 구성 useReducer / Context API 
<!-- * 스토어 구성 react-redux / @reduxjs/toolkit -->

<!-- 데이터 연결 부분  -->
const fetchData = async () => {
  try {
    const response = await fetch("https://api.example.com/data");
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    console.log("Fetched data:", data);
  } catch (error) {
    console.error("Failed to fetch data:", error);
  }
};


my-react-app/
├── src/
    ├── store/
    │   ├── Store.js
    ├── components/
    │   ├── CreateProfile.js
    │   ├── Dialog.js
    │   ├── Dice.js
    │   ├── GameStage.js
    │   ├── Inventory.js
    │   └── ViewProfile.js
    ├── App.js
    └── index.js

stroe 변환
* isProfileSaved 변환
* trophy 변환
* currentPage 변환
* environments 변환
* stage 변환
* profile 변환
* dialog 변환
* Confirmed 변환
* looting 변환
* gameResult 변환

floor / 8
0 : -4
1 : -4
2 : -3
3 : -3
4 : -2
5 : -2
6 : -1

trunc / 7
0 : -3
1 : -3
2 : -2
3 : -2
4 : -1
5 : -1
6 : 0

trunc / 8
0 : -4
1 : -3
2 : -3
3 : -2
4 : -2
5 : -1
6 : -1




00


floor / 7 / 결정
0 : -4
1 : -3
2 : -3
3 : -2
4 : -2
5 : -1
6 : -1
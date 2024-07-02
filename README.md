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

* 스토어 적용 안함
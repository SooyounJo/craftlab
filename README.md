# Craft1030

Yarn · Next.js (Pages Router) · React (JavaScript) 웹 프로젝트입니다.

## 시작하기

```bash
yarn install
yarn dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000) 을 엽니다.

## 디렉터리 구조

```
craft1030/
├── components/       # 재사용 React 컴포넌트
├── pages/            # Next.js Pages Router (라우팅)
│   ├── api/          # API Routes
│   ├── _app.js       # 앱 래퍼
│   ├── _document.js  # HTML 문서
│   └── index.js      # 홈 (/)
├── public/           # 정적 파일
├── styles/           # CSS (글로벌 + CSS Modules)
├── next.config.js
├── jsconfig.json     # @/* 경로 별칭
└── package.json
```

## 스크립트

| 명령 | 설명 |
|------|------|
| `yarn dev` | 개발 서버 |
| `yarn build` | 프로덕션 빌드 |
| `yarn start` | 프로덕션 서버 |
| `yarn lint` | ESLint |

# 🌐 Pocker Prompt Frontend

포켓 프롬프트 웹버전

## ⚙️ 환경 설정

### ➀ .env 서브모듈로 관리

해당 레포지토리는 서브모듈로 환경 변수를 관리하고 있다 [pocket-prompt-frontend-envs](https://github.com/ai-surfers/pocket-prompt-frontend-envs/tree/da5bd9dc2ef2651be0a47ab7dabccba57d937ea3)

> 🔥 주의 <br/>
> 처음 서브모듈을 받을 때는 `git submodule update --init --recursive` 명령어를 수행해 주어야 한다

> ✔️ env 수정 방법
>
> 1. 해당 레포지토리에서 파일 수정
> 2. `git submodule update --remote` 명령어로 서브모듈 최신화
> 3. 최신화 내용 커밋

### ② 실행 가이드

1. `yarn install`
2. `yarn dev` 혹은 `yarn prod`

<br/>

## 🗒️ 작업 방식

-   [Git Flow](https://velog.io/@nias0327/Git-Flow%EC%9D%98-%EA%B0%9C%EB%85%90%EA%B3%BC-%EC%A0%81%EC%9A%A9) 사용하여 main, develop, 이외 작업브랜치 (feature/, fix/...) 사용
-   작업 시작 시, `develop`에서 브랜치 따서 작업
-   작업 완료 후, `작업 브랜치` -> `develop` PR
-   운영 배포 시, `develop` -> `main` PR

## 🌳 배포

### **Production 배포**

-   AWS S3 + CloudFront 사용
-   **트리거 - `main`** 브랜치 merge 시
-   [https://pocket-prompt.com/](https://pocket-prompt.com/)

### **Develop 배포**

-   Cloudflare Pages 사용
-   **트리거 -** `develop` 브랜치 merge 시
-   [https://pocket-prompt-frontend.pages.dev/](https://pocket-prompt-frontend.pages.dev/)

### **Preview 배포**

-   Cloudflare Pages 사용
-   **트리거 -** Pull Request open 시
-   각 PR Comment 확인 [예시](https://github.com/ai-surfers/pocket-prompt-frontend/pull/11)

# 🌐 Pocker Prompt Frontend

포켓 프롬프트 웹버전

## 환경 설정

### 1️⃣ .env 서브모듈로 관리

해당 레포지토리는 서브모듈로 환경 변수를 관리하고 있다 [pocket-prompt-frontend-envs](https://github.com/ai-surfers/pocket-prompt-frontend-envs/tree/da5bd9dc2ef2651be0a47ab7dabccba57d937ea3)

> 🔥 주의 <br/>
> 처음 서브모듈을 받을 때는 `git submodule update --init --recursive` 명령어를 수행해 주어야 한다

> ✔️ 수정 방법
>
> 1. 해당 레포지토리에서 파일 수정
> 2. `git submodule update --remote` 명령어로 서브모듈 최신화
> 3. 최신화 내용 커밋

### 2️⃣ 실행 가이드

1. `yarn install`
2. `yarn dev` 혹은 `yarn prod`

<br/>

## 배포

> 🔥 주의 <br/>현재는 프로덕션 배포룰만 세팅된 상태입니다

-   **Production 배포**

    -   AWS S3 + CloudFront 사용
    -   **트리거 - `main`** 브랜치 merge 시

-   **Preview 배포** ~~작업중~~
    -   Github Pages
    -   **트리거 -** Pull Request open 시

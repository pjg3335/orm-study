# [Hello World](https://www.prisma.io/docs/getting-started/setup-prisma/start-from-scratch-typescript-postgres/)

## 환경설정

```bash
npm i -y
npm install prisma typescript ts-node @types/node --save-dev
npm install @prisma/client
```

## 기본파일

`.env`: 데이터베이스 정보적는곳
`prisma/*.prisma`: db테이블 정보

## 최초 마이그레이션 하기

```bash
# 최초 생성시
npx prisma generate

# 마이그레이션 하기 (prisma/migrations/* 생김)
npx prisma migrate dev --name init # init는 폴더에 붙는 이름임
```

## 실행

```bash
npx ts-node index.ts
```

`.prisma`파일은 실제 동작시 안쓰는듯(지워도 돌아감). `PrismaClient`가 db에 schema정보 요청해서 내부적으로 `interface`만드는 방식으로 동작하는듯. [참고](https://www.prisma.io/docs/concepts/overview/what-is-prisma/data-modeling)

<br />

# [마이그레이션](https://www.prisma.io/docs/guides/database/developing-with-prisma-migrate/customizing-migrations)

## 기본

기본 방법 보다 바로밑에 나오는 '편집 가능한 마이그레이션 파일 만들기'방법을 주로 쓸 듯함 (쿼리 원하는대로 만들어졌는지 등 확인용으로)

```bash
# 최초 생성
npx prisma generate
# 마이그레이션 하기
npx prisma migrate dev --name init
```

`--name`빼면 파일명 뭘로할지 물어봄

## 편집 가능한 마이그레이션 파일 만들기

완전한 의미의 수동생성은 아니고 결과는 같은데 과정이 다른것(예를들어 `DROP`후 `CREATE`를 `RENAME COLUMN`으로 하는등)을 작업할때 사용하는 듯함. (index추가, column추가 능 모든 작업은 `.prisma`파일로 해야하고 임의로 model에 없는 index작업을 하거나 하면 충돌 후 수정된다.)

```bash
# .prisma파일 수정

npx prisma migrate dev --create-only

# .sql파일 확인하여 수정

npx prisma migrate dev # 이거하면 migration파일 생성과 db갱신 동시에 한다.
```

## 로컬/개발/운영 구분방법

(운영의 경우 따로 배포하는 방법있는듯함 나중에 찾아보기)

<br/>

**모듈 설치**

```bash
sudo npm install -g dotenv-cli
npm i dotenv -D
```

**package.json 수정**

```json
"scripts": {
  "migrate:local": "dotenv -e .env -- npx prisma migrate dev",
  "migrate:dev": "dotenv -e .env.development -- npx prisma migrate dev",
  ...
}
```

**[.env.development파일 생성](https://www.prisma.io/docs/concepts/more/environment-variables/using-multiple-env-files)**

```bash
DATABASE_URL="postgresql://${userName}:${password}@${ip}:${port}/${dbName}?schema=${schemaName}"
```

password등에 특수문자 url encode할 것 ([링크](https://meyerweb.com/eric/tools/dencoder/)에서 ㄱ)

**마이그레이션 하기**

```bash
npm run migrate:dev
```

(`npx prisma migrate dev`명령어는 .prisma파일을 보는것 + db에 적용하는거 합친기능인듯, 이래저래 꼬이기 싫으면 local에서만 migration해야할듯)

<br />

# 참고용

[타입](https://www.prisma.io/docs/concepts/components/prisma-schema/data-model/#native-types-mapping)

# Hello World

## 환경설정

```bash
npm i -y
npm install prisma typescript ts-node @types/node --save-dev
npm install @prisma/client
```

## 기본파일

`.env`: 데이터베이스 정보적는곳
`prisma/*.prisma`: db테이블 정보

## 마이그레이션 하기

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

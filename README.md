# SportsIcon NFT issuance API

This projects is a fork of the Unibar Prototype for hedera21 hackathon.

It has a capability for NFT token issuance and account managements.

##

## Postman Documentation

Use the link below to get access to Postman.

https://www.getpostman.com/collections/e83d73c05489c8ea7242

---

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.ts`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.js`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

## Prisma 

We use prisma as the persistence layer for the NextJS app. Going forward it is we may slowly remove our dependency on storage.
 

For development update your **datasource** in `prisma/schema.prisma` to sqlite below 👇

```
//datasource db {
//  provider = "postgresql"
//  url      = env("DATABASE_URL")
//}

datasource db {
  provider = "sqlite"
  url      = "file:./dev.db"
}
```

### Generate Prisma Models

Run the generate command to generate the persistence models, note if you reinstall with `yarn` or `npm i` you may have to rerun this command.

```
yarn prisma:generate
```

### Start the Prisma Studio

This will give you a yummy UI to view the models and to update accordingly.

It will run on ``localhost:5555``

```
yarn prisma:studio
```

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/import?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

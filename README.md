# Modal

A task management API written in Express and TypeScript.

## Run locally

Copy `.env.example` to `.env`

```bash
cp .env.example .env
```

Fill `BETTER_AUTH_SECRET=` with a base64 secret. You can generate one by running:

```bash
openssl rand -base64 32
```

For local development, you can leave `BETTER_AUTH_URL` as is.

```env
BETTER_AUTH_URL=http://localhost:5000
BETTER_AUTH_SECRET="MYSUPERTOPSECRETSECRET"
```

Install the dependencies, create the local database, then run the server

```bash
pnpm install
pnpm db:push # Pushes any schema changes to your local database
pnpm run dev
```

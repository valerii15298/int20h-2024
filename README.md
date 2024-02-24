# int20h-2024 [Click](https://hackathon-int20h-2024.fly.dev/) to see Deployed App at https://hackathon-int20h-2024.fly.dev/

## Pre-setup

Clone the app and create .env file:

```bash
git clone https://github.com/valerii15298/int20h-2024.git
cd int20h-2024
cp .env.example .env
```

Register at [ClerkJS](https://clerk.com) and create app
Register at [Neon](https://neon.tech/) and create Postgres database
Register at [Cloudinary](https://cloudinary.com/)

Update environment variables in `.env` file from those provided by _Clerk_, _Neon_ and _Cloudinary_ providers

After that you have two options: either run with docker compose(the simplest one) or run locally

## Run via docker-compose

(migrations will be applied automatically based on your .env file)

```bash
docker compose up --build
```

## Local development setup

Install [pnpm](https://pnpm.io/installation)

Install dependencies:

```bash
pnpm install
```

Push db migrations:

```bash
pnpm db:push
```

Run the app locally:

```bash
pnpm dev
```

# int20h-2024

## Pre-setup

Clone the app and create .env file:

```bash
git clone https://github.com/valerii15298/int20h-2024.git
cd int20h-2024
cp .env.example .env
```

Register at [ClerkJS](https://clerk.com) and create app
Register at [Neon](https://neon.tech/) and create Postgres database

Update environment variables in `.env` file from those provided by _Clerk_ and _Neon_ providers

After that you have two option either run with docker(the simplest one) or run locally

### Run using docker

```bash
docker compose up --build
```

### Local development setup

Install [pnpm](https://pnpm.io/installation)
Run

```bash
pnpm install && pnpm dev
```

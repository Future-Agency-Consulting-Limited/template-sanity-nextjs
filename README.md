# INSERT PROJECT NAME

## Overview

Website & CMS Backend built using [Next.js](https://nextjs.org) & [Sanity](https://sanity.io).

## Tech Stack

### Backend

- [Sanity](https://sanity.io) – Headless CMS

### Frontend

- [React](https://reactjs.org) – Library for building user interfaces from components
- [Next.js](https://nextjs.org) – Framework for server and client rendered React apps and APIs
- [Tailwind CSS](https://tailwindcss.com) – Utility-first CSS framework
-

### Programming Languages

- [TypeScript](https://www.typescriptlang.org) – Superset of JavaScript that adds static typing

### Deployment

- [AWS Amplify](https://aws.amazon.com/amplify/) – Serverless platform for web and mobile apps

## Prerequisites

Please make sure you have the following installed before local setup

- [Node Version Manager (nvm)](https://github.com/nvm-sh/nvm)

  ```bash
  curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.3/install.sh | bash
  ```

- [pnpm package manager](https://pnpm.io/installation)
  ```bash
  curl -fsSL https://get.pnpm.io/install.sh | sh -
  ```

## Local Development Setup

1. Copy .env files and fill in the required values

- `cp ./apps/studio/.env.local.example ./apps/studio/.env.local`
- `cp ./apps/website/.env.local.example ./apps/website/.env`

2. Set the correct node version before running any other commands

   ```bash
   nvm install
   ```

3. Install dependencies

   ```bash
   pnpm install
   ```

4. Start the development servers

   ```bash
   pnpm run dev
   ```

   Once the development servers are running, you can access:

- Website at [http://localhost:3000](http://localhost:3000)
- Sanity Studio at [http://localhost:3333](http://localhost:3333)

## Useful Commands

- Fix formatting issues: `pnpm run format`
- Fix linting issues: `pnpm run lint:fix`

## Development Workflow

#TODO

## Deployment

#TODO

## Resources & Further Reading

- [Sanity docs](https://www.sanity.io/docs)
- [Next.js docs](https://nextjs.org/docs)
- [TailwindCSS docs](https://tailwindcss.com/docs/styling-with-utility-classes)
- [Sanity Developer resources](docs/sanity_dev_resources.md)

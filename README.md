# INSERT PROJECT NAME

## Overview

Website & CMS Backend built using [Next.js](https://nextjs.org) & [Sanity](https://sanity.io).

- Website: [INSERT WEBSITE NAME](https://www.example.com)
- Sanity Studio CMS: [INSERT SANITY STUDIO NAME](https://example.sanity.studio)

## Tech Stack

### Backend

- [Sanity](https://sanity.io) – Headless CMS

### Frontend

- [React](https://reactjs.org) – Library for building user interfaces from components
- [Next.js](https://nextjs.org) – Framework for server and client rendered React apps and APIs
- [Tailwind CSS](https://tailwindcss.com) – Utility-first CSS framework

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

   ```bash
   cp ./apps/studio/.env.local.example ./apps/studio/.env
   cp ./apps/website/.env.local.example ./apps/website/.env
   ```

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
- Update types: `pnpm run typegen`

## Development Workflow

1. Create a new branch from `main`
   name it in the format `<type>/<jira-ticket>-<description>`
   - eg. `feature/BGR-67-video-player` or `bugfix/LASM-486-homepage-links`
   - Type can be:

     | Type      | Description                                                            |
     | --------- | ---------------------------------------------------------------------- |
     | `feature` | Adding a new feature                                                   |
     | `bugfix`  | Fixing a bug                                                           |
     | `hotfix`  | Fixing a production issue. only use this for urgent out-of-band issues |
     | `release` | Merging multiple branches to prepare for a release to production       |

   - Jira ticket is the board code and number for the ticket, eg. `AO-693` for the Jira ticket https://ecosystem.atlassian.net/browse/AO-693
   - Description is a short description of the change. It should be `kebab-cased`.

2. Make and test your changes locally
3. Run `pnpm run format && pnpm run lint:fix && pnpm run typegen` to ensure pre-commit checks pass
4. Commit and push changes to your branch
5. Create a pull request with at least one reviewer
6. Once approved, PR can be merged
7. PRs merged into `main` will be automatically deployed to production

## Deployment

PRs merged into `main` will be automatically deployed to production.
This will deploy the sanity studio and then the website.

If you need to deploy a specific branch of the website, you can...
#TODO

## Initial Project Setup

If you're creating a new git repository from a project template, you'll need to
do some additional setup for Sanity and AWS Amplify. (creating accounts, etc.)

Refer to the [New project setup instructions](docs/new_project_setup.md)

## Resources & Further Reading

- Developer docs for this site are in the [/docs directory](docs)
- [Sanity docs](https://www.sanity.io/docs)
- [Next.js docs](https://nextjs.org/docs)
- [TailwindCSS docs](https://tailwindcss.com/docs/styling-with-utility-classes)
- [Sanity Developer resources](docs/sanity_dev_resources.md)

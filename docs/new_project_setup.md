# New Project Setup

## Sanity

1. [ ] Create a sanity account at https://sanity.io/signup with an email address
       specifically for this project, eg devteam+projectname@fg.agency if one
       hasn't already been created

2. [ ] Save the login details in our password manager

3. [ ] Once you have an account, organisation and project created in Sanity, insert the
       project id and dataset in in `apps/studio/.env` and `apps/web/.env`

4. [ ] API Tokens: In Your org -> Your project -> API -> Tokens, you will need
       to create the following tokens and save them in our password manager:

   | Name          | Permissions                |
   | ------------- | -------------------------- |
   | Deploy Studio | Deploy Studio (Token only) |
   | Preview       | Viewer                     |

5. [ ] Put the Preview token in `apps/website/.env` -> `SANITY_API_READ_TOKEN`
       and the Deploy Studio token in `apps/studio/.env` -> `SANITY_AUTH_TOKEN`

6. [ ] Initial deployment of Sanity studio:
   - Ensure you are already logged in to the correct sanity account in your browser
   - when logging in from the CLI, choose `E-mail / password` and follow the link. You'll be automatically logged
     in on the CLI using the same account you're logged in to in your browser.
   - when running the deploy command:
     - enter a studio hostname (eg. `project-name-fg`)
     - If it asks about upgrading, choose `Upgrade local versions (recommended). You will need to run the deploy command again`
     - copy the appId value to `apps/studio/.env` -> `SANITY_STUDIO_APP_ID`
   ```bash
   cd apps/studio
   pnpx sanity@latest logout
   pnpx sanity@latest login
   pnpx sanity@latest projects list
   pnpx sanity@latest deploy
   pnpx sanity@latest logout
   ```
7. [ ] remove the value from `apps/studio/.env` -> `SANITY_AUTH_TOKEN` to prevent accidental future deployments

8. [ ] CORS origins: In Your org -> Your project -> API -> CORS origins,
       you will need to add these entries:

   | Origin                                   | Credentials       |
   | ---------------------------------------- | ----------------- |
   | http://localhost:3000                    | Allow Credentials |
   | http://localhost:3333                    | Allow Credentials |
   | https://<your-studio-name>.sanity.studio | Allow Credentials |
   | https://<your-website-domain>            | Allow Credentials |

9. [ ] Create an empty siteSettings document in the dataset:
   ```bash
   pnpx sanity@latest documents create --id siteSettings --type siteSettings --json '{}'
   ```

## Hosting

Choose from the following options for hosting the frontend and follow the relevant instructions below:

- AWS Amplify
- Vercel

If you need to host the frontend on a different platform, you will need to investigate this yourself.

### AWS Amplify

1. [ ] Create an AWS account for the client if one hasn't already been created
       (or if the client and isn't granting access to their own AWS account)
       and save the login details in our password manager

2. [ ] Create an AWS Amplify app for the project. Connect it to the GitHub repo for
       the project and use the main branch.

3. [ ] Add environment variables to the Amplify app. You need to add values from both:
   - `apps/studio/.env`
   - `apps/web/.env`

4. [ ] Run a build and deploy to verify the studio and web apps are working

5. [ ] Check the build logs or Sanity studio to obtain the App Id and add it to
       Amplify's environment variables

6. [ ] Create a custom subdomain with your Domain Name Registrar for the site, e.g.
       projectname.production.fg.agency

7. [ ] Update Amplify to use the custom domain

8. [ ] Enable Basic Auth and store the credentials in our password manager

### Vercel

Note that a paid Vercel account is required to connect to a private GitHub repository.

# TODO these steps only setup the Next.js frontend, they don't handle deploying Sanity Studio

1. [ ] Create a Vercel account for the client if one hasn't already been created
       (or obtain access if using a client's account) and save the login details
       in our password manager

2. [ ] Connect the Vercel project to the Dev Team GitHub account and grant
       access to the specific repository for the project.

3. [ ] Add a new Project and import the repository into Vercel.

4. [ ] Change the root directory to `apps/website`

5. [ ] Set commands
   - **Build command:** `pnpm run build`
   - **Output directory:** leave as Next.js default
   - **Install command:** `pnpm install --frozen-lockfile`

6. [ ] Environment variables - paste in the keys and values from from `apps/website/.env`

7. [ ] Deploy the project and verify it's working

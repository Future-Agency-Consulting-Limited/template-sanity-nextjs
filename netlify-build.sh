#!/usr/bin/env bash
set -euo pipefail

echo "[[📦 Step 0]] install dependencies"
pnpm install --frozen-lockfile

echo "[[📝 Step 1]] write env files"
{
  echo "SANITY_STUDIO_PROJECT_ID=$SANITY_STUDIO_PROJECT_ID"
  echo "SANITY_STUDIO_APP_ID=$SANITY_STUDIO_APP_ID"
  echo "SANITY_STUDIO_DATASET=$SANITY_STUDIO_DATASET"
  echo "SANITY_STUDIO_SANITY_API_VERSION=$SANITY_STUDIO_SANITY_API_VERSION"
  echo "SANITY_STUDIO_FRONTEND_SITE_URL=$SANITY_STUDIO_FRONTEND_SITE_URL"
  echo "SANITY_AUTH_TOKEN=$SANITY_AUTH_TOKEN"
  echo "SANITY_STUDIO_FEATURE_FLAG_BLOG=$SANITY_STUDIO_FEATURE_FLAG_BLOG"
} >> apps/studio/.env

{
  echo "NEXT_PUBLIC_SANITY_API_VERSION=$NEXT_PUBLIC_SANITY_API_VERSION"
  echo "NEXT_PUBLIC_SANITY_DATASET=$NEXT_PUBLIC_SANITY_DATASET"
  echo "NEXT_PUBLIC_SANITY_PROJECT_ID=$NEXT_PUBLIC_SANITY_PROJECT_ID"
  echo "NEXT_PUBLIC_SANITY_STUDIO_URL=$NEXT_PUBLIC_SANITY_STUDIO_URL"
  echo "NEXT_PUBLIC_SITE_URL=$NEXT_PUBLIC_SITE_URL"
  echo "NEXT_PUBLIC_REVALIDATE=$NEXT_PUBLIC_REVALIDATE"
  echo "NEXT_PUBLIC_ALLOW_CRAWLER_BOTS=$NEXT_PUBLIC_ALLOW_CRAWLER_BOTS"
  echo "NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION=$NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION"
  echo "NEXT_PUBLIC_HUBSPOT_PORTAL_ID=$NEXT_PUBLIC_HUBSPOT_PORTAL_ID"
  echo "SANITY_API_READ_TOKEN=$SANITY_API_READ_TOKEN"
  echo "NEXT_PUBLIC_FEATURE_FLAG_BLOG=$NEXT_PUBLIC_FEATURE_FLAG_BLOG"
} >> apps/website/.env

rm -rf apps/website/.next

echo "[[🦋 Step 2]] check formatting"
pnpm run format-check

echo "[[🧹 Step 3]] check linting"
pnpm run lint-check

echo "[[🏗️ Step 4]] build"
pnpm run build

echo "[[🚀 Step 5]] deploy sanity studio backend"
if [ "$BRANCH" = "main" ] || [ "$BRANCH" = "feature/2026-09-24-netlify" ]; then
  echo "On $BRANCH branch, deploying Sanity studio backend"
  (cd apps/studio && pnpm dlx sanity@latest deploy && cd ../../)
else
  echo "Skipping Sanity deploy — not on main branch (current: $BRANCH)"
fi

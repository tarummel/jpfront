## jpfront
Frontend interface for multiradicals, skip codes, etc.

# Running locally
1. Install dependencies with `npm install`
2. Copy and configure `.env.example` to `.env`
3. Start the app with `npm start`

# Running in prod
1. Install dependices with `npm install`
2. Create .env using either: \
`$ cp .env.example .env` \
`$ printenv | sed 's/\([^=]*=\)\(.*\)/\1"\2"/' > .env`
2. Build artifact with `npm run build`

# Running tests
`npm test`

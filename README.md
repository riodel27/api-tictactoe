# API TICTACTOE 🛡️

## Manual Installation

Clone the repo:

```bash
git clone https://github.com/riodel27/api-tictactoe.git

cd tic-tac-toe/api-tictactoe

```

Install the dependencies:

```bash
yarn
```

Set the environment variables:

```bash
cp .env.example .env

# open .env and modify the environment variables (if needed)
```

## Commands

requirements:

-   must have docker and docker compose locally installed in your system
-   nvm

Running locally:

```bash
docker compose up -d

yarn dev
```

Testing:

```bash
# run all tests
yarn test

# run all tests in watch mode
yarn test:watch

```

### API Endpoints

List of available routes:

**User routes**:\
`POST /api/game/add` - create a user\
`GET /api/game/list` - get all user\

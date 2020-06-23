# Code Against Racism - Backend

Built with [NestJS](https://nestjs.com/)

## Dependencies

- NodeJS
- mysql

## Installation

```bash
npm install
```

## Running the app

### Setup the database

You'll need to setup the mysql database in order to run the app

1. Create the mysql database
2. Set the `DATABASE_URL` environment variable with the db's connection url (see the [variable's description](#environment-variables)) in `.env`

### Run

```bash
# development
npm run start

# watch mode
npm run start:dev

# production mode
npm run start:prod
```

## Test

```bash
# unit tests
npm run test

# e2e tests
npm run test:e2e

# test coverage
npm run test:cov
```

## Environment variables

The following environment variables are used in this project. You can set them by creating a `.env` file in the project root directory.

| Name         | Description                                                                                          |
| ------------ | ---------------------------------------------------------------------------------------------------- |
| PORT         | Port on with the app will run. Defaults to 4000                                                      |
| NODE_ENV     | (optionnal) Current environement. Any value that is not production will be considered as development |
| DATABASE_URL | Database's url. Has the syntax `mysql://username:password@host:database_port/database_name`          |

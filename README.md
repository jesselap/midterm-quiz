# LightQUIZ

lightQUIZ is an app that encourages users to test test quiz solving skills. It allows users to take part in wide category of quizes and also lets them create their own quizes. After a user perfrom their quiz, they can see their score and can also keep tract of all their previous attempts and try to improve based on that.

## Tech Stack

- Express
- PSQL
- jQuery
- Bootstrap

## Getting Started

1. Create the `.env` by using `.env.example` as a reference: `cp .env.example .env`
2. Update the .env file with your correct local information

- username: `labber`
- password: `labber`
- database: `midterm`

3. Install dependencies: `npm i`
4. Fix to binaries for sass: `npm rebuild node-sass`
5. Reset database: `npm run db:reset`
6. Run the server: `npm run local`

- Note: nodemon is used, so you should not have to restart your server

7. Visit `http://localhost:8080/`

## Dependencies

- Node 10.x or above
- NPM 5.x or above
- PG 6.x

# Backend MVC Template by Romain

This is a backend MVC template created with Node.js, Express.js, TypeScript, ESLint, and Prettier.

## Getting Started

To get started with this template, follow these steps:

1. Clone the repository to your local machine:  
   git clone <repository-url>

2. Install the dependencies:
   npm install

Scripts
This project includes the following npm scripts in the package.json file:

build: Compiles TypeScript code into JavaScript using TypeScript compiler (tsc).
start: Starts the application in production mode using Node.js.
dev: Starts the application in development mode using Nodemon, which automatically restarts the server on code changes.
lint: Runs ESLint to check for and report code style issues in TypeScript files.
format: Runs ESLint with the --fix option to automatically fix code style issues in TypeScript files.
migrate: Executes the migration script migrate.js.
You can run these scripts using the following commands:

# Build TypeScript code

npm run build

# Start the application in production mode

npm start

# Start the application in development mode with auto-reloading

npm run dev

# Run ESLint to check code style

npm run lint

# Run ESLint to automatically fix code style issues

npm run format

# Execute the migration script

npm run migrate

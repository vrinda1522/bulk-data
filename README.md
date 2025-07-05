# Bulk Data Processing 

    This web application includes CRUD operations on bulk data using REST APIs.

## Tech Stack

    ##Backend
    -Node.js
    -Express.js (framework)
    -Sequelize (ORM)
    -PostgresSQL
    -Jest + Supertest (for testing purpose)

### Features

   -Bulk insert of data (using POST)
   -Bulk fetch of data (using GET)
   -Bulk update the data (using PUT)
   -Bulk deletion of the data (using DELETE)
   -Input validation & error handling
   -Unit test with Jest
   -Sequelize + PostgresSQL Integartion


#### Backend setup and configuration

    #### Steps to run the application
    - Run command 'cd backend-process'.
    - Then run 'npm install'.
    - In config.json update the db credentials with your own postgres credentials.
    - Run command 'CREATE DATABASE bulkdata'.
    - For migration run 'npx sequelize-cli db:migrate'.
    - To start the server run 'npm start'

    #### Steps to run tests
    - Run command 'cd backend-process' (if not in backend-process directory).
    - npm test



Author:
Vrinda Sharma (vvipasha@gmail.com)
https://github.com/vrinda1522/bulk-data



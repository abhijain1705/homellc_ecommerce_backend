# HomeLLC Backend Assignment

This project is a backend implementation for user authentication and password reset functionality. The API is built with Node.js, Express, MongoDB, and Nodemailer.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Technologies Used](#technologies-used)
- [Contributing](#contributing)
- [License](#license)

## Installation

To install and run this project locally, follow these steps:

1. Clone the repository
2. Run `npm install` to install dependencies
4. Run `npm run start` to start the server

## Usage

This project provides endpoints for user signup, login, forgot password, and password update functionality. Users can create an account, log in with their credentials, and reset their password if necessary.

To use this API, make HTTP requests to the appropriate endpoints using a tool like Postman or a similar application.

## API Endpoints

- `POST /homellc/users/signup`: Create a new user account. Send a JSON object with the following fields in the request body:

```json
{
  "firstName": "james",
  "lastName": "bond",
  "email": "jamesbond007@gmail.com",
  "phoneNumber": "+919876543210",
  "dateOfJoining": "2023-03-08T17:58:21.964Z",
  "password": "yourpassword"
}```


- `POST /homellc/users/login`: Log in to an existing user account. Send a JSON object with the following fields in the request body:
```json
{
  "email": "jamesbond007@gmail.com",
  "password": "yourpassword"
}```


- `POST /homellc/passwords/forgot-password`: Send an email to the user with a link to reset their password. Send a JSON object with the following fields in the request body:
```json
{
  "firstName": "james",
  "lastName": "bond",
  "email": "jamesbond007@gmail.com",
  "phoneNumber": "+919876543210",
  "createdAt": "2023-03-08T17:58:21.964Z"
}```


- `POST /homellc/passwords/reset-password/:token`: Reset a user's password using a token sent to their email address. Send a JSON object with the following fields in the request body:
```json
{
  "email": "jamesbond007@gmail.com",
  "password": "newmission"
}```

## Technologies Used

This project uses the following technologies:

- Node.js
- Express
- MongoDB
- Mongoose
- Nodemailer
- JSON Web Tokens

## Contributing

If you would like to contribute to this project, feel free to submit a pull request.

## License

This project is licensed under the Abhi Jain





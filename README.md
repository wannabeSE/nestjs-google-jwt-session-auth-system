<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>


## Description
This projects provides jwt, session and google oauth authentication system. 
Developed using:
  - NestJS
  - MongoDB
## Installation

```bash
$ pnpm install
```

## Running the app

```bash
# development
$ pnpm run start

# watch mode
$ pnpm run start:dev

# production mode
$ pnpm run start:prod
```

## Test

```bash
# unit tests
$ pnpm run test

# e2e tests
$ pnpm run test:e2e

# test coverage
$ pnpm run test:cov
```

# SAuth

## API Reference
## Must Run on http://localhost:3000 
#### To create new user
```http
  POST /api/v1/user/create-user
```
| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `username` | `string` | **Required** |
|`email`| `string`  | **Required**|
|`password`| `string`| **Required**|

returns {userID: 90347805124095684, email: 'abc@xyz.com'}
#### Sign In with Google [uses session log in]

```http
  GET /api/v1/auth/google/login
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `google account`      | `google account` | **Required Google account**.|

returns {userID: 90347805124095684, email: 'abc@xyz.com'}
#### Log In with Session
```http
  POST /api/v1/auth/session/login
```
| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `email` | `string` | **Required** |
|`password`| `string`  | **Required**|

returns {userID: 90347805124095684, email: 'abc@xyz.com'}

#### Log In with JWT
```http
  POST /api/v1/auth/jwt/login
```
| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `email` | `string` | **Required** |
|`password`| `string`  | **Required**|

returns {access_token: efgtg5g352gh25gh5h5h5hh3, refresh_token: ghh7fdfsdfsdafsdavfhykjukgfh}

#### To get info of logged in user [session expires in 1 day]
```http
  GET /api/v1/auth/session/profile
```
returns {userID: 90347805124095684, email: 'abc@xyz.com'}

#### To get info of logged in user [Access Token expires in 6hrs, refresh token will be available for 24hrs].

```http
  POST /api/v1/auth/jwt/profile
```
 Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `Authorization: Bearer <TOKEN>` | `string` | **Required** |

returns {userID: 90347805124095684, email: 'abc@xyz.com'}

#### To extend the time of previously assigned access token
```http
  POST /api/v1/auth/jwt/refresh-token
```
 Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `refresh_token as Request Body` | `string` | **Required** |

returns {access_token: jgsdggioergiohigoeoighorgh4pjfgl} 

[only extends the expiration time. No user info is included]

#### To log the user out
```http
  GET /api/v1/auth/session/logout
```
#### To get all users
```http
  GET /api/v1/user/all
```
 Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `Authorization: Bearer <TOKEN>` | `string` | **Required** |

returns [ {user_object}, {user_object} ]



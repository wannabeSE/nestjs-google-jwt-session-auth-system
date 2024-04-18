<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>


  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description
This projects provides jwt, session and google oauth authentication system. 

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

This projects provides jwt, session and google oauth authentication system. 


## API Reference

#### To create new user
```http
  POST /api/v1/user/create-user
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `username` | `string` | **Required** |
|`email`| `string`  | **Required**|
|`password`| `string`| **Required**|

#### Sign In with Google [uses session log in]

```http
  GET /api/v1/auth/google/login
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `google account`      | `google account` | **Required Google account**.|

#### Log In with Session
```http
  POST /api/v1/auth/session/login
```
| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `email` | `string` | **Required** |
|`password`| `string`  | **Required**|

#### Log In with JWT
```http
  POST /api/v1/auth/jwt/login
```
| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `email` | `string` | **Required** |
|`password`| `string`  | **Required**|

#### Log In with Session
```http
  GET /api/v1/auth/session/login
```
| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `email` | `string` | **Required** |
|`password`| `string`  | **Required**|

#### To get info of logged in user [session expires in 1 day]
```http
  GET /api/v1/auth/session/profile
```
#### To get info of logged in user [Token expires in 6h refresh token will be available for 24hrs].

```http
  POST /api/v1/auth/jwt/profile
```
 Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `Authorization: Bearer <TOKEN>` | `string` | **Required** |

#### To extend the time of previously assigned access token
```http
  POST /api/v1/auth/jwt/refresh-token
```
 Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `refresh_token as Request Body` | `string` | **Required** |

#### To log the user out
```http
  GET /api/v1/auth/session/logout
```
####To get all users
```http
  GET /api/v1/user/all
```
 Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `Authorization: Bearer <TOKEN>` | `string` | **Required** |



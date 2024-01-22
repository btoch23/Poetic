# Overview

Poetic is a platform powered by Node.js and Express to provide poets with a place to share and discuss their writing with fellow artists

# Routers and Endpoints

### Poems Router (`/poems`)

Manages poem uploads and info

- **GET** `/poems`: Retrieve all poems.
- **GET** `/poems/:poemId`: Retrieve a specific poem.
- **POST** `/poems`: Upload a new poem.
- **PUT** `/poems/:poemId`: Edit a specific poem.
- **DELETE** `/poems/:poemId`: Delete a specific poem.

### Comments Router (`/comments`)

Manages commenting on poems

- **GET** `/poems/:poemId/comments`: Retrieve all comments on a poem.
- **GET** `/poems/:poemId/comments/:commentId`: Retrieve a specific comment.
- **POST** `/poems/:poemId/comments`: Post a new comment on a poem.
- **PUT** `/poems/:poemId/comments/:commentId`: Edit a specific comment.
- **DELETE** `/poems/:poemId/comments/:commentId`: Delete a specific comment.

### Users Router (`/users`)

Manages user-related operations

- **GET** `/users`: Retrieve all users.
- **POST** `/users/signup`: Register a new user.
- **POST** `/users/login`: Sign a user in.
- **GET** `/users/:userId`: Retrieve a specific user.
- **PUT** `/users/:userId`: Update user information.
- **DELETE** `/users/:userId`: Delete a specific user.

# Contact Me
email: brian.toch23@gmail.com 
<br>
linkedIn: https://www.linkedin.com/in/brian-tochterman-jr-991a1189/

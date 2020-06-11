## Dreams API

API for [Dreams](https://www.playstation.com/en-gb/games/dreams-ps4/), a rad user-generated-content game on the PS4

Currently it's just a basic [indreams.me](https://indreams.me/) API proxy that handles auth headers for you

## Setup

Requires a NodeJS install (tested on v12.17.0) with NPM

Clone the repo from Github:

```bash
git clone https://github.com/jaames/dreams-api
```

Then inside the repo directory, install dependencies:

```bash
npm install
```

Then start the server:

```bash
npm run start
```

By default the server will run on port 3000, but you can easily change the `port` variable in `server.js` if you want!

## API

At the moment, the server will forward any requests you make through to `https://indreams.me` - but with the HMAC auth headers figured out for you since they're a bit of a bother. I'm still working on mapping out the whole official API available there, but here's some fun ones to get your feet wet:

### User profile

GET `/api/user/profile`

| Query param | Value |
|:-|:-|
| `userId` | User ID, e.g. `uCApMyVUyho` = "MMOfficial" |

### User creations

GET `/api/user/creations`

| Query param | Value |
|:-|:-|
| `id` | User ID, e.g. `uCApMyVUyho` = "MMOfficial" |

### User photos

GET `/api/user/photos`

| Query param | Value |
|:-|:-|
| `id` | User ID, e.g. `uCApMyVUyho` = "MMOfficial" |

### User streamed

GET `/api/user/streamed`

| Query param | Value |
|:-|:-|
| `id` | User ID, e.g. `uCApMyVUyho` = "MMOfficial" |

### User followers

GET `/api/user/followers`

| Query param | Value |
|:-|:-|
| `id` | User ID, e.g. `uCApMyVUyho` = "MMOfficial" |

### User following users

GET `/api/user/following/users`

| Query param | Value |
|:-|:-|
| `id` | User ID, e.g. `uCApMyVUyho` = "MMOfficial" |

### User following creations

GET `/api/user/following/creations`

| Query param | Value |
|:-|:-|
| `id` | User ID, e.g. `uCApMyVUyho` = "MMOfficial" |

### Creation details

GET `/api/creation/profile`

| Query param | Value |
|:-|:-|
| `creationId` | Creation ID, e.g. `ogbtEqxCwzv` = "Vertical Moving Platform" |

### Creation credits

GET `/api/creation/credits`

| Query param | Value |
|:-|:-|
| `id` | Creation ID, e.g. `ogbtEqxCwzv` = "Vertical Moving Platform" |

### Creation photos

GET `/api/creation/photos`

| Query param | Value |
|:-|:-|
| `id` | Creation ID, e.g. `ogbtEqxCwzv` = "Vertical Moving Platform" |

### Creation genealogy

GET `/api/creation/genealogy`

| Query param | Value |
|:-|:-|
| `id` | Creation ID, e.g. `ogbtEqxCwzv` = "Vertical Moving Platform" |

### Creation streams

GET `/api/creation/streamed-by`

| Query param | Value |
|:-|:-|
| `id` | Creation ID, e.g. `ogbtEqxCwzv` = "Vertical Moving Platform" |

### Creation used in

GET `/api/creation/usedin`

| Query param | Value |
|:-|:-|
| `id` | Creation ID, e.g. `ogbtEqxCwzv` = "Vertical Moving Platform" |

### Creation contents

GET `/api/creation/contents`

| Query param | Value |
|:-|:-|
| `id` | Creation ID, e.g. `ogbtEqxCwzv` = "Vertical Moving Platform" |

### Creation remixes

GET `/api/creation/remixes`

| Query param | Value |
|:-|:-|
| `id` | Creation ID, e.g. `ogbtEqxCwzv` = "Vertical Moving Platform" |

### Creation followers

GET `/api/creation/followers`

| Query param | Value |
|:-|:-|
| `id` | Creation ID, e.g. `ogbtEqxCwzv` = "Vertical Moving Platform" |

## Notes

### ID Format

All dreams IDs seem to match the regex `/[m|v|d|o|c|u|p]{1}[a-f0-9]{10}/`, where the first character denotes the ID type:

| Char | thingType |
|:-|:-|
| `m` | DREAM |
| `v` | VERSION |
| `d` | SCENE |
| `o` | ELEMENT |
| `c` | COLLECTION |
| `u` | USER |
| `p` | PHOTO |
| `t` | TAG |
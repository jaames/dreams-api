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

## Usage

At the moment, the server will forward any requests you make through to `https://indreams.me` - but with the HMAC auth headers figured out for you since they're a bit of a bother. I'm still working on mapping out the whole official API available there, but here's some fun ones to get your feet wet:

### User profile

GET `/api/user/profile`

| Query param | Value |
|:-|:-|
| `userId` | User ID, e.g. `uCApMyVUyho` = "MMOfficial" |

### Creation details

GET `/api/creation/profile`

| Query param | Value |
|:-|:-|
| `creationId` | User ID, e.g. `ogbtEqxCwzv` = "Vertical Moving Platform" |
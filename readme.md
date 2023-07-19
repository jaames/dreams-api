> ⚠️
> This does NOT provide a way to download Dreams level data, nor will it ever. Unfortunately I no longer have the time/motivation to investivate Dreams or develop this tool further.
> ⚠️

## Dreams API

API proxy & reverse-engineering notes for Media Molecule's [Dreams](https://www.playstation.com/en-gb/games/dreams-ps4/); a rad user-generated-content game on the PS4.

Currently consists of a NodeJS [indreams.me](https://indreams.me/) API proxy that handles auth headers for you, which can be used for automatically gathering level stats, user profiles, etc. There's also some [documentation](https://github.com/jaames/dreams-api/wiki/Indreams-API) that covers some basic file format structures and so on.

## Proxy Setup

Requires a NodeJS install (tested on v12.17.0) with NPM

Clone the repo from Github:

```bash
git clone https://github.com/jaames/dreams-api
```

Then inside the repo directory, install dependencies:

```bash
npm install
```

Copy `apiconfig.example.json` to `apiconfig.json`

```bash
cp apiconfig.example.json apiconfig.json
```

Then start the server:

```bash
npm run start
```

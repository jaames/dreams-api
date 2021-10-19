## Dreams API

API proxy & reverse-engineering notes for Media Molecule's [Dreams](https://www.playstation.com/en-gb/games/dreams-ps4/); a rad user-generated-content game on the PS4.

Currently consists of a NodeJS [indreams.me](https://indreams.me/) API proxy that handles auth headers for you, plus some [documentation](https://github.com/jaames/dreams-api/wiki/Indreams-API)

## Motivation

The Dreams community is incredible, although the lack of export/backup options concerns me a little bit considering the sheer number of hours that people have put into making content. It would be a damn shame if Sony decided to pull the plug on all of these wonderful creations one day - so my ultimate goal is finding a way to download level data before then!

It's also... just kinda fun to figure out how things work :P

If you have any questions or concerns please feel free to shoot me a DM on [Twitter](https://twitter.com/rakujira) or email me via `github <at> jamesdaniel <dot> dev`.

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

Then start the server :

```bash
npm run start
```

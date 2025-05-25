# shorturl-frontend

Frontend project for [shorturl](https://github.com/Nidheesh-Panchal/shorturl)  backend project

## Build project

Prerequisites:

- Node (v22.16.0 LTS)

```bash
# navigate to the folder
cd shorturl

# get all the libraries
npm install
```

## Run on local

The instructions to run on local are in the folder's [readme file](shorturl/README.md)

## Build and run docker image

```bash
# build project
cd shorturl
npm run build

# build docker image
docker build --no-cache -t shorturl-frontend:v0.0.1 .
```

```bash
# run docker compose
# From the root folder of the project
docker compose up -d

# tail logs
docker compose logs -f
```

cd shorturl
npm run build
docker build --no-cache -t shorturl-frontend:v0.0.1 .
cd ..
docker compose up -d
docker compose logs -f
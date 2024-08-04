#!/bin/bash

VERSION=$(jq -r .version package.json)

cd ../../

docker buildx build \
    -f apps/server/Dockerfile \
    --platform linux/amd64 \
    -t ghcr.io/raine-works/turbo-cache-server:latest \
    -t ghcr.io/raine-works/turbo-cache-server:${VERSION} \
    --build-arg=PORT=8000 \
    --build-arg=NODE_ENV=production \
    --load \
    --push \
    .
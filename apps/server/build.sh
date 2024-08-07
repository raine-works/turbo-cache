#!/bin/bash

VERSION=$(jq -r .version package.json)

cd ../../

if docker buildx ls | grep -q docker-container; then
    echo "Using existing builder."
else
    docker buildx create --name container --driver=docker-container
fi

docker buildx build \
    -f apps/server/Dockerfile \
    --platform linux/amd64,linux/arm64 \
    -t ghcr.io/raine-works/turbo-cache-server:latest \
    -t ghcr.io/raine-works/turbo-cache-server:${VERSION} \
    --build-arg=PORT=8000 \
    --build-arg=NODE_ENV=production \
    --push \
    --builder=container \
    .
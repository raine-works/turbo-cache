# Turbo Cache Server

Turborepo remote cache server for docker. This server allows you to share a single Turborepo cache across your entire team, significantly speeding up your build times by avoiding redundant work.

## Features

-   **Remote Caching**: Share cache across multiple machines.
-   **Dockerized**: Easy to deploy and manage using Docker.

## Prerequisites

-   Docker installed on your machine.

## Getting Started

-   Pull the docker image.

```
docker pull ghcr.io/raine-works/turbo-cache-server:latest
```

-   Start the container.

```
docker run -d \
-e TURBO_TOKEN='YOUR_CUSTOM_TOKEN' \
-e LOCAL_STORAGE_DIR='/tmp/turbo' \
-p 8000:8000 \
--name turbo-cache-server \
ghcr.io/raine-works/turbo-cache-server:latest
```

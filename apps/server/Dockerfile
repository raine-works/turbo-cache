FROM oven/bun:1.1.21 AS base 
FROM base AS builder
WORKDIR /app

ARG NODE_ENV
ARG PORT

ENV NODE_ENV=${NODE_ENV}
ENV PORT=${PORT}

COPY . .

# First install the dependencies (as they change less often)
RUN bun install --production --frozen-lockfile --ignore-scripts
 
# Build the project
RUN bun build ./apps/server/src/index.ts --compile --outfile ./apps/server/server 

FROM ubuntu:23.10 AS runner
WORKDIR /app

ARG NODE_ENV
ARG PORT

ENV NODE_ENV=${NODE_ENV}
ENV PORT=${PORT}
ENV TZ="UTC"

# Create a non-root user
RUN groupadd -g 1001 bun_group
RUN useradd -u 1001 -g bun_group bun_user
 
# Copy executable from builder
COPY --from=builder /app/apps/server/server ./server

# Switch to non-root user
USER bun_user
EXPOSE ${PORT}
 
ENTRYPOINT ["/app/server"]
LABEL org.opencontainers.image.source="https://github.com/raine-works/turbo-cache"
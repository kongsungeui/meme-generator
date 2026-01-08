FROM mcr.microsoft.com/devcontainers/typescript-node:1-20-bookworm

# Install additional tools if needed
RUN apt-get update && export DEBIAN_FRONTEND=noninteractive \
    && apt-get -y install --no-install-recommends git

# Set working directory
WORKDIR /workspace

# Expose port 3000 for Next.js
EXPOSE 3000

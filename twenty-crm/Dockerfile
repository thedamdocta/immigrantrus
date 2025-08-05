FROM node:22-alpine

WORKDIR /app

# Copy package files
COPY package.json yarn.lock .yarnrc.yml ./
COPY .yarn .yarn

# Install dependencies
RUN yarn install --frozen-lockfile

# Copy source code
COPY . .

# Build the application
RUN npx nx run-many -t build -p twenty-server twenty-front

# Expose port
EXPOSE 3000

# Start the application
CMD ["yarn", "start"]

# Use an official Node.js runtime as a parent image
FROM mcr.microsoft.com/playwright:v1.30.0-focal

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of your application code
COPY . .

# Install Playwright browsers
RUN npm ci
RUN npx playwright install


# Command to run your Playwright tests
CMD ["npx", "playwright", "test", "--config=playwright.config.ts", "--reporter=list"]

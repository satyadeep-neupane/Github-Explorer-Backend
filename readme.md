# GitHub Explorer Proxy

This is a simple proxy-like backend for github.

## Getting Started

Follow these steps to run the application on your local machine.

### Prerequisites

You need to have Node.js and npm installed on your machine.

### Installation

### 1. Clone the repository to your local machine:

```
git clone <repository-url>
cd <project-folder>
```

### 2. Install dependencies:

```
npm install
```

### 3. Copy the environment variables file:

```
cp .env.example .env
```

Edit the `.env` file and fill in the required values.

### Running the Application

To start the Express server, run the following command:

```
npm start
```

The server will start running on http://localhost:3000 by default.

## Environment Variables

The application uses environment variables for configuration. Make sure to set these variables in your `.env` file:

-   `PORT`: The port on which the server will run. Default is 3000.
-   `GITHUB_TOKEN`: The is optional and can be used to increase rate limit.

## Known Issues

1. Issue with Rate Limit for Unauthenticated GitHub Requests:
   When making unauthenticated requests to GitHub, you might encounter rate limiting issues. To avoid this, you can authenticate your requests by providing a GitHub token in the .env file:

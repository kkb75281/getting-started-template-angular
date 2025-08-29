# Skapi Angular Starter Template

This project is an Angular starter template using Skapi.

It includes the following basic features:

- Signup
- Signup email verification
- Login

## How to Run

1. Download the project and install dependencies:

```bash
npm install
```

2. Start the development server:

```bash
npm start
```

3. Open your browser and go to `http://localhost:4200` to view the app.

### Remote Server Deployment (Optional)

To deploy on a remote server with Node.js, usually build and then deploy:

```bash
npm run build
```

Upload the generated `dist/` folder to your server for deployment.

## Important!

Replace the `SERVICE_ID` and `OWNER_ID` values in `src/app/app.config.ts` or the relevant environment file with your own service information.

You can get your own service ID from [Skapi](https://www.skapi.com).

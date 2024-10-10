# Drive-in Theater Frontend

## Setup

1. Clone the repo
   ```bash
   git clone https://github.com/Otisz/app.drivein-theater.git
   ```
2. Install dependencies
   ```bash
   pnpm install
   ```
3. Setup `.env` file
  - ```bash
     cp .env.example .env.local
     ```
  - ```bash
    openssl rand -base64 32
    ```
    And copy paste the value to `NEXTAUTH_SECRET`
  - Generate the client ID on the backend using the following command:
    ```bash
    php artisan passport:client --public --name Web
    ```
    Set the callback url to `<frontend-domain>/api/auth/callback/theater`, usually `http://localhost:3000/api/auth/callback/theater` for development.
    
    Paste the UUID to `NEXTAUTH_CLIENT_ID`
  - Fill in the rest of the variables based on your environment

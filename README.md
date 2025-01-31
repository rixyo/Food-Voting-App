Here’s a concise and focused `README.md` file with instructions for running the app using Docker:

---

```markdown
# Food Voting App

This is a full-stack application for voting on restaurants and dishes. It consists of:
- **Frontend**: Next.js
- **Backend**: NestJS
- **Database**: PostgreSQL

## Prerequisites

- Docker and Docker Compose installed on your machine.

## Running the App with Docker

1. Clone the repository:
   ```bash
   git clone https://github.com/rixyo/-Food-Voting-App.git
   cd food-voting-app
   ```

2. Start the application using Docker Compose:
   ```bash
   docker-compose up --build
   ```

3. Access the services:
   - **Frontend**: Open `http://localhost:3000` in your browser.
   - **Backend API**: Access `http://localhost:3001`.
   - **Swagger API Docs**: Open `http://localhost:3001/api` in your browser.

4. To stop the application, run:
   ```bash
   docker-compose down
   ```

## Project Structure

- `backend/`: Contains the NestJS backend code.
- `frontend/`: Contains the Next.js frontend code.
- `docker-compose.yml`: Docker Compose configuration for running the app.
- `README.md`: This file.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
```

---

### Key Features of the README:
1. **Prerequisites**: Clearly states that Docker and Docker Compose are required.
2. **Running the App**: Provides step-by-step instructions for starting the app with Docker Compose.
3. **Accessing Services**: Lists the URLs for the frontend, backend, and Swagger API docs.
4. **Stopping the App**: Explains how to stop the app.
5. **Project Structure**: Briefly describes the main directories.
6. **License**: Includes a reference to the license file.
# -Food-Voting-App

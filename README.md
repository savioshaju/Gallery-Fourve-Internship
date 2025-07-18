﻿# Fourve-Internship

# Gallery App

## Technologies Used

- **Frontend:** React, Vite, Tailwind CSS, React Router DOM
- **Backend:** Node.js, Express.js, Mongoose, Multer, CORS, dotenv
- **Database:** MongoDB (using Mongoose ODM)

---

## Setup Instructions

### 1. Clone the Repository

```sh
git clone https://github.com/savioshaju/Gallery-Fourve-Internship.git
cd Gallery-Fourve-Internship
```

---

### 2. Backend Setup

1. Go to the backend folder:
    ```sh
    cd backend
    ```

2. Install dependencies:
    ```sh
    npm install
    ```

#### ⚠️ Windows Users: Script Execution Policy Error

If you see an error like:

```
File .\node_modules\.bin\<script>.ps1 cannot be loaded because running scripts is disabled on this system.
```

Run PowerShell **as Administrator** and execute the following command:

```powershell
Set-ExecutionPolicy RemoteSigned
```

When prompted, press `Y` and then Enter.

3. Create a `.env` file in the `backend` directory and install `dotenv` to load environment variables:

    ```sh
    npm install dotenv
    ```

    Then create a `.env` file with the following content (replace `your_mongodb_url` with your actual MongoDB connection string):

    ```
    PORT=3000
    MONGODB_URI=your_mongodb_url
    ```


4. Start the backend server:
    ```sh
    node server.js
    ```

---

### 3. Frontend Setup

1. Open a new terminal and go to the frontend folder:
    ```sh
    cd frontend
    ```

2. Install dependencies:
    ```sh
    npm install
    ```

3. Start the frontend development server:
    ```sh
    npm run dev
    ```

4. Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## Database Schema

### Media

| Field      | Type      | Description                |
|------------|-----------|----------------------------|
| _id        | ObjectId  | Unique identifier          |
| filename   | String    | Name of the file           |
| mimetype   | String    | MIME type (image/video)    |
| size       | Number    | File size in bytes         |
| data       | Buffer    | File data (binary)         |
| uploadedAt | Date      | Upload timestamp           |

### MediaGroup

| Field      | Type        | Description                        |
|------------|-------------|------------------------------------|
| _id        | ObjectId    | Unique identifier                  |
| groupName  | String      | Name of the group (unique)         |
| mediaIds   | [ObjectId]  | Array of Media document references |
| createdAt  | Date        | Group creation timestamp           |

---


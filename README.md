# Gallery App


## Technologies Used

- **Frontend:** React, Vite, Tailwind CSS, React Router DOM
- **Backend:** Node.js, Express.js, Mongoose, Multer, CORS, dotenv
- **Database:** MongoDB (using Mongoose ODM)

---

## Setup Instructions

### 1. Clone the Repository

```sh
git clone <your-repo-url>
cd Gallery
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

3. Create a `.env` file in the `backend` directory with the following content (replace `your_mongodb_url` with your actual MongoDB connection string):

    ```
    PORT=3000
    MONGODB_URI=your_mongodb_url
    ```

4. Start the backend server (make sure your `.env` file looks like the example at the bottom of this README):
    ```sh
    npm start
    ```

---

### 3. Frontend Setup

1. Open a new terminal and go to the frontend folder:
    ```sh
    cd frondend
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

## Example .env file

```
PORT=3000
MONGODB_URI=mongodb+srv://savioshaju:felix1948@cluster0.6zyg4gg.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
```
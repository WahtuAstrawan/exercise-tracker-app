## Exercise Tracker App

### 1. Create a New User

**Endpoint:** `POST /api/users`

**Request:**

- Form Data: `username`

**Response:**

- Status: 200 OK
- Body:
  ```json
  {
    "username": "exampleUsername",
    "_id": "65bdb97886b1e3dcad928fc5"
  }
  ```

### 2. Get a List of All Users

**Endpoint:** `GET /api/users`

**Response:**

- Status: 200 OK
- Body:
  ```json
  [
    {
      "username": "user1",
      "_id": "65bdb97886b1e3dcad928fc5"
    },
    {
      "username": "user2",
      "_id": "65bdb97886b1e3dcad928fc6"
    }
    // ... other users
  ]
  ```

### 3. Add Exercise for a User

**Endpoint:** `POST /api/users/:_id/exercises`

**Request:**

- Form Data: `description`, `duration`, `date` (optional)

**Response:**

- Status: 200 OK
- Body:
  ```json
  {
    "_id": "65bdb97886b1e3dcad928fc5",
    "username": "exampleUsername",
    "count": 1,
    "log": [
      {
        "description": "run",
        "duration": 10,
        "date": "Sat Feb 03 2024"
      }
    ]
  }
  ```

### 4. Get Exercise Log for a User

**Endpoint:** `GET /api/users/:_id/logs`

**Request:**

- Query Parameters: `from` (optional), `to` (optional), `limit` (optional)

**Response:**

- Status: 200 OK
- Body:
  ```json
  {
    "_id": "65bdb97886b1e3dcad928fc5",
    "username": "exampleUsername",
    "count": 1,
    "log": [
      {
        "description": "run",
        "duration": 10,
        "date": "Sat Feb 03 2024"
      }
      // ... other logs
    ]
  }
  ```

### 5. Get Filtered Exercise Log for a User

**Endpoint:** `GET /api/users/:_id/logs`

**Request:**

- Query Parameters: `from` (optional), `to` (optional), `limit` (optional)

**Response:**

- Status: 200 OK
- Body:
  ```json
  {
    "_id": "65bdb97886b1e3dcad928fc5",
    "username": "exampleUsername",
    "count": 1,
    "log": [
      {
        "description": "run",
        "duration": 10,
        "date": "Sat Feb 03 2024"
      }
      // ... other logs
    ]
  }
  ```

### Notes:

- For date parameters (e.g., `from`, `to`, `date`), use the dateString format of the Date API.
- Ensure the correct format for date parameters in yyyy-mm-dd.
- You can add `from`, `to`, and `limit` parameters to `GET /api/users/:_id/logs` to retrieve a filtered exercise log.
- Ensure the `description` property of any object in the log array is a string.
- Ensure the `duration` property of any object in the log array is a number.
- Ensure the `date` property of any object in the log array is a string.

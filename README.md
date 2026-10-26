# SQL with Node.js (User Management CRUD App)

A full-stack Node.js and Express web application demonstrating CRUD (Create, Read, Update, Delete) operations with a MySQL database using the `mysql2` driver and `EJS` templating.

---

## 🚀 Features

- **Read / View Users**: Display the total count of registered users on the home page and browse all users in a tabular format.
- **Create Users**: Add new users with automatically generated unique identifiers using `uuid` (UUIDv4).
- **Update Users**: Edit existing usernames with password authentication verification.
- **Delete Users**: Remove users using RESTful `DELETE` requests handled via `method-override`.
- **Faker Integration**: Ability to generate bulk mock user data using `@faker-js/faker`.

---

## 🛠️ Tech Stack

- **Backend**: Node.js, Express.js
- **Database**: MySQL, `mysql2`
- **View Engine**: EJS (Embedded JavaScript templates)
- **Utilities**: 
  - `uuid` (v4) for primary key generation
  - `method-override` for HTTP `PATCH` and `DELETE` support in HTML forms
  - `@faker-js/faker` for mock data generation

---

## 📁 Project Structure

```text
SQLwithNode/
├── public/
│   └── style.css            # Stylesheet for tabular display
├── views/
│   ├── home.ejs             # Home page (user count summary)
│   ├── show.ejs             # Users table with edit/delete actions
│   ├── new.ejs              # Form to register a new user
│   └── edit.ejs             # Form to edit user details
├── index.js                 # Express server & MySQL connection setup
├── schema.sql               # MySQL table schema
├── package.json             # Dependencies and project metadata
└── README.md                # Project documentation
```

---

## 🗄️ Database Setup

1. Make sure **MySQL Server** is installed and running on your system.
2. Log into MySQL and create the database:
   ```sql
   CREATE DATABASE IF NOT EXISTS apna_college;
   USE apna_college;
   ```
3. Run the schema defined in [`schema.sql`](schema.sql):
   ```sql
   CREATE TABLE user (
       id VARCHAR(50) PRIMARY KEY,
       username VARCHAR(50) UNIQUE,
       email VARCHAR(50) UNIQUE NOT NULL,
       password VARCHAR(50) NOT NULL
   );
   ```

---

## ⚙️ Installation & Configuration

1. **Clone or open the project directory**:
   ```bash
   cd SQLwithNode
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Configure Database Credentials**:
   In [`index.js`](index.js), update your MySQL connection settings if different from default:
   ```javascript
   const connection = mysql.createConnection({
     host: 'localhost',
     user: 'root',
     database: 'apna_college',
     password: 'YOUR_MYSQL_PASSWORD'
   });
   ```

4. **Start the server**:
   ```bash
   node index.js
   ```
   Or with nodemon (if installed globally):
   ```bash
   nodemon index.js
   ```

5. Open your browser and visit:
   ```text
   http://localhost:8080/
   ```

---

## 🌐 API Routes & Endpoints

| HTTP Method | Route | Description | View / Action |
|-------------|-------|-------------|---------------|
| `GET` | `/` | Home page showing total user count | `home.ejs` |
| `GET` | `/show` | Display list of all users | `show.ejs` |
| `GET` | `/user` | Form to create a new user | `new.ejs` |
| `POST` | `/user` | Inserts new user into MySQL with UUID | Redirects to `/show` |
| `GET` | `/show/:id/edit` | Form to edit user's username | `edit.ejs` |
| `PATCH` | `/show/:id` | Verifies password and updates username | Redirects to `/show` |
| `DELETE` | `/user/:id` | Deletes user from database | Redirects to `/show` |

---

## 🧪 Testing CRUD Flow

1. **Add a User**:
   - Go to `http://localhost:8080/user`
   - Fill in username, email, and password, then click **Submit**.
   - You will be redirected to `http://localhost:8080/show` with the newly created user.

2. **Edit a User**:
   - On `http://localhost:8080/show`, click **Update** on any user row.
   - Enter a new username and the correct existing password.
   - Click **Update username**.

3. **Delete a User**:
   - On `http://localhost:8080/show`, click the **Delete** button next to any user row to remove them.

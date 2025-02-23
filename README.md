---
title: GitHub User Search App Documentation
---

# **GitHub User Search Application**  

## **Overview**  
The **GitHub User Search Application** allows users to search for GitHub profiles using the **GitHub REST API**. It provides an intuitive interface to:

Search for GitHub users and view profile details  
Track search history with localStorage  
Clear search history when needed  
Handle API errors and display user-friendly messages  

---

## **Tech Stack**  

| Technology        | Purpose |
|------------------|----------|
| **Next.js**      | React-based frontend framework |
| **TypeScript**   | Type safety and better developer experience |
| **TailwindCSS**  | Styling framework for UI development |
| **GitHub API**   | Data source for fetching user details |
| **Jest & Testing Library** | Unit and integration testing |

---

## **Project Structure**  
```
/app
  ├── history/           # Search history page
  ├── page.tsx          # Home page
  ├── layout.tsx        # Layout file
/api
  ├── users.ts          # API route to fetch GitHub user details
/components
  ├── SearchBar.tsx     # Search input component
  ├── UserCard.tsx      # Component to display user details
/lib
  ├── api.ts            # Functions for fetching data from GitHub API
/public                 # Static assets
/styles                 # Global styles
/tests                  # Unit and integration tests
```

---

## **How to Start the Application**  

### ** 1️ Install Dependencies**  
Run the following command to install required dependencies:

```bash
yarn install
```

### ** 2 Start the Development Server**  
To start the application in development mode:

```bash
yarn dev
```

This runs the app at `http://localhost:3000`.

### ** 3 Build and Run in Production**  
To create an optimized production build:

```bash
yarn build
```

Then start the production server:

```bash
yarn start
```

---

## **Running Tests**  

The application includes unit tests for critical functionalities using **Jest** and **React Testing Library**.

### **Run Tests**  
To execute all tests:

```bash
yarn test
```

To run tests in **watch mode**:

```bash
yarn test --watch
```

---

## **API Definition & Testing**  

### ** 1️ Fetch GitHub User Details**  
**Endpoint:**  
```bash
GET /api/users?username={githubUsername}
```

**Example Request:**  
```bash
GET /api/users?username=octocat
```

**Response Format:**  
```json
{
  "login": "octocat",
  "avatar_url": "https://github.com/octocat.png",
  "bio": "GitHub mascot",
  "public_repos": 8
}
```

### ** 2️ How to Test the API**  
1. Start the development server (`yarn dev`).
2. Use **Postman** or a browser to test the API endpoint.
3. Check the console for errors if needed.

---

## **Key Features**  

1️ **GitHub User Search**  
- Users can search for any GitHub username and view their details.

2️ **Search History Tracking**  
- Previous searches are stored in `localStorage` and displayed on a history page.

3️ **Error Handling & Validation**  
- The app gracefully handles API errors, such as invalid usernames or rate limits.

4️ **Performance Optimization**  
- Uses **Next.js API routes** for efficient data fetching.

5️ **Testing & Reliability**  
- **Unit tests** cover major functionalities using Jest and React Testing Library.

---

## **How It Works**  

1. The user enters a GitHub username and clicks **Search**.  
2. The app makes a **fetch request** to `https://api.github.com/users/{username}`.  
3. If the user exists, their profile is displayed.  
4. The search term is saved in localStorage and can be accessed later.  
5. The user can navigate to the **Search History Page** to view or clear past searches.  

---


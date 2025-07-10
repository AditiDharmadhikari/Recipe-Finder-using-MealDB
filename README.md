# 🍽️ Recipe Finder WebApp using TheMealDB API

This is a full-stack web application built using **Node.js**, **Express**, and **EJS**, which integrates the [TheMealDB API](https://www.themealdb.com/api.php) to help users explore a wide variety of meals from different categories, areas, and ingredients.

---

## 🌟 Features

- 🔍 **Search meals by name** or **first letter**
- 📂 **Explore meals** by:
  - Category
  - Area (Cuisine)
  - Ingredient
- 🎲 **Get a random meal**
- 📋 **View full recipe** details including ingredients and instructions
- 🧭 Clean and responsive UI using **Bootstrap 5**
- 🌙 Styled with a **dark theme**

---

## 🛠️ Tech Stack

- **Backend:** Node.js, Express
- **Frontend:** EJS, HTML, CSS, Bootstrap
- **API Used:** [TheMealDB API](https://www.themealdb.com/api.php)

---

## 🚀 Installation & Setup Instructions

### 1. Clone the Repository

git clone https://github.com/AditiDharmadhikari/Recipe-Finder-using-MealDB.git
cd Recipe-Finder-using-MealDB

### 2. Install Dependencies
npm install

### 3. Start the Server
If you want to run it once:
node index.js

For automatic reloads during development:
npx nodemon index.js

Make sure nodemon is installed globally if you want to use it outside npx:
npm install -g nodemon

## Project Structure 
.
├── index.js                     # Main server file
├── package.json
├── package-lock.json
├── .gitignore
├── public/
│   ├── styles/
│   │   └── style.css            # Dark theme styling
│   └── assets/
│       └── images/
│           └── api_logo.svg
├── views/
│   ├── index.ejs                # Home page
│   ├── search_meal.ejs          # Search results
│   ├── detail_meal.ejs          # Recipe details
│   └── partials/
│       ├── header.ejs
│       └── footer.ejs
└── README.md

## Acknowledgements
API provided by TheMealDB
Bootstrap for UI components

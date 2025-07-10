//Imports 
import express from "express";
import axios from "axios";
import ejs from "ejs"; 
import bodyParser from "body-parser";
//Setting up port and app 
const port = 3000;
const app = express();
//Public : static files => html, css 
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res)=>{
    res.render("index.ejs"); 
});


app.post("/search",  async (req, res) => {
    const food = req.body.search_food; 
    try {
        const response = await axios.get(`https://www.themealdb.com/api/json/v1/1/search.php?s=${food}`);
        const meals = response.data.meals;
        res.render("search_meal.ejs", { meals, query: food });
    } catch (error) {
        console.error("Error fetching data:", error.message);
        res.render("search_meal.ejs", { meals: null, query: food });
    }
});

app.post("/meal", async (req, res)=>{
    const meal_id = req.body.id; 
    const response = await axios.get(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${meal_id}`); 
    try {
        const meal = response.data.meals[0];
        res.render("detail_meal.ejs", { meal });
        
    } catch (error) {
        console.error("Error fetching meal by ID:", err.message);
        res.send("Error retrieving meal.");
    }
});

app.post("/search-letter",async (req, res) => {
    const first_letter = req.body.letter; 
    try {
        const response = await axios.get(`https://www.themealdb.com/api/json/v1/1/search.php?f=${first_letter}`);
        const meals = response.data.meals;
        res.render("search_meal.ejs", { meals, query: first_letter });
    } catch (error) {
        console.error("Error fetching data:", error.message);
        res.render("search_meal.ejs", { meals: null, query: first_letter });
    }
} );

app.get("/categories", async (req, res)=>{
    try {
        const response = await axios.get(`https://www.themealdb.com/api/json/v1/1/categories.php`); 
        const categories = response.data.categories;
        res.render("index.ejs", { categories });
        console.log(response.data); 
    } catch (error) {
        console.error("Error loading homepage categories:", error.message);
        res.render("index.ejs", { categories: []});
    }
}); 

app.get("/areas", async (req, res) => {
    try {
        const response = await axios.get('https://www.themealdb.com/api/json/v1/1/list.php?a=list');
        const areas = response.data.meals;
        res.render("index.ejs", { areas }); // sending areas to index.ejs
    } catch (error) {
        console.error("Error fetching areas:", error.message);
        res.render("index.ejs", { areas: [] });
    }
});

app.get("/ingredients", async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = 20;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    try {
        const response = await axios.get('https://www.themealdb.com/api/json/v1/1/list.php?i=list');
        const allIngredients = response.data.meals;

        const totalPages = Math.ceil(allIngredients.length / limit);
        const paginatedIngredients = allIngredients.slice(startIndex, endIndex);

        res.render("index.ejs", { 
            ingredients: paginatedIngredients, 
            currentPage: page, 
            totalPages: totalPages 
        });
    } catch (error) {
        console.error("Error fetching ingredients:", error.message);
        res.render("index.ejs", { ingredients: [], currentPage: 1, totalPages: 1 });
    }
});

app.get("/random-meal", async (req, res) => {
    try {
        const response = await axios.get('https://www.themealdb.com/api/json/v1/1/random.php');
        const meal = response.data.meals[0];
        res.render("detail_meal.ejs", { meal }); 
    } catch (error) {
        console.error("Error fetching random meal:", error.message);
        res.send("Error retrieving random meal.");
    }
});

app.get("/filter", async (req, res) => {
    const { i, c, a } = req.query;  // Ingredient, Category, Area

    let filterURL = "";

    if (i) filterURL = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${i}`;
    else if (c) filterURL = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${c}`;
    else if (a) filterURL = `https://www.themealdb.com/api/json/v1/1/filter.php?a=${a}`;
    else return res.send("No filter specified.");

    try {
        const response = await axios.get(filterURL);
        const meals = response.data.meals;
        res.render("search_meal.ejs", {
            meals,
            query: i || c || a
        });
    } catch (error) {
        console.error("Error filtering meals:", error.message);
        res.render("search_meal.ejs", { meals: null, query: i || c || a });
    }
});






//Listening to our port 
app.listen(port, ()=>{
    console.log(`Listening at port ${port} `); 
});
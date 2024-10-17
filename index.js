const express = require('express');
const { resolve } = require('path');
const cors = require('cors');
const sqlite = require('sqlite');
const splite3 = require('sqlite3').verbose();
const { open } = require('sqlite');

const app = express();
const port = 3010;

app.use(express.static('static'));
app.use(cors());
app.use(express.json());

let db;

(async () => {
  db = await open({
    filename: './database.sqlite',
    driver: splite3.Database,
  });
})();

async function fetchAllRestaurents() {
  let query = 'SELECT * FROM restaurants';
  let response = await db.all(query, []);

  return response;
}
app.get('/restaurents', async (req, res) => {
  try {
    let getAllRestaurents = await fetchAllRestaurents();

    if (getAllRestaurents.length === 0) {
      res.status(404).json({
        message: 'Restaurents not found',
      });
    }

    res.status(200).json({
      restaurents: getAllRestaurents,
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
});

async function fetchAllRestaurentById(id) {
  let query = 'SELECT * FROM restaurants WHERE id = ?';
  let response = await db.all(query, [id]);

  return response;
}
app.get('/restaurants/details/:id', async (req, res) => {
  let id = req.params.id;
  try {
    let getAllRestaurentById = await fetchAllRestaurentById(id);

    if (getAllRestaurentById.length === 0) {
      res.status(404).json({
        message: 'Restaurents not found for Id : ' + id,
      });
    }

    res.status(200).json({
      restaurent: getAllRestaurentById,
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
});

async function fetchAllRestaurentsByCuisine(cuisine) {
  let query = 'SELECT * FROM restaurants WHERE cuisine = ?';
  let response = await db.all(query, [cuisine]);

  return response;
}
app.get('/restaurants/cuisine/:cuisine', async (req, res) => {
  let cuisine = req.params.cuisine;
  try {
    let getAllRestaurentsByCuisine = await fetchAllRestaurentsByCuisine(
      cuisine
    );

    if (getAllRestaurentsByCuisine.length === 0) {
      res.status(404).json({
        message: 'Restaurents not found for Cuisine : ' + cuisine,
      });
    }

    res.status(200).json({
      restaurents: getAllRestaurentsByCuisine,
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
});

async function filterAllRestaurents(isVeg, hasOutdoorSeating, isLuxury) {
  let query =
    'SELECT * FROM restaurants WHERE isVeg = ? AND hasOutdoorSeating = ? AND isLuxury = ?';
  let response = await db.all(query, [isVeg, hasOutdoorSeating, isLuxury]);

  return response;
}
app.get('/restaurants/filter', async (req, res) => {
  let isVeg = req.query.isVeg;
  let hasOutdoorSeating = req.query.hasOutdoorSeating;
  let isLuxury = req.query.isLuxury;
  try {
    let getAllRestaurents = await filterAllRestaurents(
      isVeg,
      hasOutdoorSeating,
      isLuxury
    );

    if (getAllRestaurents.length === 0) {
      res.status(404).json({
        message: 'Restaurents not found',
      });
    }

    res.status(200).json({
      restaurents: getAllRestaurents,
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
});

async function fetchAllRestaurentsByRating() {
  let query = 'SELECT * FROM restaurants ORDER BY rating DESC';
  let response = await db.all(query, []);

  return response;
}
app.get('/restaurents/sort-by-rating', async (req, res) => {
  try {
    let getAllRestaurentsByRating = await fetchAllRestaurentsByRating();

    if (getAllRestaurentsByRating.length === 0) {
      res.status(404).json({
        message: 'Restaurents not found',
      });
    }

    res.status(200).json({
      restaurents: getAllRestaurentsByRating,
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
});

async function fetchAllDishes() {
  let query = 'SELECT * FROM dishes';
  let response = await db.all(query, []);

  return response;
}
app.get('/dishes', async (req, res) => {
  try {
    let getAllDishes = await fetchAllDishes();

    if (getAllDishes.length === 0) {
      res.status(404).json({
        message: 'Dishes not found',
      });
    }

    res.status(200).json({
      dishes: getAllDishes,
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
});

async function fetchAllDisheById(id) {
  let query = 'SELECT * FROM dishes WHERE id = ?';
  let response = await db.all(query, [id]);

  return response;
}
app.get('/dishes/details/:id', async (req, res) => {
  let id = req.params.id;
  try {
    let getAllDisheById = await fetchAllDisheById(id);

    if (getAllDisheById.length === 0) {
      res.status(404).json({
        message: 'Dishe not found for ID :' + id,
      });
    }

    res.status(200).json({
      dishe: getAllDisheById,
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
});

async function filterAllDishes(isVeg) {
  let query = 'SELECT * FROM dishes WHERE isVeg = ?';
  let response = await db.all(query, [isVeg]);

  return response;
}
app.get('/dishes/filter', async (req, res) => {
  let isVeg = req.query.isVeg;
  try {
    let getAllDishes = await filterAllDishes(isVeg);

    if (getAllDishes.length === 0) {
      res.status(404).json({
        message: 'Dishes not found',
      });
    }

    res.status(200).json({
      dishe: getAllDishes,
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
});

async function fetchAllSortedDishes() {
  let query = 'SELECT * FROM dishes ORDER BY price';
  let response = await db.all(query, []);

  return response;
}
app.get('/dishes/sort-by-price', async (req, res) => {
  try {
    let getAllSortedDishes = await fetchAllSortedDishes();

    if (getAllSortedDishes.length === 0) {
      res.status(404).json({
        message: 'Dishes not found',
      });
    }

    res.status(200).json({
      dishes: getAllSortedDishes,
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
});
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

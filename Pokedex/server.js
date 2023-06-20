const express = require("express")

const app = express()

const Pokemon = require('./models/pokemon.js');

app.set("view engine", "ejs" )

app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));



// Index 
app.get("/pokemon", (req, res) => {
    const shuffledPokemon = Pokemon.sort(() => 0.5 - Math.random())
    const randomPokemon = shuffledPokemon.slice(0, 16);
    res.render("index.ejs", { data: Pokemon});
});

// Show
app.get("/pokemon/:id", (req, res) => {
    const pokemon = Pokemon[req.params.id]
    res.render("show.ejs", { pokemon });
})

// New
app.get("/pokemon/new", (req, res) => {
    res.render("new.ejs")
})

// Edit
app.get("/pokemon/:id/edit", (req, res) => {
    const pokemon = Pokemon[req.params.id];
    res.render("edit.ejs", { pokemon })
});

//Create
app.post("/pokemon/", (req, res) => {
    const newPokemon = req.body;
        Pokemon.push(newPokemon);
        res.redirect("/pokemon")
    });

//Update
app.put("/pokemon/:id", (req, res) => {
    const updatedPokemon = req.body;
    res.redirect(`/pokemon/${req.params.id}`);
});
// Delete
app.delete("/pokemon/:id", (req, res) => {
    res.redirect("/pokemon")
});

app.get('/', (req, res) => {
    res.redirect('/pokemon');
  });

app.listen(3500, () => {
    console.log("listening")
});
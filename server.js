const express = require("express");
const path = require('path'); //a node native module
const {Restaurant, Item, Menu} = require('./models/index');

const app = express();
const port = 3000;

//Q: What does express.static help us do?
//A: access/serve the statis html and style folder.
//Q: What do you think path.join helps us do?
//A: this will join all strings into a single path.

app.use(express.static(path.join(__dirname, 'public')))


// Add this boilerplate middleware to successfully use req.body
app.use(express.json())
//will add routes
//client > request url > url > http request > http response

//will add routes
app.get('/item', async (req, res) => {
    const allItems = await Item.findAll();
    res.json(allItems);
})
app.get('/flipcoin', async (req, res) => {
    const coinflip = !Math.floor(Math.random() * 2) ? 'Heads' : 'Tails'
    res.send(coinflip);
})
app.get('/item/:id', async (req, res) => {
    const allItems = await Item.findByPk(req.params.id);
    res.json(allItems);
})
app.get('/restaurant', async (req, res) => {
    const item = await Restaurant.findAll();
    res.json(item);
});
app.get('/restaurant/:id', async (req, res) => {
    const item = await Restaurant.findByPk(req.params.id, {include:Menu});
    res.json(item);
});
app.get('/menu', async (req, res) => {
    const menu = await Menu.findAll();
    res.json(menu);
});
app.get('/menu/:id', async (req, res) => {
    const menu = await Menu.findByPk(req.params.id, {include:Item});
    res.json(menu);
});

// app.get('/restaurant/:id', async (req, res) => {
//     const item = await Restaurant.findByPk(req.params.id, {include:Menu });
//     res.json(item);
// });
//Q: What will our server be doing?
//A: start server listing on port:3000, and displays the clog message

// Add new restaurant
app.post('/restaurant', async (req, res) => {
	let newRestaurant = await Restaurant.create(req.body);
	res.send('Created!')
})

// Delete a restaurant

app.delete('/restaurant/:id', async (req, res) => {
	await Restaurant.destroy({
		where : {id : req.params.id} // Destory a restaurant where this object matches
	})
	res.send("Deleted!!")
})

// Update a restaurant
app.put("/restaurant/:id", async (req, res) => {
	let updated = await Restaurant.update(req.body, {
		where : {id : req.params.id} // Update a restaurant where the id matches, based on req.body
	})
	res.send("Updated!!")
})
app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});

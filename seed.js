const {sequelize} = require('./db')
const {Restaurant, Menu, Item} = require('./models/index') 
//Q: WHY import these models from index vs. from each separate model file?
//A: because they were updated in the index to have more func or ability so need to ref the updated versions and not the base.

//Q: Why do you think each object inside of the arrays are structured the way that they are?
//A: because they are an Obj containing key:value pairs.

//Q: What do you think will happen when we 'seed' this file?
//A: if refer to the function, it will get obj array and added them to the tables associated with.
const seedRestaurant = [
  {
    name: 'AppleBees',
    location: 'Texas',
    cuisine: 'FastFood'
  },
  {
    name: 'LittleSheep',
    location: 'Dallas',
    cuisine: 'Hotpot'
  },
  {
    name: 'Spice Grill',
    location: 'Houston',
    cuisine: 'Indian'
  },
  {
    name: 'burgetking',
    location: 'Dallas',
    cuisine: 'Hotpot'
  },
  {
    name: 'MCDS',
    location: 'Dallas',
    cuisine: 'Hotpot'
  },
]
const seedMenu = [
  {
    title: 'Breakfast',
    RestaurantId : 1,
  },
  {
    title: 'Lunch',
    RestaurantId : 2,
  },
  {
    title: 'Dinner',
    RestaurantId : 3,
  },
]
const seedItem = [
  {
    name: 'bhindi masala',
    image: 'someimage.jpg',
    price: 9.50,
    vegetarian: true,
    MenuId : 3,
  },
  {
    name: 'egusi soup',
    image: 'someimage.jpg',
    price: 10.50,
    vegetarian: false,
    MenuId : 2,
  },
  {
    name: 'hamburger',
    image: 'someimage.jpg',
    price: 6.50,
    vegetarian: false,
    MenuId : 1,
  }
]

//Q: Try to decifer the following function.
//A: this will bulk grab each obj in the array(s) and add them to the correct table.
//Q: Why are we using async and await?
//A: unknown time frame to create or add to tables so async will do the delays and error if there is an issue.
const seed = async () => {
  try {
    await sequelize.sync({force: true})
    await Restaurant.bulkCreate(seedRestaurant, {validate: true})
    await Menu.bulkCreate(seedMenu, {validate: true})
    await Item.bulkCreate(seedItem, {validate: true})
    console.log('Seeding success!')
    sequelize.close()
  } catch (error) {
    console.log('SOMETHING WENT WRONG WITH THE SEEDING: ', error)
  }
}

//Q: What is seed() returning?
//A:  Seeding success, or on error error messages.
seed()
    .then(() => {
      console.log('Seeding success!')
    })
    .catch(err => {
      console.error('Oh noes! Something went wrong!')
      console.error(err)
    })


# Esmeralda Pokedex

## Description

Esmeralda Pokedex is a web application that allows users to explore information about Pokémon, search for their favorites, and mark them as such. The project is comprised of a backend developed with Node.js and Express, serving the data of Pokémon, and a frontend implemented in Vue.js, providing an interactive and user-friendly interface.

## Features

- **Pokémon List**: Browse all available Pokémon in the Pokédex.
- **Search**: Find Pokémon by their name or ID.
- **Favorites**: Mark your preferred Pokémon as favorites.

## Technologies

- **Backend**: Node.js, Express
- **Frontend**: Vue.js
- **Database**: MongoDB
- **Pokémon API**: Uses PokeAPI to fetch Pokémon data.
pokedex_user
## Prerequisites

To run this project, you need to have installed:

- Node.js (https://nodejs.org/)
- npm (comes with Node.js)
- MongoDB (https://www.mongodb.com/)

## Installation and Execution

### Clone the Repository

git clone https://github.com/esmemag96/pokedex.git
cd pokedex

### Install Dependencies

#### Backend (API)
```
cd api
npm install
```
#### Frontend (Vue.js)
```
cd pokedex
npm install
```

### Run the Application

At the project root, run:
```
npm start
```
This command will start both the backend (API) and the frontend simultaneously, thanks to `concurrently`.


## Accessing the Application

Once the application is running, you can access the Esmeralda Pokedex interface in your web browser at:

http://localhost:8080/


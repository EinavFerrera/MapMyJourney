<h2 align="center">
  Map My Journey <br/>
  <!-- update -->
  <a href="https://einavferrera-portfolio.web.app/" target="_blank">MapMyJourney.web</a>
</h2>
<div align="center">
  <!-- update -->
  <img alt="Demo" src="./Images/readme-img-mockup.png" />
</div>

<br/>

<center>

[![forthebadge](https://forthebadge.com/images/badges/built-with-love.svg)](https://forthebadge.com) &nbsp;
[![forthebadge](https://forthebadge.com/images/badges/made-with-javascript.svg)](https://forthebadge.com) &nbsp;
[![forthebadge](https://forthebadge.com/images/badges/open-source.svg)](https://forthebadge.com) &nbsp;
![GitHub Repo stars](https://img.shields.io/github/stars/EinavFerrera/MapMyJourney?color=red&logo=github&style=for-the-badge)
![GitHub forks](https://img.shields.io/github/forks/EinavFerrera/MapMyJourney?color=red&logo=github&style=for-the-badge)

</center>

<h3 align="center">
    🔹
    <a href="https://github.com/EinavFerrera/MapMyJourney/issues">Report Bug</a> &nbsp; &nbsp;
    🔹
    <a href="https://github.com/EinavFerrera/MapMyJourney/issues">Request Feature</a>
</h3>

## Built With

  <!-- update -->

An interactive web application for tracking the countries visited by you, your family, and friends. Plan your next destination with ease by keeping a visual record of everyone's travels.

- **Frontend:** EJS templates, HTML, CSS
- **Backend:** Node.js, Express.js
- **Database:** PostgreSQL
- **Development Tools:** VsCode, Firebase

## Features

**🗺️ Dynamic Map:** Visualize visited countries on an interactive map.
**👨‍👩‍👧‍👦 Family and Friends Tracking:** Add and track countries visited by multiple users.
**👥 User Management:** Easily add or update family members and friends.
**💾 Database Integration:** Utilizes PostgreSQL for storing user and country data.

## Getting Started

Follow these instructions to set up and run the project locally.

### Prerequisites

- Node.js
- PostgreSQL

### 🛠 Installation and Setup Instructions

1. **Clone the repository:**

   ```bash
   git clone https://github.com/EinavFerrera/MapMyJourney.git
   cd MapMyJourney
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Set up the database:**

   - Ensure PostgreSQL is installed and running locally.
   - Create a PostgreSQL database and user.
   - Update the database connection details in the code (e.g., user, host, database, password, port).

4. **Run the application:**

   ```bash
   npm start
   ```

   The application will be running at [http://localhost:3000](http://localhost:3000).

### 🛠 Database Initialization

To initialize the PostgreSQL database, you can use the provided `queries.sql` file located in the project root. This file contains the SQL commands to create the necessary tables and seed initial data.

## API Endpoints

- **GET /**: Home page displaying the map.
- **GET /welcome**: Welcome page to add initial family member.
- **POST /add**: Add a country to the visited list.
- **POST /user**: Select a user or view all family members.
- **POST /new**: Add a new family member.

## Show Your Support

Give a ⭐ if you like this project!

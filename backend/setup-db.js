const { Client } = require('pg');

async function setupDatabase() {
  const client = new Client({
    connectionString: 'postgresql://localhost:5432/postgres'
  });

  try {
    await client.connect();
    console.log('Connected to PostgreSQL');

    // Create database if it doesn't exist
    await client.query('CREATE DATABASE figure_lunch');
    console.log('Database "figure_lunch" created successfully');
  } catch (error) {
    if (error.code === '42P04') {
      console.log('Database "figure_lunch" already exists');
    } else {
      console.error('Error creating database:', error.message);
    }
  } finally {
    await client.end();
  }

  // Now connect to the new database and create tables
  const dbClient = new Client({
    connectionString: 'postgresql://localhost:5432/figure_lunch'
  });

  try {
    await dbClient.connect();
    console.log('Connected to figure_lunch database');

    // Create restaurants table
    await dbClient.query(`
      CREATE TABLE IF NOT EXISTS restaurants (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Create votes table
    await dbClient.query(`
      CREATE TABLE IF NOT EXISTS votes (
        id SERIAL PRIMARY KEY,
        restaurant_id INTEGER REFERENCES restaurants(id),
        rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Insert sample restaurants
    const sampleRestaurants = [
      'Pizza Palace',
      'Burger Barn',
      'Sushi Station',
      'Taco Truck',
      'Salad Bar',
      'Noodle House',
      'Steak House',
      'Cafe Corner'
    ];

    for (const name of sampleRestaurants) {
      await dbClient.query(
        'INSERT INTO restaurants (name) VALUES ($1) ON CONFLICT DO NOTHING',
        [name]
      );
    }

    console.log('Database setup complete!');
    console.log('Sample restaurants added:', sampleRestaurants.length);
  } catch (error) {
    console.error('Error setting up database:', error.message);
  } finally {
    await dbClient.end();
  }
}

setupDatabase();

const knex = require('knex');
const path = require('path');

const db = knex({
    client: 'sqlite3',
    connection: {
        filename: path.join(__dirname, 'database.sqlite')
    },
    useNullAsDefault: true,
});

async function setupDatabase() {
    try {
        console.log('Setting up SQLite database...');

        // Create restaurants table
        await db.schema.createTableIfNotExists('restaurants', (table) => {
            table.increments('id').primary();
            table.string('name').notNullable();
            table.timestamp('created_at').defaultTo(db.fn.now());
        });

        // Create votes table
        await db.schema.createTableIfNotExists('votes', (table) => {
            table.increments('id').primary();
            table.integer('restaurant_id').unsigned().references('id').inTable('restaurants');
            table.integer('rating').notNullable();
            table.timestamp('created_at').defaultTo(db.fn.now());
        });

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

        // Check if restaurants already exist
        const existingRestaurants = await db('restaurants').select('name');
        const existingNames = existingRestaurants.map(r => r.name);

        for (const name of sampleRestaurants) {
            if (!existingNames.includes(name)) {
                await db('restaurants').insert({ name });
            }
        }

        console.log('✅ Database setup complete!');
        console.log(`📝 Added ${sampleRestaurants.length} sample restaurants`);
        
        // Show what we created
        const restaurants = await db('restaurants').select('*');
        console.log('🍽️  Restaurants in database:');
        restaurants.forEach(r => console.log(`   - ${r.name} (ID: ${r.id})`));

    } catch (error) {
        console.error('❌ Error setting up database:', error);
    } finally {
        await db.destroy();
    }
}

setupDatabase();

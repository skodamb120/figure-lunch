import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import voteRoutes from './routes/voteRoutes';
import restaurantRoutes from './routes/restaurantRoutes';

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Mount routers
app.use('/vote', voteRoutes);
app.use('/restaurants', restaurantRoutes);

app.listen(3000, () => console.log('Backend running on port 3000'));

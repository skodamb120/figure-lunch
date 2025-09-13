import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { createServer } from 'http';
import voteRoutes from './routes/voteRoutes';
import restaurantRoutes from './routes/restaurantRoutes';
import websocketService from './websocket/websocketServer';

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Mount routers
app.use('/vote', voteRoutes);
app.use('/restaurants', restaurantRoutes);

const server = createServer(app);

// Initialize WebSocket server
websocketService.initialize(server);

server.listen(3000, () => console.log('Backend running on port 3000'));

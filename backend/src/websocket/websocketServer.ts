import { WebSocketServer, WebSocket } from 'ws';
import { Server } from 'http';
import eventBus from '../events/eventBus';

class WebSocketService {
  private wss: WebSocketServer | null = null;
  private clients: Set<WebSocket> = new Set();

  initialize(server: Server) {
    this.wss = new WebSocketServer({ server });
    
    this.wss.on('connection', (ws: WebSocket) => {
      console.log('New WebSocket connection');
      this.clients.add(ws);
      
      ws.on('close', () => {
        console.log('WebSocket connection closed');
        this.clients.delete(ws);
      });
      
      ws.on('error', (error) => {
        console.error('WebSocket error:', error);
        this.clients.delete(ws);
      });
    });

    // Listen for vote events and broadcast to all clients
    eventBus.on('vote', (data) => {
      this.broadcast({
        type: 'vote',
        data: data
      });
    });
  }

  private broadcast(message: any) {
    const messageStr = JSON.stringify(message);
    this.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(messageStr);
      }
    });
  }
}

export default new WebSocketService();

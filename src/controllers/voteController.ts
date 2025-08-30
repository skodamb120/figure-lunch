import { db } from '../db/knex';
import eventBus from '../events/eventBus';
import { Request, Response } from 'express';


export async function submitVote(req: Request, res: Response) {
    const { restaurantId, rating } = req.body;
    try {
        const [vote] = await db('votes')
            .insert({ restaurant_id: restaurantId, rating })
            .returning('*');

        // Emit vote event
        eventBus.emit('vote', { restaurantId, rating });
        res.send({ status: 'ok', vote });
    } catch (err) {
        console.error(err);
        res.status(500).send({ error: 'DB error' });
    }
}

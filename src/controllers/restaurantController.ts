import { db } from '../db/knex';
import { Request, Response } from 'express';

export async function getRestaurants(req: Request, res: Response) {
    try {
        const restaurants = await db('restaurants as r')
            .leftJoin('votes as v', 'r.id', 'v.restaurant_id')
            .groupBy('r.id')
            .select(
                'r.id',
                'r.name',
                db.raw('COUNT(v.id) as votes'),
                db.raw('COALESCE(AVG(v.rating),0) as average_rating')
            )
            .orderBy('r.id');

        res.send(restaurants);
    } catch (err) {
        console.error(err);
        res.status(500).send({ error: 'DB error' });
    }
}

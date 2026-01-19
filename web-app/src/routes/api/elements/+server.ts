import type { RequestHandler } from './$types';
import clientPromise from '$lib/mongodb-client';
import { json } from '@sveltejs/kit';

export const GET: RequestHandler = async ({ url }) => {
	const query = url.searchParams.get('q') ?? '';

	const dbConnection = await clientPromise;
	const db = dbConnection.db('infinite-craft');
	const collection = db.collection('recipes');
	const elements_cursor = collection.aggregate([
		{
			// Match documents where `result.name` contains the search term
			$match: {
				'result.name': { $nin: ['Water', 'Fire', 'Earth', 'Wind', 'Nothing'] }
			}
		},
		{
			// Match documents where `result.name` contains the search term
			$match: {
				'result.name': { $regex: query, $options: 'i' }
			}
		},
		{
			// De-duplicate documents based on a combination of `result.name` and a boolean flag for starting match
			$group: {
				_id: { name: '$result.name', emoji: '$result.emoji' }
				// No need to add any other fields as result.name and emoji are unique together
			}
		},
		{
			// Project desired fields and add a position score

			$project: {
				name: '$_id.name',
				emoji: '$_id.emoji',
				isStartingMatch: {
					$regexMatch: { input: '$_id.name', regex: '^' + query, options: 'i' }
				}, // True if starts with query
				_id: 0 // Exclude automatically generated _id
			}
		},
		{
			// Sort by starting match flag (true first), then by position score (lower is better), and finally by name within each score
			$sort: {
				isStartingMatch: -1, // Descending, true first (starting matches on top)
				name: 1 // Within each category, sort alphabetically
			}
		},
		{
			$limit: 1000
		}
	]);

	const elements = await elements_cursor.toArray();

	return json(elements);
};

import { createError, getRouterParam } from 'h3';

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id');
  const { houses } = await import('~~/server/data/houses');

  const house = houses.find((h) => h.id === id);
  if (!house) {
    throw createError({ statusCode: 404, statusMessage: 'House not found' });
  }

  return house;
});


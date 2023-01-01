import { rest } from 'msw';

import { votingData } from '../data/votingData';

export const getVoting = rest.get('/vote', (req, res, ctx) => {
  const search_vote_id = Number(req.url.searchParams.get('vote_id'));
  const voting_list = votingData.filter(({ vote_id }) => search_vote_id === vote_id);
  return res(ctx.json(voting_list[0]));
});

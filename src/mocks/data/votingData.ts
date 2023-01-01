import { VotingInfo } from '../../types/voting';

export const votingData: VotingInfo[] = [
  {
    vote_id: 1,
    user_id: 10,
    vote_status: false,
    vote_title: 'Happhee의 사진을 골라죠💛',
    pictures: ['url1', 'url2'],
    current_vote: 12,
    maximum_vote: 2000,
    created_date: new Date('2023-01-12'),
  },
  {
    vote_id: 2,
    user_id: 10,
    vote_status: false,
    vote_title: 'Happhee의 사진을 골라죠💛💛',
    pictures: ['url1', 'url2'],
    current_vote: 12,
    maximum_vote: 2000,
    created_date: new Date('2023-01-12'),
  },
];

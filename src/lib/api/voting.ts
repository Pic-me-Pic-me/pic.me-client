import { AxiosResponse } from 'axios';
import useSWR from 'swr';

import { client } from '../axios';
import { VotingInfo } from './../../types/voting';

export const postVoteData = (votingData: VotingInfo, token?: string) => client.post('/vote', votingData);

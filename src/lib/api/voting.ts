import { client } from '../axios';
import { StickerInfo, VotingInfo } from './../../types/voting';

export const postStickerData = (stickerInfo: StickerInfo) => client.post('/sticker', stickerInfo);

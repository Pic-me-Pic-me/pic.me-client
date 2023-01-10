import { client } from '../axios';
import { StickerInfo } from './../../types/vote';

export const postStickerData = (stickerInfo: StickerInfo) => client.post('/sticker', stickerInfo);

export interface PicMeResponse<T> {
  data?: T;
  status: number;
  success: boolean;
  message: string;
}

export type WithTimestamps = {
  createdAt: Date;
  updatedAt: Date;
};

export type IResponseShape<T> = {
  success: boolean;
  message?: string;
  data?: T;
  error?: T;
};

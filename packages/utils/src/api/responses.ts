export type IResponseShape<T> = {
  success: boolean;
  message?: string;
  data?: T;
  error?: T;
};

export const Success = <T>(message: string, data?: T): IResponseShape<T> => {
  return data
    ? {
        success: true,
        message,
        data,
      }
    : { success: true, message };
};

export const Fail = <T>(message: string, error?: T): IResponseShape<T> => {
  return error
    ? {
        success: false,
        message,
        error,
      }
    : { success: false, message };
};

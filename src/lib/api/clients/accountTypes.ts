export interface AccountSignupRequest {
  email: string;
  password: string;
}

export interface ExecutionResultResponse<T> {
  result: T;
  isSuccess: boolean;
  message: string;
}

export interface AccountInfo {
  id: number;
  email: string;
  createdAtUtc: Date;
  updatedAtUtc: Date;
}
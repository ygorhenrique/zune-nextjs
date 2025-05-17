// lib/api/clients/stockClient.ts
import { apiClient } from './apiClient';
import { AccountInfo, AccountRequest, ExecutionResultResponse } from './accountTypes';

export const accountClient = {
  async signup(signupRequest: AccountRequest): Promise<ExecutionResultResponse<AccountInfo>> {
    try {

      const url = `https://api.zune.money/v2/account/signup`;
      const response = await apiClient.post<ExecutionResultResponse<AccountInfo>, AccountRequest>(url, signupRequest);

      return response;
    } catch (error) {
      console.error(`Error sign-up for ${signupRequest.email}:`, error);
      throw error;
    }
  },

  async login(loginRequest: AccountRequest): Promise<ExecutionResultResponse<AccountInfo>> {
    try {

      const url = `https://api.zune.money/v2/account/login`;
      const response = await apiClient.post<ExecutionResultResponse<AccountInfo>, AccountRequest>(url, loginRequest);

      return response;
    } catch (error) {
      console.error(`Error login for ${loginRequest.email}:`, error);
      throw error;
    }
  },
};
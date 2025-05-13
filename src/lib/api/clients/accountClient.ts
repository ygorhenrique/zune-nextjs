// lib/api/clients/stockClient.ts
import { apiClient } from './apiClient';
import { AccountInfo, AccountSignupRequest, ExecutionResultResponse } from './accountTypes';

export const accountClient = {
  async signup(signupRequest: AccountSignupRequest): Promise<ExecutionResultResponse<AccountInfo>> {
    try {
      const outputSize = 'compact';
      const url = `https://localhost:5001/v2/account/signup`;
      const response = await apiClient.post<ExecutionResultResponse<AccountInfo>, AccountSignupRequest>(url, signupRequest);

      return response;
    } catch (error) {
      console.error(`Error sign-up for ${signupRequest.email}:`, error);
      throw error;
    }
  },
};
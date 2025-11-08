export enum Status {
  IDLE = 'IDLE',
  LOADING = 'LOADING',
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR',
}

export interface ExplanationResponse {
  explanation: string;
  category: string;
  tags: string[];
}

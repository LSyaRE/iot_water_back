export interface GenericResponseDto {
  message: string;
  errors?: string[];
  data?: any;
  timestamp: Date;
}

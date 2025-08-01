// 代码生成时间: 2025-08-01 08:55:29
import { Injectable } from '@angular/core';

// 定义一个接口来描述API响应的结构
interface ApiResponse<T> {
  data: T;
  message: string;
  status: number;
  error?: any;
}

// ApiResponseFormatterService 类用于格式化API响应
@Injectable({
  providedIn: 'root'
})
export class ApiResponseFormatterService {

  constructor() {}

  /**
   * 格式化API响应，使其更易于在前端应用中使用。
   * @param response 原始API响应对象。
   * @param dataKey 从响应中提取数据的键。
   * @param messageKey 从响应中提取消息的键。
   * @param statusKey 从响应中提取状态码的键。
   * @returns 格式化后的响应对象。
   */
  formatResponse<T>(response: any, dataKey: string = 'data', messageKey: string = 'message', statusKey: string = 'status'): ApiResponse<T> {
    try {
      // 提取数据、消息和状态码
      const formattedResponse: ApiResponse<T> = {
        data: response[dataKey],
        message: response[messageKey],
        status: response[statusKey]
      };

      // 如果存在错误，则添加到响应中
      if (response.error) {
        formattedResponse.error = response.error;
      }

      return formattedResponse;
    } catch (error) {
      // 错误处理：返回一个带有错误信息的响应对象
      console.error('Error formatting response:', error);
      return {
        data: null,
        message: 'Error formatting response',
        status: 500,
        error: error
      };
    }
  }
}

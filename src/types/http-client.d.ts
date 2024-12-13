
interface IHttpRequestConfig extends RequestInit {
  baseURL?: string;
  url?: string;
  params?: any;
  method?: Method;
}

// interface IHttpResponse<T = any> {
//   data: T;
//   status: number;
//   statusText: string;
//   headers: any;
//   config: IHttpRequestConfig;
//   request?: any;
// }

// interface IHttpInterceptorManager<V> {
//   use<T = V>(onFulfilled?: (value: V) => T | Promise<T>, onRejected?: (error: any) => any): number;
//   //eject(id: number): void;
// }

interface IHttpClient {
  defaults: { baseUrl: string; headers: { common: any } };
  interceptors: {
    // request: IHttpInterceptorManager<IHttpRequestConfig>,
    // response: IHttpInterceptorManager<IHttpResponse>,
    request: {
      use(onFulfilled?: (...args: any) => any): void;
    };
    response: {
      use(
        onFulfilled?: (...args: any) => any,
        onRejected?: (...args: any) => any
      ): void;
    };
  };
  // ?? not sure want to wrap response in a custom object, like so ??
  // request<T = any, R = IHttpResponse<T>>(url: string, config?: IHttpRequestConfig): Promise<R>;
  get<T = any>(url: string, config?: IHttpRequestConfig): Promise<T>;
  delete<T = any>(url: string, config?: IHttpRequestConfig): Promise<T>;
  head<T = any>(url: string, config?: IHttpRequestConfig): Promise<T>;
  options<T = any>(url: string, config?: IHttpRequestConfig): Promise<T>;
  post<T = any>(
    url: string,
    data?: any,
    config?: IHttpRequestConfig
  ): Promise<T>;
  put<T = any>(
    url: string,
    data?: any,
    config?: IHttpRequestConfig
  ): Promise<T>;
  patch<T = any>(
    url: string,
    data?: any,
    config?: IHttpRequestConfig
  ): Promise<T>;
}
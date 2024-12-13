/** HTTP Client
 * This library is an attempt to make a HTTP client wrapper that closely matches axios
 * but with Fetch API
 */

/* eslint-disable @typescript-eslint/no-explicit-any */
export type Method =
  | "get"
  | "GET"
  | "delete"
  | "DELETE"
  | "head"
  | "HEAD"
  | "options"
  | "OPTIONS"
  | "post"
  | "POST"
  | "put"
  | "PUT"
  | "patch"
  | "PATCH"
  | "purge"
  | "PURGE"
  | "link"
  | "LINK"
  | "unlink"
  | "UNLINK";

/** Fetch Http Client wrapper to impersonate Axios */
class HttpClient implements IHttpClient {
  private _requestConfig: (...args: any) => any;
  private _success: (...args: any) => any; // | NonNullable<V>;
  private _failure: (...args: any) => any;

  constructor() {
    this._requestConfig = () => { }; // eslint-disable-line
    this._success = () => { }; // eslint-disable-line
    this._failure = () => { }; // eslint-disable-line
  }

  public defaults = {
    baseUrl: "/",
    headers: {
      common: {} as Record<string, string>,
    },
  };

  public interceptors = {
    request: {
      use: (onFulfilled?: (...args: any) => any) => {
        if (onFulfilled) this._requestConfig = onFulfilled;
      },
    },
    response: {
      use: (
        onFulfilled?: (...args: any) => any,
        onRejected?: (...args: any) => any
      ) => {
        if (onFulfilled) this._success = onFulfilled;
        if (onRejected) this._failure = onRejected;
      },
    },
  };

  /** Sends a HTTP request using the GET verb */
  public async get<T = any>(
    url: string,
    config?: IHttpRequestConfig
  ): Promise<T> {
    let requestConfig: IHttpRequestConfig = await this._requestConfig({
      url: url,
      baseURL: this.defaults.baseUrl,
      method: "GET",
    });

    if (config) {
      if (config.method) delete config.method;
      requestConfig = Object.assign(requestConfig, config);
    }

    return this.sendAsync(url, undefined, requestConfig);
  }

  /** Sends a HTTP request using the DELETE verb */
  public async delete<T = any>(
    url: string,
    config?: IHttpRequestConfig
  ): Promise<T> {
    let requestConfig: IHttpRequestConfig = await this._requestConfig({
      url: url,
      baseURL: this.defaults.baseUrl,
      method: "DELETE",
    });
    if (config) {
      if (config.method) delete config.method;
      requestConfig = Object.assign(requestConfig, config);
    }

    return this.sendAsync(url, undefined, requestConfig);
  }

  /** Sends a HTTP request using the HEAD verb */
  public async head<T = any>(
    url: string,
    config?: IHttpRequestConfig
  ): Promise<T> {
    let requestConfig: IHttpRequestConfig = await this._requestConfig({
      url: url,
      baseURL: this.defaults.baseUrl,
      method: "HEAD",
    });
    if (config) {
      if (config.method) delete config.method;
      requestConfig = Object.assign(requestConfig, config);
    }

    return this.sendAsync(url, undefined, requestConfig);
  }

  /** Sends a HTTP request using the OPTIONS verb */
  public async options<T = any>(
    url: string,
    config?: IHttpRequestConfig
  ): Promise<T> {
    let requestConfig: IHttpRequestConfig = await this._requestConfig({
      url: url,
      baseURL: this.defaults.baseUrl,
      method: "OPTIONS",
    });
    if (config) {
      if (config.method) delete config.method;
      requestConfig = Object.assign(requestConfig, config);
    }

    return this.sendAsync(url, undefined, requestConfig);
  }

  /** Sends a HTTP request using the POST verb */
  public async post<T = any>(
    url: string,
    data?: unknown,
    config?: IHttpRequestConfig
  ): Promise<T> {
    let requestConfig: IHttpRequestConfig = await this._requestConfig({
      url: url,
      baseURL: this.defaults.baseUrl,
      method: "POST",
    });
    if (config) {
      if (config.method) delete config.method;
      requestConfig = Object.assign(requestConfig, config);
    }

    return this.sendAsync(url, data, requestConfig);
  }

  /** Sends a HTTP request using the PUT verb */
  public async put<T = any>(
    url: string,
    data?: any,
    config?: IHttpRequestConfig
  ): Promise<T> {
    let requestConfig: IHttpRequestConfig = await this._requestConfig({
      url: url,
      baseURL: this.defaults.baseUrl,
      method: "PUT",
    });
    if (config) {
      if (config.method) delete config.method;
      requestConfig = Object.assign(requestConfig, config);
    }

    return this.sendAsync(url, data, requestConfig);
  }

  /** Sends a HTTP request using the PATCH verb */
  public async patch<T = any>(
    url: string,
    data?: any,
    config?: IHttpRequestConfig
  ): Promise<T> {
    let requestConfig: IHttpRequestConfig = await this._requestConfig({
      url: url,
      baseURL: this.defaults.baseUrl,
      method: "PATCH",
    });
    if (config) {
      if (config.method) delete config.method;
      requestConfig = Object.assign(requestConfig, config);
    }

    return this.sendAsync(url, data, requestConfig);
  }

  // ==== Private Methods ====
  private paramsSerializer(params: any): string {
    const p = new Array<string>();
    Object.entries(params).forEach((x) => {
      const key = x[0] as string;
      const value = x[1] as string | number | boolean;
      if (value) p.push(`${encodeURIComponent(key)}=${value}`);
    });
    if (p.length > 0) return `?${p.join("&")}`;
    return "";
  }

  private async sendAsync(
    url: string,
    data: unknown,
    config: IHttpRequestConfig
  ): Promise<any> {
    const headers = {} as Record<string, string>;
    Object.entries(this.defaults.headers.common).forEach((k) => {
      headers[k[0]] = k[1] as string;
    });

    if (config.params) url += this.paramsSerializer(config.params);

    if (!url.startsWith("http")) url = `${this.defaults.baseUrl}${url}`;

    if (data instanceof FormData) {
      config.body = data;
      if (config.headers) {
        const headers = new Headers(config.headers);
        headers.delete("content-type");
        config.headers = headers;
      }
    } else if (data && typeof data === "object")
      config.body = JSON.stringify(data);

    return new Promise((resolve, reject) => {
      fetch(url, {
        headers,
        ...config,
      })
        .then(async (resp) => {
          if (!resp.ok) {
            this._failure(resp);
            switch (resp.status) {
              case 400:
                reject("Validation error");
                break;
              case 401:
                reject("401 (Unathorized)");
                break;
              case 500:
                reject("Server error");
                break;
              default:
                console.error(resp);
                break;
            }
            return;
          }

          this._success({ response: { status: resp.status } });
          //resp.headers.forEach((v, k) => console.log(`${k}: ${v}`));
          if (
            resp.headers
              .get("content-type")
              ?.includes("application/octet-stream")
          )
            return await resp.blob();

          if (resp.headers.get("content-type")?.includes("application/json")) {
            return await resp.json();
          }
          return await resp.text();
        })
        .then((d) => resolve(d));
    });
  }
}

export default new HttpClient();

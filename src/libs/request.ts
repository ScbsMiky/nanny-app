export type RequestResponseType = "json" | "text";

export interface RequestOptions<T extends RequestResponseType> {
  method?: "GET" | "POST";

  responseType?: T;
  
  body?: any;
  params?: Record<string, any>;
  headers?: Record<string, any>;
};

export type RequestResponse<T extends RequestResponseType = "json"> = Promise<T extends "json" ? Record<string,any> : string>; 

export default async function request<T extends RequestResponseType>(url: string, options: Partial<RequestOptions<T>> = { }) {
  return new Promise<RequestResponse<T>>(async(resolve, reject) => {
    try {
      if(options.params) {
        url = `${url}?${Object.keys(options.params).map((key) => `${key}=${options.params![key]}`).join("&")}`;
      };

      if(options.method != "GET" && !(options.body instanceof FormData)) {
        options.headers = { "Content-Type": "application/json", "Accept": "application/json", ...(options.headers) };
        
        if(options.body && typeof options.body == "object") {
          options.body = JSON.stringify(options.body);
        };
      };

      resolve(await fetch(url, { headers: options.headers, method: options.method, body: options.body }).then((response) => response[(options.responseType == "text" ? "text" : "json")]( )));
    } catch (error: any) {
      reject(error);
    };
  });
};
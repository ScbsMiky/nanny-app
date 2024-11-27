import { useState } from "react";

import request, { RequestOptions, RequestResponseType } from "../../libs/request";

export let apiUrl = "http://192.168.1.2:3000";

export type UseRequestProps<T extends RequestResponseType, U> = {
  url: string;
  state: U;
  onError?: (error: string) => void;
  onFinish?: (error?: string, content?: U) => void;
  onContent?: (content: U) => void;
} & RequestOptions<T>

export default function useRequest<T extends RequestResponseType, U>(options: UseRequestProps<T, U>) {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [content, setContent] = useState(options.state);

  const self = {
    error,
    loading,
    content,
    options,

    setError(error: string) {
      setError(error);
    },

    setLoading(loading: boolean) {
      setLoading(loading);
    },

    onError(error: string) {
      if(typeof self.options.onError == "function") {
        self.options.onError(error);
      };
    },

    onFinish(error?: string, content?: U) {
      if(typeof self.options.onFinish == "function") {
        self.options.onFinish(error, content);
      };
    },

    onContent(content: U) {
      if(typeof self.options.onContent == "function") {
        self.options.onContent(content);
      };
    },

    async refresh( ) {
      return this.submit(this.options);
    },

    async submit(options: Partial<UseRequestProps<T, U>> = { }) {
      self.options = { ...self.options, ...options };

      setError("");
      setLoading(true);

      return request(self.options.url, self.options)
        .then((data) => {
          if(typeof data == "object" && data.error) {
            setError(data.error);
            self.onError(data.error);
            return;
          };

          setContent(data as U);
          self.onContent(data as U);
        })
        .catch((error) => {
          setError(error.message);
          self.onError(error.message);
        })
        .finally(( ) => {
          setLoading(false);
          self.onFinish(error, content);
        });
    }
  };

  return self;
};
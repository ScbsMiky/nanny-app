import AsyncStorage from "@react-native-async-storage/async-storage";

import { Dispatch, SetStateAction, useEffect, useState } from "react";

usePersisted.anyToString = function(item: any) {
  if(typeof item == "object") {
    if(item == null) {
      return "null";
    };

    return JSON.stringify(item);
  };

  return `${item}`;
};

usePersisted.stringToJson = function(item: string) {
  try {
    return JSON.parse(item);
  } catch (error) {
    return item;
  };
};

export default function usePersisted<T>(name: string, initial: T): [T, (state: T, selfSave?: boolean) => void] {
  const [state, setState] = useState(initial);

  AsyncStorage.getItem(name, (error, result) => {
    if(error || result == null || result == undefined) {
      return;
    };

    setState(usePersisted.stringToJson(result));
  });

  return [
    state,
    (data, save = true) => {
      setState(data);

      if(save) {
        AsyncStorage.setItem(name, usePersisted.anyToString(data));
      };
    }
  ];
};
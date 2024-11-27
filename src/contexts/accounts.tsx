import { createContext } from "react";
import { AccountData } from "../types";

export type AccountAvailability = {
  work: boolean;
  hours: {
    end: "";
    start: ""; 
  }[ ];
};

export const accountContextData = {
  id: "000000000",
  createdAt: new Date( ).toISOString( ),
  
  suspension: {
    is: false,

    end: "",
    start: "",
    reason: "",
  },

  // work
  nanny: {
    isNanny: false,

    pricePerHour: 0,
    
    experiences: [ ] as { with: "", end: "", start: "" }[ ],
    qualifications: [ ] as string[ ],
    
    rating: {
      veryBad: 0,
      bad: 0,
      neutral: 0,
      good: 0,
      veryGood: 0,
    }
  },

  social: {
    name: "Usuario",
    about: "Sobre",
    gender: "male",
    avatar: "default.png",
    shortAbout: "Bio",
  },
  
  private: {
    code: "",
    
    email: "",
    password: "",
    birthDate: "",

    address: {
      city: "",
      state: "",
      number: "",
      landmark: "",
      neighborhood: "",
    },

    // admin level
    permission: -1
  }
};

export const AccountContext = createContext<AccountData & { update(data: any): void }>({ } as any);
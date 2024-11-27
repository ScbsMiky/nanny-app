export interface WorkData {
  id: string;
  description: string;
  endDate: string;
  startDate: string;
  nannyId: string;
  customerId: string;
  price: number;
  discount: number;
  candidates: string[];
};

export interface AccountData {
  id: string;
  createdAt: string;
  
  suspension: {
    is: boolean;
    end: string;
    start: string;
    reason: string;
  };
  
  nanny: {
    isNanny: boolean;
    pricePerHour: number;
    
    experiences: {
      end: string;
      with: string;
      start: string;
    }[];
    
    qualifications: string[];
    
    rating: {
      bad: number;
      good: number;
      neutral: number;
      veryBad: number;
      veryGood: number;
    };
  };
  
  social: {
    name: string;
    about: string;
    gender: string;
    avatar: string;
    shortAbout: string;
  };
  
  private: {
    rg: string;
    cpf: string;
    code: string;
    phone: string;
    
    email: string;
    password: string;
    birthDate: string;

    address: {
      city: string;
      state: string;
      street: string;
      number: string;
      landmark: string;
      neighborhood: string;
    },

    permission: number;
  };
};

export interface NannyData {
  isNanny: boolean;
  pricePerHour: number;
  
  experiences: {
      end: string;
      with: string;
      start: string;
  }[];
  
  qualifications: string[];
  
  rating: {
      bad: number;
      good: number;
      neutral: number;
      veryBad: number;
      veryGood: number;
  };
  
  name: string;
  about: string;
  avatar: string;
  gender: string;
  shortAbout: string;
};
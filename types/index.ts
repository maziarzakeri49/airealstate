export interface FormData {
  type: string;
  address: string;
  price: string;
  bedrooms: string;
  bathrooms: string;
  features: string;
  tone: string;
}

export interface ResultData {
  listing: {
    headline: string;
    description: string;
    highlights: string[];
    features: string[];
  };
  social: {
    instagram: string;
    facebook: string;
    linkedin: string;
  };
  email: {
    subject: string;
    body: string;
  };
}
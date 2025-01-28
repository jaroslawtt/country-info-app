type DateNagerCountryInfoResponse = {
  commonName: string;
  borders: {
    countryCode: string;
    commonName: string;
    officialName: string;
    region: string;
  }[];
};

export { type DateNagerCountryInfoResponse };

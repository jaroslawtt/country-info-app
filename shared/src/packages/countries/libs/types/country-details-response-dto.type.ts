type CountryDetailsResponseDtoType = {
  country: string;
  borderCountries: {
    commonName: string;
    officialName: string;
    countryCode: string;
    region: string;
  }[];
  flagUrl: string;
  populationData: {
    year: number;
    value: number;
  }[];
};

export { type CountryDetailsResponseDtoType };

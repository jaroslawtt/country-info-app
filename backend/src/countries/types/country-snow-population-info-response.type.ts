type CountrySnowPopulationInfoResponse = {
  data: {
    country: string;
    populationCounts: {
      year: number;
      value: number;
    }[];
  };
};

export { type CountrySnowPopulationInfoResponse };

export default () => ({
  port: process.env["PORT"] || 3000,
  externalApis: {
    baseDateNagerApiUrl: process.env["DATE_NAGER_API_URL"],
    baseCountrieSnowApiUrl: process.env["COUNTRIE_SNOW_API_URL"],
  },
});

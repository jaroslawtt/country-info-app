import { Controller, Get, Param } from "@nestjs/common";
import { CountriesService } from "./countries.service";

@Controller("countries")
export class CountriesController {
  public constructor(private readonly countriesService: CountriesService) {}

  @Get()
  getCountries() {
    return this.countriesService.getAvailableCountries();
  }

  @Get(":countryCode")
  async getCountryInfo(@Param("countryCode") countryCode: string) {
    return this.countriesService.getCountryInfo(countryCode);
  }
}

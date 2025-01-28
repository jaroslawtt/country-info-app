import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { HttpService } from "@nestjs/axios";
import { firstValueFrom } from "rxjs";
import {
  type CountryGetAllResponseDto,
  type CountryDetailsResponseDtoType,
  type DateNagerCountryInfoResponse,
  type CountrySnowCountryFlagInfoResponse,
} from "./types/types";
import { CountrySnowPopulationInfoResponse } from "./types/country-snow-population-info-response.type";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class CountriesService {
  private readonly baseDateNagerApiUrl: string;
  private readonly baseCountrieSnowApiUrl: string;

  public constructor(
    private configService: ConfigService,
    private readonly httpService: HttpService,
  ) {
    this.baseDateNagerApiUrl = this.configService.get<string>(
      "externalApis.baseDateNagerApiUrl",
    ) as string;
    this.baseCountrieSnowApiUrl = this.configService.get<string>(
      "externalApis.baseCountrieSnowApiUrl",
    ) as string;
  }

  public async getAvailableCountries(): Promise<CountryGetAllResponseDto[]> {
    return (
      await firstValueFrom(
        this.httpService.get(this.baseDateNagerApiUrl + "AvailableCountries"),
      )
    ).data;
  }

  public async getCountryInfo(
    countryCode: string,
  ): Promise<CountryDetailsResponseDtoType> {
    const countryInfoResponse = await firstValueFrom(
      this.httpService.get<DateNagerCountryInfoResponse>(
        `https://date.nager.at/api/v3/CountryInfo/${countryCode}`,
      ),
    );
    const commonName = countryInfoResponse.data.commonName;
    const borderCountries = countryInfoResponse.data.borders;

    const [populationResponse, flagResponse] = await Promise.allSettled([
      firstValueFrom(
        this.httpService.post<CountrySnowPopulationInfoResponse>(
          `${this.baseCountrieSnowApiUrl}/population`,
          {
            country: commonName,
          },
        ),
      ),
      firstValueFrom(
        this.httpService.post<CountrySnowCountryFlagInfoResponse>(
          `${this.baseCountrieSnowApiUrl}/flag/images`,
          {
            country: commonName,
          },
        ),
      ),
    ]);

    if (
      populationResponse.status === "rejected" ||
      flagResponse.status === "rejected"
    ) {
      throw new HttpException(
        "Failed to fetch country data",
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    return {
      country: populationResponse.value.data.data.country,
      borderCountries,
      populationData: populationResponse.value.data.data.populationCounts,
      flagUrl: flagResponse.value.data.data.flag,
    };
  }
}

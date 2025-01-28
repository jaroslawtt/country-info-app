"use client";

import { FC } from "react";
import { useParams, useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { PopulationChart } from "~/libs/components";
import { type CountryDetailsResponseDtoType } from "~/libs/types/types";

const CountryPage: FC = () => {
  const router = useRouter();
  const { countryCode } = useParams();

  const { data, isLoading } = useQuery<CountryDetailsResponseDtoType>({
    queryKey: ["countryInfo", countryCode],
    queryFn: async () => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}${countryCode}`,
        {
          method: "GET",
        },
      );
      return response.json();
    },
    enabled: !!countryCode,
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center gap-6">
              {data?.flagUrl && (
                <div className="relative w-32 h-24 overflow-hidden rounded-lg">
                  <Image
                    src={data.flagUrl}
                    alt={`Flag of ${data?.country}`}
                    width={128}
                    height={96}
                    className="object-cover"
                    priority
                  />
                </div>
              )}
              <h1 className="text-4xl font-bold text-gray-900">
                {data?.country}
              </h1>
            </div>
          </div>
          <div className="flex flex-col lg:flex-row p-6 gap-8">
            <div className="lg:w-1/2 space-y-6">
              <div className="space-y-4">
                <h2 className="text-xl font-semibold text-gray-900">
                  Border Countries
                </h2>
                <div className="flex flex-wrap gap-3">
                  {data?.borderCountries ? (
                    data.borderCountries.map((country) => (
                      <button
                        key={country.countryCode}
                        onClick={() =>
                          router.push(`/country/${country.countryCode}`)
                        }
                        className="group px-4 py-2 bg-gray-50 hover:bg-gray-100
                    rounded-md border border-gray-300
                    transition-colors duration-200"
                      >
                        <div className="flex flex-col items-start">
                          <span className="text-gray-900 text-sm font-medium">
                            {country.commonName}
                          </span>
                          <span className="text-gray-500 text-xs">
                            {country.region}
                          </span>
                        </div>
                        <div
                          className="hidden group-hover:block absolute
                        bg-white border border-gray-200 rounded-md
                        shadow-lg p-3 mt-2 z-10 text-sm"
                        >
                          <p className="text-gray-900 font-medium">
                            {country.officialName}
                          </p>
                          <p className="text-gray-500 text-xs mt-1">
                            Code: {country.countryCode}
                          </p>
                        </div>
                      </button>
                    ))
                  ) : (
                    <p className="text-gray-500 italic">
                      No bordering countries
                    </p>
                  )}
                </div>
              </div>
            </div>
            <div className="lg:w-1/2">
              <div className="h-full space-y-4">
                <h2 className="text-xl font-semibold text-gray-900">
                  Population Trends
                </h2>
                {data?.populationData && (
                  <div className="h-[400px] bg-white rounded-lg p-4 border border-gray-200">
                    <PopulationChart data={data.populationData} />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CountryPage;

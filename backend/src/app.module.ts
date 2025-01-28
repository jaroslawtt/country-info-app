import { Module } from "@nestjs/common";
import { CountriesModule } from "./countries/countries.module";
import { ConfigModule } from "@nestjs/config";
import configuration from "./common/configs/config/configuration";

@Module({
  imports: [
    CountriesModule,
    ConfigModule.forRoot({
      load: [configuration],
      isGlobal: true,
    }),
  ],
})
export class AppModule {}

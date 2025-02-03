import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RealTimeDataGateway } from './realTimeData/realTimeData.gateway';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, RealTimeDataGateway],
})
export class AppModule {}

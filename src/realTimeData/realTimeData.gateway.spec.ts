import { Test, TestingModule } from '@nestjs/testing';
import { RealTimeDataGateway } from './realTimeData.gateway';

describe('RealTimeDataGateway', () => {
  let gateway: RealTimeDataGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RealTimeDataGateway],
    }).compile();

    gateway = module.get<RealTimeDataGateway>(RealTimeDataGateway);
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });
});

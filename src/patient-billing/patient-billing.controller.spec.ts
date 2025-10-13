import { Test, TestingModule } from '@nestjs/testing';
import { PatientBillingController } from './patient-billing.controller';

describe('PatientBillingController', () => {
  let controller: PatientBillingController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PatientBillingController],
    }).compile();

    controller = module.get<PatientBillingController>(PatientBillingController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

import { Test, TestingModule } from '@nestjs/testing';
import { PatientBillingService } from './patient-billing.service';

describe('PatientBillingService', () => {
  let service: PatientBillingService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PatientBillingService],
    }).compile();

    service = module.get<PatientBillingService>(PatientBillingService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

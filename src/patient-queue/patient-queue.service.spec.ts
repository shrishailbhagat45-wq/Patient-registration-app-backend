import { Test, TestingModule } from '@nestjs/testing';
import { PatientQueueService } from './patient-queue.service';

describe('PatientQueueService', () => {
  let service: PatientQueueService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PatientQueueService],
    }).compile();

    service = module.get<PatientQueueService>(PatientQueueService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

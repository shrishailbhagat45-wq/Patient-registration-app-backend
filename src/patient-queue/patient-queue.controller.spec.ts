import { Test, TestingModule } from '@nestjs/testing';
import { PatientQueueController } from './patient-queue.controller';

describe('PatientQueueController', () => {
  let controller: PatientQueueController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PatientQueueController],
    }).compile();

    controller = module.get<PatientQueueController>(PatientQueueController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

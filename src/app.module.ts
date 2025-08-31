import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import dbConfig from './config/db.Config';
import { ConfigModule } from '@nestjs/config';
import { PatientController } from './patient/patient.controller';
import { PatientService } from './patient/patient.service';
import { PatientEntity } from './entities/patient.entity';
import { AppController } from './app.controller';
import { PrescriptionsController } from './prescriptions/prescriptions/prescriptions.controller';
import { PrescriptionsService } from './prescriptions/prescriptions/prescriptions.service';
import { PrescriptionEntity } from './entities/prescriptions.entity';

@Module({
  imports: [ConfigModule.forRoot({
    isGlobal:true,
    load: [dbConfig]
  }), TypeOrmModule.forRootAsync({
    useFactory: dbConfig,
  }), TypeOrmModule.forFeature([PatientEntity,PrescriptionEntity])],
  controllers: [AppController, PatientController, PrescriptionsController],
  providers: [PatientService, PrescriptionsService],
})
export class AppModule {}

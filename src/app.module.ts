import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import dbConfig from './config/db.Config';
import { ConfigModule } from '@nestjs/config';
import { PatientController } from './patient/patient.controller';
import { PatientService } from './patient/patient.service';
import { PatientEntity } from './entities/patient.entity';

@Module({
  imports: [ConfigModule.forRoot({
    isGlobal:true,
    load: [dbConfig]
  }), TypeOrmModule.forRootAsync({
    useFactory: dbConfig,
  }), TypeOrmModule.forFeature([PatientEntity])],
  controllers: [ PatientController],
  providers: [PatientService],
})
export class AppModule {}

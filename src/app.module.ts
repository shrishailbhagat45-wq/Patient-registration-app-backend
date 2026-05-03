import { Module } from '@nestjs/common';
import { PatientController } from './patient/patient.controller';
import { PatientService } from './patient/patient.service';
import { PatientSchema } from './schema/patient.schema';
import { AppController } from './app.controller';
import { PrescriptionsController } from './prescriptions/prescriptions/prescriptions.controller';
import { PrescriptionsService } from './prescriptions/prescriptions/prescriptions.service';
import { PrescriptionSchema } from './schema/prescriptions.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { UserController } from './user/user.controller';
import { UserService } from './user/user.service';
import { UserSchema } from './schema/user.schema';
import { BillingController } from './billing/billing.controller';
import { BillingService } from './billing/billing.service';
import { BillingItemSchema } from './schema/billingItem.schema';
import { AuthModule } from './auth/auth.module';
import { PatientBillingController } from './patient-billing/patient-billing.controller';
import { PatientBillingService } from './patient-billing/patient-billing.service';
import { PatientBillSchema } from './schema/patientBill.schema';
import { PatientQueueController } from './patient-queue/patient-queue.controller';
import { PatientQueueService } from './patient-queue/patient-queue.service';
import PatientQueueSchema from './schema/patientQueue';
import { DrugsSchema } from './schema/drugs.schema';
import { DrugsController } from './drugs/drugs.controller';
import { DrugsService } from './drugs/drugs.service';
import { ClinicSchema } from './schema/clinic.schema';
import { ClinicController } from './clinic/clinic.controller';
import { ClinicService } from './clinic/clinic.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,  // This makes the config available globally in your app
      envFilePath: '.env', // Make sure this points to the correct location of your .env file
    }),
    MongooseModule.forRoot(
      process.env.DATABASE_URL ?? (() => { throw new Error('DATABASE_URL environment variable is not set'); })()
    ),
    MongooseModule.forFeature([
      { name: 'Patient', schema: PatientSchema },
      { name: 'Prescription', schema: PrescriptionSchema },
      { name: 'User', schema: UserSchema } ,
      { name: 'BillingItem', schema: BillingItemSchema },
      {name: 'PatientBill', schema: PatientBillSchema},
      {name: 'PatientQueue', schema: PatientQueueSchema},
      { name: 'Drugs', schema: DrugsSchema },
      { name: 'Clinic', schema: ClinicSchema }
     
    ]),
    AuthModule
  ],
  controllers: [AppController, PatientController, PrescriptionsController, UserController, BillingController, PatientBillingController, PatientQueueController, DrugsController, ClinicController,],
  providers: [PatientService, PrescriptionsService, UserService, BillingService, PatientBillingService, PatientQueueService, DrugsService, ClinicService],
})
export class AppModule {}

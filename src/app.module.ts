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
      { name: 'BillingItem', schema: BillingItemSchema }
     
    ])
  ],
  controllers: [AppController, PatientController, PrescriptionsController, UserController, BillingController],
  providers: [PatientService, PrescriptionsService, UserService, BillingService],
})
export class AppModule {}

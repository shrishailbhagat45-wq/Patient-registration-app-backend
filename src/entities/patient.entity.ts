import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

export enum Gender {
    Male = 'Male',
    Female = 'Female',
    Other = 'Other'
}

@Entity('patients')
export class PatientEntity {
  // Define properties and methods for the Patient entity here
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    name: string;
    @Column()
    gender: Gender;
    @Column()
    age: number;
    @Column()
    phoneNumber: string;
    @Column()
    weight: number;

}   


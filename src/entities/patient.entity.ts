import { Column, CreateDateColumn, DeleteDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { PrescriptionEntity } from "./prescriptions.entity";

export enum Gender {
    Male = 'Male',
    Female = 'Female',
    Other = 'Other'
}

@Entity('patients')
export class PatientEntity {
  // Define properties and methods for the Patient entity here
    @PrimaryGeneratedColumn("uuid")
    id: number;
    @Column( )
    name: string;
    @Column()
    gender: Gender;
    @Column()
    age: number;
    @Column()
    phoneNumber: string;
    @Column()
    weight: number;
    @OneToMany(() => PrescriptionEntity, prescription => prescription.patient)
    prescriptions:PrescriptionEntity[];
    @CreateDateColumn()
    createdAt: Date;
    @UpdateDateColumn()
    updatedAt: Date;
    @DeleteDateColumn()
    deletedAt: Date;

}   


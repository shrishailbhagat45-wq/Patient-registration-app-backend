import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, DeleteDateColumn, UpdateDateColumn, CreateDateColumn } from 'typeorm';
import { PatientEntity } from './patient.entity';

@Entity('prescriptions')
export class PrescriptionEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    strength: string;

    @Column()
    quantity: string;

    @Column()
    frequency: string;

    @Column({ nullable: true })
    remarks: string;

    @ManyToOne(() => PatientEntity, patient => patient.prescriptions, { onDelete: 'CASCADE' })
    patient: PatientEntity;
    @CreateDateColumn()
    createdAt: Date;
    @UpdateDateColumn()
    updatedAt: Date;
    @DeleteDateColumn()
    deletedAt: Date;
}
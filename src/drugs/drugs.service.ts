import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Drugs } from 'src/schema/drugs.schema';

@Injectable()
export class DrugsService {
    constructor(@InjectModel('Drugs') private DrugModel:Model<Drugs> ) {}
    async getDrugsByName(name: string) {
        return this.DrugModel.find({ name: { $regex: name, $options: 'i' } }).limit(10).exec();
    }
}

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Drugs } from 'src/schema/drugs.schema';

@Injectable()
export class DrugsService {
    constructor(@InjectModel('Drugs') private DrugModel:Model<Drugs> ) {}
    async getDrugsByName(name: string) {
        console.log("Searching drugs with name:", name);
        return this.DrugModel.find({ name: { $regex: name, $options: 'i' } }).limit(10).exec();
    }
}

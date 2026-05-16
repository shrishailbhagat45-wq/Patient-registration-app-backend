import { Body, Controller, Post } from '@nestjs/common';
import { DrugsService } from './drugs.service';

@Controller('drugs')
export class DrugsController {
    constructor(private readonly drugService: DrugsService) {}

    @Post()
    async getDrugs(@Body() value: { name: string }) {
        const drugs = await this.drugService.getDrugsByName(value.name);
        if (drugs.length === 0) {
            return { message: 'No drugs found', status: 404 };
        }
        return { message: 'Drugs retrieved successfully', status: 200, data: drugs };
    }
}
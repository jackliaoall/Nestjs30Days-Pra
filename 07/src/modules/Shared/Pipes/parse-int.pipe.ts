import { HttpException } from '@nestjs/core';
import { PipeTransform, Pipe, ArgumentMetadata, HttpStatus } from '@nestjs/common';

@Pipe()
export class ParseIntPipe implements PipeTransform<string>{
    async transform(value: string, metadata: ArgumentMetadata) {
        const val = parseInt(value, 10);
        if (isNaN(val)) {
            throw new HttpException('檢驗錯誤', HttpStatus.BAD_REQUEST);
        }
        return val;
    }
}
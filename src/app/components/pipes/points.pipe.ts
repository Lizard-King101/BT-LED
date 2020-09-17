import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'pointString'})
export class Point implements PipeTransform {
  transform(value: any, index: number): string {
    let offset = value[0];
    let point = value[1];
    return point[index] + offset;
  }
}
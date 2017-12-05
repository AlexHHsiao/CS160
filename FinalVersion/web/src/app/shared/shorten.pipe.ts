import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'shorten'
})

export class ShortenPipe implements PipeTransform {

  defaultLength = 20;

  transform(value: any, size?: number) {

    if (!value) {
      return;
    }

    let length = this.defaultLength;

    if (size) {
      length = size;
    }

    if (value.length > length) {
      return value.substring(0, length) + '...';
    }

    return value;
  }
}

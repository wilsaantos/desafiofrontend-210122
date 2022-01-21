import { TemplateLiteral } from '@angular/compiler';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'celular'
})
export class CelularPipe implements PipeTransform {

    transform(tel) {
        if (tel) {
            const value = tel.toString().replace(/\D/g, '');

            let foneFormatado = '';

            if (value.length == 11) {
                foneFormatado = value.replace(/(\d{2})?(\d{5})?(\d{4})/, '($1) $2-$3');
            } else if (value.length == 10) {
                foneFormatado = value.replace(/(\d{2})?(\d{4})?(\d{4})/, '($1) $2-$3');
            } else if (value.length == 9) {
                foneFormatado = value.replace(/(\d{5})?(\d{4})/, '$1-$2');

            } else if (value.length == 8) {
                foneFormatado = value.replace(/^(\d{4})?(\d{4})/, '$1-$2');
            }
            return foneFormatado;
        } else {
            return tel;
        }
    }
}
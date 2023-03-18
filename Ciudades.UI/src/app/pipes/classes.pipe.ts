import { Pipe, PipeTransform } from '@angular/core';
import { Country } from '../models/country';

@Pipe({
  name: 'classes'
})

export class ClassesPipe implements PipeTransform {

  transform(items: Country[], searchText: string): any[] {
    if(!items) return [];
    if(!searchText) return items;
    searchText = searchText.toLowerCase();

    return items.filter( it => {
      return it.countryName.toLowerCase().includes(searchText);
    });
  }
}

// filter.pipe.ts

import { Pipe, PipeTransform } from '@angular/core';
import { filter, map, Observable } from 'rxjs';

@Pipe({ name: 'appFilter' })
export class FilterPipe implements PipeTransform {
  /**
   * Pipe filters the list of elements based on the search text provided
   *
   * @param items list of elements to search in
   * @param searchText search string
   * @returns list of elements filtered by search text or []
   */
  transform(items: Observable<any>, searchText: string, categoria: string): Observable<any> {
    if (!searchText) {
      return items;
    }
    searchText = searchText.toLocaleLowerCase();

    return items.pipe(map((libros:any[]) => {
      let librosEncontrados:any[] = [];
      libros.forEach((libro:any) => {
        if (libro[categoria].toLocaleLowerCase().includes(searchText)) {
            librosEncontrados.push(libro);
        }
      });
      return librosEncontrados;
    }));
  }
}

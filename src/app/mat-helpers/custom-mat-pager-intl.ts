import { Injectable } from "@angular/core";
import { MatPaginatorIntl } from "@angular/material";

@Injectable()
export class CustomMatPagerIntl extends MatPaginatorIntl {
  itemsPerPageLabel = 'MAT.PAGINATOR.ITEMS_PER_PAGE';
  nextPageLabel     = 'MAT.PAGINATOR.NEXT';
  previousPageLabel = 'MAT.PAGINATOR.PREV';
  ofLabel = 'MAT.PAGINATOR.PREV';

   getRangeLabel = (page: number, pageSize: number, length: number) => {
      return page + " - " + pageSize + " " + this.ofLabel + " - " + length;
   };
}

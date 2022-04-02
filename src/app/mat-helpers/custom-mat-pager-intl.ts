import { Injectable } from "@angular/core";
import { MatPaginatorIntl } from "@angular/material";

@Injectable()
export class CustomMatPagerIntl extends MatPaginatorIntl {
  itemsPerPageLabel = 'MAT.PAGINATOR.ITEMS_PER_PAGE';
  nextPageLabel     = 'MAT.PAGINATOR.NEXT';
  previousPageLabel = 'MAT.PAGINATOR.PREV';
  showingLabel = 'MAT.PAGINATOR.SHOWING';
  entriesLabel = 'MAT.PAGINATOR.SHOWING';

   getRangeLabel = (page: number, pageSize: number, length: number) => {
     // showing 1 - 16 / 16 entires
     return this.showingLabel.concat(" ", page.toString(), " - ", pageSize.toString(), "/", length.toString(), " ", this.entriesLabel);
   };
}

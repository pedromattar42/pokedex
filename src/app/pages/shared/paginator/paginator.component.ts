import { NgClass, NgFor } from '@angular/common';
import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  standalone: true,
  imports: [NgFor, NgClass, FormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./paginator.component.scss'],
})
export class PaginatorComponent implements AfterViewInit {
  @Input() totalCount: number = 0;
  @Output() public changePage: EventEmitter<any> = new EventEmitter()
  public totalPages: number = 0;
  public currentPage: number = 0;
  public itemsPerPage: number = 10;
  public buttons: number[] = []
  public rowsPerPageOptions: number[] = [5, 10, 25, 100]
  private cdr: ChangeDetectorRef = inject(ChangeDetectorRef)

  ngAfterViewInit(): void {
    this.cdr.detectChanges()
    this.generateButtons()
  }

  private generateButtons(): void {
    this.totalPages = Math.ceil(this.totalCount / this.itemsPerPage);
    const totalButtonsToShow = 3;
    const middleButtonIndex = Math.floor(totalButtonsToShow / 2);

    let start = Math.max(0, this.currentPage - middleButtonIndex);
    let end = Math.min(this.totalPages - 1, start + totalButtonsToShow - 1);

    while (end - start + 1 < totalButtonsToShow && start > 0) {
      start--;
    }

    while (end - start + 1 < totalButtonsToShow && end < this.totalPages - 1) {
      end++;
    }

    this.buttons = [];
    for (let i = start; i <= end; i++) {
      this.buttons.push(i);
    }
  }

  public emitValue(){
    this.changePage.emit({
      totalPages: this.totalPages,
      currentPage: this.currentPage,
      itemsPerPage: this.itemsPerPage
    })
  }

  public previous(action: string) {
    switch(action) {
      case 'PREVIOUS':
        if(this.currentPage > 0)
          this.currentPage--;
      break;

      case 'FIRST':
        this.currentPage = 0
      break
    }
    this.generateButtons()
    this.emitValue()
  }

  public nextPage(action: string) {
    switch(action) {
      case 'NEXT':
        this.currentPage++;
      break;

      case 'LAST':
        this.currentPage = this.totalPages - 1
      break
    }
    this.generateButtons()
    this.emitValue()
  }

  public redirectToPage(index: number) {
    this.currentPage = index
    this.emitValue()
  }

  public selectPageSize(pageSize: number){
    this.itemsPerPage = pageSize
    this.currentPage = 0
    this.generateButtons()
    this.emitValue()
    this.cdr.markForCheck()
  }
}

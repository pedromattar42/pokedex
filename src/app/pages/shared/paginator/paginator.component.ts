import { NgClass, NgFor } from '@angular/common';
import { AfterViewInit, Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  standalone: true,
  imports: [NgFor, NgClass],
  styleUrls: ['./paginator.component.scss'],
})
export class PaginatorComponent implements OnInit, AfterViewInit {
  @Input() totalCount: number = 0;
  totalPages: number = 0;
  currentPage: number = 0;
  itemsPerPage: number = 10;
  buttons: number[] = []

  ngAfterViewInit(): void {
    this.totalPages = Math.ceil(this.totalCount / this.itemsPerPage);
    this.buttons = Array.from({length: this.totalPages}, (e, i) => i)
    console.log(this.totalCount);
  }

  ngOnInit(): void {}
}

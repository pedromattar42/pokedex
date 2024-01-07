import { Component, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-poke-search',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './poke-search.component.html',
  styleUrls: ['./poke-search.component.scss']
})
export class PokeSearchComponent implements OnInit {

  @Output()

  ngOnInit(): void {
  }

}

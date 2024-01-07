import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PokeHeaderComponent } from '../shared/poke-header/poke-header.component';
import { PokeSearchComponent } from '../shared/poke-search/poke-search.component';
import { PokeListComponent } from '../shared/poke-list/poke-list.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, PokeHeaderComponent, PokeSearchComponent, PokeListComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export default class HomeComponent {

}

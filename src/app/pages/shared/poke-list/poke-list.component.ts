import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PokeApiService } from 'src/app/service/poke-api.service';
import { RouterModule } from '@angular/router';
import { PokeSearchComponent } from '../poke-search/poke-search.component';
import { PaginatorComponent } from '../paginator/paginator.component';

@Component({
  selector: 'app-poke-list',
  standalone: true,
  imports: [CommonModule, RouterModule, PokeSearchComponent, PaginatorComponent],
  templateUrl: './poke-list.component.html',
  styleUrls: ['./poke-list.component.scss'],
})
export class PokeListComponent implements OnInit {
  #pokeApiService = inject(PokeApiService);
  public getAllPokemons: any[] = [];
  public pokemonCount: number = 0
  private setAllPokemons: any[] = [];

  ngOnInit(): void {
    this.#pokeApiService.apiGetAllPokemons.subscribe((res) => {
      this.setAllPokemons = res.results;
      this.pokemonCount = res.count;
      console.log(res.count)
      this.getAllPokemons = this.setAllPokemons;
    });
  }

  public getSearch(value: string) {
    const filter = this.setAllPokemons.filter(
      (res) => !res.name.indexOf(value.toLowerCase())
    );

    this.getAllPokemons = filter;
  }
}

import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PokeHeaderComponent } from '../shared/poke-header/poke-header.component';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { PokeApiService } from 'src/app/service/poke-api.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [CommonModule, PokeHeaderComponent, RouterModule],
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {
  #route = inject(ActivatedRoute)
  #pokeApiService = inject(PokeApiService)

  #urlPokemon: string = 'https://pokeapi.co/api/v2/pokemon'
  #urlName: string = 'https://pokeapi.co/api/v2/pokemon-species'

  public pokemon: any
  public isLoading: boolean = false;
  public apiError: boolean = false;

  ngOnInit(): void {
    this.getPokemon()
  }

  public getPokemon(){
    const id = this.#route.snapshot.params['id'];
    const pokemon = this.#pokeApiService.apiGetPokemons(`${this.#urlPokemon}/${id}`);
    const name = this.#pokeApiService.apiGetPokemons(`${this.#urlName}/${id}`);

    return forkJoin([pokemon, name]).subscribe(
      res => {
        this.pokemon = res;
        this.isLoading = true;
      },
      error => {
        this.apiError = true;
      }
    );
  }

}

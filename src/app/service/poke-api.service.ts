import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PokeApiService {
  private url: string = 'https://pokeapi.co/api/v2/pokemon';
  private fullUrl: string = 'https://pokeapi.co/api/v2/pokemon?offset=0&limit=100}';
  constructor(private http: HttpClient) {}

  public apiGetAllPokemons(page: number = 0, size: number = 10): Observable<any> {
    return this.http.get<any>(`${this.url}?offset=${page}&limit=${size}`).pipe(
      tap((res) => res),
      tap((res) => {
        res.results.map((resPokemons: any) => {
          this.apiGetPokemons(resPokemons.url).subscribe((res) => resPokemons.status = res);
        });
      })
    );
  }

  public apiGetPokemons(url: string): Observable<any> {
    return this.http.get<any>(url).pipe(map((res) => res));
  }
}

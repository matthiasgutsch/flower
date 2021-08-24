import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';
import { Observable } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
const apiURL = "https://www.startupinspire.com/v3/api/pages";
const apiURLRANDOM = "https://www.startupinspire.com/v3/api/pages?result=7&page=1&sort=RANDOM";

const apiURLNEW = "https://www.startupinspire.com/v3/api/pages?result=1&sort=RANDOM";

const SINGLE_URL = 'https://www.startupinspire.com/v3/api/startups';

const BASE_URL = 'https://www.startupinspire.com/v3/api/pages';
const BASE_FEATURED_URL = 'https://www.segnidinfanzia.org/v1/api/featured';
const BASE_AUTHOR_URL = 'https://www.segnidinfanzia.org/v1/api/author';

const BASE_NEWS_URL = 'https://www.startupinspire.com/v3/api/news';
const BASE_PAGE_URL = 'https://www.startupinspire.com/v3/api/pages';

const BASE_STARTUPS_URL = 'https://www.startupinspire.com/v3/api/startups';




@Injectable({
  providedIn: 'root'
})


export class MenuService {
  apiUrl = 'https://www.startupinspire.com/v3/api/pages';
  BASE_AUTHOR_URL = 'https://www.segnidinfanzia.org/v1/api/author';

  constructor(private http: HttpClient) { }


  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occured: ', error.error.message);
    } else {
      console.error(
        `Backend return codde ${error.status}, ` +
        `body was: ${error.error}`
      );
    }
    return;
  }

  private extractData(res: Response) {
    let body = res;
    return body || {};
  }

  

  findRandom(searchFilter: any = null): Observable<any[]> {
    return this.http
      .get<any[]>(`${this.apiUrl}?result=5&page=2&sort=RANDOM`);
  }

  getStudent(page=1): Observable<any> {
    return this.http.get('https://www.startupinspire.com/v3/api/pages?result=10&page='+page, httpOptions).pipe(
      map(this.extractData)
    );
  }


  


  getPokemonHome(offset = 1):Observable<any[]> {
    return this.http.get<any[]>(`${BASE_STARTUPS_URL}?result=40&page=${offset}`).pipe(
      map(response => {
        return response;
      }),
      map(pokemons => {
        return pokemons.map((pokemon, index) => {
          pokemon.id = offset + index + 1;
          return pokemon;
        });
      })
    );
  }


  getPokemonNew(): Observable<any> {
    return this.http.get(apiURLNEW, httpOptions).pipe(
      map(this.extractData)
    );
  }

  
  getPokemonById(id: string): Observable<any> {
    const url = `${SINGLE_URL}/id/${id}`;
    return this.http.get(url, httpOptions).pipe(
      map(this.extractData)
    );
  }

  getPokemonNewsById(id: string): Observable<any> {
    const url = `${BASE_NEWS_URL}/id/${id}`;
    return this.http.get(url, httpOptions).pipe(
      map(this.extractData)
    );
  }
  

  find(searchFilter: any = null): Observable<any[]> {
    return this.http
      .get<any[]>(`${this.apiUrl}`)
      .pipe(
        map((menus) =>
          menus.filter((menu) => this.filterValue(menu, searchFilter))
        )
      );
  }

  findAuthor(searchFilter: any = null): Observable<any[]> {
    return this.http
      .get<any[]>(`${this.BASE_AUTHOR_URL}`)
      .pipe(
        map((menus) =>
          menus.filter((menu) => this.filterValue(menu, searchFilter))
        )
      );
  }

  filterValue(menu: any, searchFilter: any): boolean {
    let condition = true;

    Object.keys(searchFilter).forEach((f) => {
      if (typeof searchFilter[f] === 'string') {
        if (menu[f].toLowerCase().indexOf(searchFilter[f].toLowerCase()) < 0) {
          condition = false;
          return;
        }
      }

      if (typeof searchFilter[f] === 'object') {
        if (f === 'price') {
          const { upper, lower } = searchFilter[f];
          if (menu[f] > upper || menu[f] < lower) {
            condition = false;
            return;
          }
        }
      }
    });

    return condition;
  }



  getPokemonList(offset = 1):Observable<any[]> {
    return this.http.get<any[]>(`${BASE_STARTUPS_URL}?result=10&page=${offset}`).pipe(
      map(response => {
        return response;
      }),
      map(pokemons => {
        return pokemons.map((pokemon, index) => {
          pokemon.id = offset + index + 1;
          return pokemon;
        });
      })
    );
  }




  getPokemonAuthorList(offset = 1):Observable<any[]> {
    return this.http.get<any[]>(`${BASE_AUTHOR_URL}?result=20&page=${offset}`).pipe(
      map(response => {
        return response;
      }),
      map(pokemons => {
        return pokemons.map((pokemon, index) => {
          pokemon.id = offset + index + 1;
          return pokemon;
        });
      })
    );
  }

  getPokemonAuthorById(id: string): Observable<any> {
    const url = `${BASE_AUTHOR_URL}/id/${id}`;
    return this.http.get(url, httpOptions).pipe(
      map(this.extractData)
    );
  }


  getPokemonFeaturedList(offset = 1):Observable<any[]> {
    return this.http.get<any[]>(`${BASE_FEATURED_URL}?result=10&page=${offset}`).pipe(
      map(response => {
        return response;
      }),
      map(pokemons => {
        return pokemons.map((pokemon, index) => {
          pokemon.id = offset + index + 1;
          return pokemon;
        });
      })
    );
  }

  getPokemonNewsList(offset = 1):Observable<any[]> {
    return this.http.get<any[]>(`${BASE_NEWS_URL}?result=10&page=${offset}&sort=DESC`).pipe(
      map(response => {
        return response;
      }),
      map(pokemons => {
        return pokemons.map((pokemon, index) => {
          pokemon.id = offset + index + 1;
          return pokemon;
        });
      })
    );
  }


  getPageId(pageid = 1):Observable<any[]> {
    return this.http.get<any[]>(`${BASE_PAGE_URL}/id/${pageid}`).pipe(
      map(response => {
        return response;
      })
    );
  }
  


  findPokemon(search: string): Observable<any[]> {
    return this.http.get<any[]>(`${BASE_URL}?search=${search}`).pipe(
      map(pokemon => {
        return pokemon;
      })
    );
  }

  findAuthorPokemon(search: string): Observable<any[]> {
    return this.http.get<any[]>(`${BASE_AUTHOR_URL}?search=${search}`).pipe(
      map(pokemon => {
        return pokemon;
      })
    );
  }

  

}

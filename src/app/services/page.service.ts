import { Injectable } from "@angular/core";
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from "@angular/common/http";
import { catchError, tap, map } from "rxjs/operators";
import { Observable } from "rxjs";

const httpOptions = {
  headers: new HttpHeaders({ "Content-Type": "application/json" }),
};
const BASE_PAGE_URL = "https://associazionecomunali.it/v1/api/pages";
const BASE_NEWS_URL = "https://associazionecomunali.it/v1/api/news";
const BASE_TOUR_URL = "https://associazionecomunali.it/v1/api/corsi";

@Injectable({
  providedIn: "root",
})
export class PageService {

  apiUrl = "https://associazionecomunali.it/v1/api/pages";

  constructor(private http: HttpClient) {}

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error("An error occured: ", error.error.message);
    } else {
      console.error(
        `Backend return codde ${error.status}, ` + `body was: ${error.error}`
      );
    }
    return;
  }

  private extractData(res: Response) {
    let body = res;
    return body || {};
  }

  getStartupsList(): Observable<any> {
    return this.http.get(
      `https://www.startupinspire.com/v3/api/pages?result=278&page=1`
    );
  }


  getStartupsListRandom(offset = 1): Observable<any[]> {
    return this.http
      .get<any[]>(
        `${BASE_TOUR_URL}?result=4&page=${offset}&sort=RANDOM`
      )
      .pipe(
        map((response) => {
          return response;
        }),
        map((pokemons) => {
          return pokemons.map((pokemon, index) => {
            pokemon.id = offset + index + 1;
            return pokemon;
          });
        })
      );
  }



  getTourListHome(offset = 1): Observable<any[]> {
    return this.http
      .get<any[]>(
        `${BASE_TOUR_URL}?result=6&page=1`
      )
      .pipe(
        map((response) => {
          return response;
        }),
        map((pokemons) => {
          return pokemons.map((pokemon, index) => {
            pokemon.id = offset + index + 1;
            return pokemon;
          });
        })
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
  
  getStudent(page = 1): Observable<any> {
    return this.http
      .get(
        "http://mantovatours.com/v1/api/pages?result=10&page=" + page,
        httpOptions
      )
      .pipe(map(this.extractData));
  }
  

  getNews(page = 1): Observable<any> {
    return this.http
      .get(
        "https://www.startupinspire.com/v3/api/pages?result=10&page=" + page,
        httpOptions
      )
      .pipe(map(this.extractData));
  }


  getPokemonById(id: string): Observable<any> {
    const url = `${BASE_TOUR_URL}/id/${id}`;
    return this.http.get(url, httpOptions).pipe(map(this.extractData));
  }

  getPokemonNewsById(id: string): Observable<any> {
    const url = `${BASE_NEWS_URL}/id/${id}`;
    return this.http.get(url, httpOptions).pipe(map(this.extractData));
  }

  
  findPokemon(search: string): Observable<any[]> {
    return this.http.get<any[]>(`${BASE_TOUR_URL}?search=${search}`).pipe(
      map(pokemon => {
        return pokemon;
      })
    );
  }


  findNews(search: string): Observable<any[]> {
    return this.http.get<any[]>(`${BASE_NEWS_URL}?search=${search}`).pipe(
      map(pokemon => {
        return pokemon;
      })
    );
  }


  filterValue(menu: any, searchFilter: any): boolean {
    let condition = true;

    Object.keys(searchFilter).forEach((f) => {
      if (typeof searchFilter[f] === "string") {
        if (menu[f].toLowerCase().indexOf(searchFilter[f].toLowerCase()) < 0) {
          condition = false;
          return;
        }
      }

      if (typeof searchFilter[f] === "object") {
        if (f === "price") {
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

  getPokemonList(offset = 1): Observable<any[]> {
    return this.http
      .get<any[]>(`${BASE_TOUR_URL}?result=10&page=${offset}`)
      .pipe(
        map((response) => {
          return response;
        }),
        map((pokemons) => {
          return pokemons.map((pokemon, index) => {
            pokemon.id = offset + index + 1;
            return pokemon;
          });
        })
      );
  }


  getNewsList(offset = 1): Observable<any[]> {
    return this.http
      .get<any[]>(`${BASE_NEWS_URL}?result=10&page=${offset}&sort=DESC`)
      .pipe(
        map((response) => {
          return response;
        }),
        map((pokemons) => {
          return pokemons.map((pokemon, index) => {
            pokemon.id = offset + index + 1;
            return pokemon;
          });
        })
      );
  }

  getNewsListRandom(offset = 1): Observable<any[]> {
    return this.http
      .get<any[]>(`${BASE_NEWS_URL}?result=5&page=${offset}&sort=DESC`)
      .pipe(
        map((response) => {
          return response;
        }),
        map((pokemons) => {
          return pokemons.map((pokemon, index) => {
            pokemon.id = offset + index + 1;
            return pokemon;
          });
        })
      );
  }

  getPageId(pageid = 1): Observable<any[]> {
    return this.http.get<any[]>(`${BASE_PAGE_URL}/id/${pageid}`).pipe(
      map((response) => {
        return response;
      })
    );
  }

}

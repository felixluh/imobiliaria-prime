import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Imovel } from '../models/imovel.model';


@Injectable({ providedIn: 'root' })
export class ImoveisService {
    private api = 'http://localhost:3008';
    constructor(private http: HttpClient) { }


    listar(): Observable<Imovel[]> 
    { return this.http.get<Imovel[]>
        (`${this.api}/imoveis`); 
    }
    obter(id: number): Observable<Imovel> 
    { return this.http.get<Imovel>
        (`${this.api}/imoveis/${id}`); 
    }
    criar(imovel: Imovel): Observable<Imovel> 
    { return this.http.post<Imovel>
        (`${this.api}/imoveis`, imovel); 
    }
    atualizar(id: number, imovel: Imovel): Observable<Imovel> 
    { return this.http.put<Imovel>
        (`${this.api}/imoveis/${id}`, imovel); 
    }
    remover(id: number): Observable<void> 
    { return this.http.delete<void>
        (`${this.api}/imoveis/${id}`);
     }
}

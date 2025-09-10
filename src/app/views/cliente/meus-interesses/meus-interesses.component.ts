import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../../core/services/auth.service';
import { switchMap, forkJoin, of } from 'rxjs';
import { Imovel } from '../../../core/models/imovel.model';

interface Interesse { id?: number; clienteId: number; imovelId: number; }

@Component({
    standalone: true,
    imports: [CommonModule],
    templateUrl: './meus-interesses.component.html',
    styleUrls: ['./meus-interesses.component.scss']
})
export class MeusInteressesComponent implements OnInit {
    api = 'http://localhost:3008';
    lista: Imovel[] = [];

    constructor(private http: HttpClient, private auth: AuthService) { }

    ngOnInit() {
        const clienteId = this.auth.getUserId();
        if (clienteId === null) return;

        this.http.get<Interesse[]>(`${this.api}/interesses?clienteId=${clienteId}`).pipe(
            switchMap(interesses => {
                if (interesses.length === 0) {
                    return of([]); // Retorna um Observable vazio se não houver interesses
                }
                const requests = interesses.map(i =>
                    this.http.get<Imovel>(`${this.api}/imoveis/${i.imovelId}`)
                );
                return forkJoin(requests);
            })
        ).subscribe(imoveis => {
            this.lista = imoveis;
        });
    }
}
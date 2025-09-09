import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../../core/services/auth.service';
interface Interesse { id?: number; clienteId: number; imovelId: number; }

@Component({
    standalone: true,
    imports: [CommonModule],
    templateUrl: './meus-interesses.component.html',
    styleUrls: ['./meus-interesses.component.scss']
})
export class MeusInteressesComponent {
    api = 'http://localhost:3008';
    lista: any[] = [];
    constructor(private http: HttpClient, private auth: AuthService) { }
    ngOnInit() {
        const cid = this.auth.getUserId();
        this.http.get<Interesse[]>(`${this.api}/interesses?clienteId=${cid}
`).subscribe(ints => {
            const queries = ints.map(i => this.http.get<any>(`${this.api}/imoveis/$
{i.imovelId}`));
            Promise.all(queries.map(q => q.toPromise())).then(imoveis =>
                this.lista = imoveis as any[]);
        });
    }
}

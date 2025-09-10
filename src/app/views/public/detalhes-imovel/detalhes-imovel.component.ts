import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImoveisService } from '../../../core/services/imovel.service';
import { Imovel } from '../../../core/models/imovel.model';
import { ActivatedRoute } from '@angular/router';
import { switchMap, of } from 'rxjs';
import { AuthService } from '../../../core/services/auth.service';
import { HttpClient } from '@angular/common/http';
import { NotificacaoService } from '../../../core/services/notificacao.service';

@Component({
    standalone: true,
    imports: [CommonModule],
    templateUrl: './detalhes-imovel.component.html',
    styleUrls: ['./detalhes-imovel.component.scss']
})
export class DetalhesImovelComponent implements OnInit {
    imovel: Imovel | null = null;
    isClienteLogado = false;
    private api = 'http://localhost:3008';

    constructor(
        private route: ActivatedRoute,
        private imoveisService: ImoveisService,
        private authService: AuthService,
        private http: HttpClient,
        private notificacao: NotificacaoService
    ) { }

    ngOnInit() {
        this.isClienteLogado = this.authService.isAuthenticated() && this.authService.getUserTipo() === 'cliente';
        this.route.paramMap.pipe(
            switchMap(params => {
                const id = params.get('id');
                return id ? this.imoveisService.obter(+id) : of(null);
            })
        ).subscribe(imovel => {
            this.imovel = imovel;
        });
    }

    marcarInteresse() {
        const clienteId = this.authService.getUserId();
        const imovelId = this.imovel?.id;

        if (!clienteId || !imovelId) {
            this.notificacao.show('Erro: Usuário ou imóvel não identificado.');
            return;
        }

        const interessePayload = {
            clienteId: clienteId,
            imovelId: imovelId
        };

        this.http.post(`${this.api}/interesses`, interessePayload)
            .subscribe({
                next: () => this.notificacao.show('Interesse registrado com sucesso!'),
                error: (err) => {
                    console.error('Erro ao registrar interesse:', err);
                    this.notificacao.show('Erro ao registrar interesse. Tente novamente.');
                }
            });
    }
}
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators, FormGroup, FormControl } from '@angular/forms';
import { ImoveisService } from '../../../core/services/imovel.service';
import { AuthService } from '../../../core/services/auth.service';
import { Imovel } from '../../../core/models/imovel.model';

@Component({
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule],
    templateUrl: './dashboard-imoveis.component.html',
    styleUrls: ['./dashboard-imoveis.component.scss']
})
export class DashboardImoveisComponent implements OnInit {
    lista: Imovel[] = [];
    form!: FormGroup;

    constructor(
        private fb: FormBuilder,
        private service: ImoveisService,
        private auth: AuthService
    ) {
        this.form = this.fb.group({
            id: new FormControl<number | null>(null),
            titulo: new FormControl<string>('', Validators.required),
            tipo: new FormControl<string>('Apartamento', Validators.required),
            cidade: new FormControl<string>('', Validators.required),
            preco: new FormControl<number>(0, [Validators.required, Validators.min(1)]),
            descricao: new FormControl<string>(''),
            imagemUrl: new FormControl<string>('https://picsum.photos/seed/imovel/800/500')
        });
    }

    ngOnInit() {
        this.load();
    }

    load() {
        const corretorId = this.auth.getUserId();
        if (corretorId === null) return;
        this.service.listar().subscribe(d => {
            this.lista = d.filter(x => x.corretorId === corretorId);
        });
    }

    salvar() {
        if (this.form.invalid) return;
        const data = this.form.getRawValue();
        const payload = { ...data, corretorId: this.auth.getUserId()! };

        if (data.id != null) {
            this.service.atualizar(Number(data.id), payload)
                .subscribe(() => {
                    this.form.reset();
                    this.load();
                });
        } else {
            this.service.criar(payload)
                .subscribe(() => {
                    this.form.reset();
                    this.load();
                });
        }
    }

    editar(i: Imovel) {
        this.form.patchValue(i);
    }

    remover(i: Imovel) {
        if (i && i.id != null) {
            this.service.remover(Number(i.id)).subscribe(() => this.load());
        }
    }
}
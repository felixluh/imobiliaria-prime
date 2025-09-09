import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators, FormGroup } from '@angular/forms';
import { ImoveisService } from '../../../core/services/imovel.service';
import { AuthService } from '../../../core/services/auth.service';
import { Imovel } from '../../../core/models/imovel.model';

@Component({
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule],
 templateUrl: './detalhes-imovel.component.html',
styleUrls: ['./detalhes-imovel.component.scss']
})
export class DetalhesImovelComponent {
    lista: Imovel[] = [];
    form!: FormGroup;

    constructor(
        private fb: FormBuilder,
        private service: ImoveisService,
        private auth: AuthService
    ) { }

    ngOnInit() { this.load(); }
    load() { this.service.listar().subscribe(d => this.lista = d.filter(x => x.corretorId === this.auth.getUserId())); }
    salvar() {
        if (this.form.invalid) return;
        const data = this.form.value as Imovel;
        const payload: Imovel = { ...data, corretorId: this.auth.getUserId()! };
        (data.id ? this.service.atualizar(data.id, payload) :
            this.service.criar(payload))
            .subscribe(() => { this.form.reset(); this.load(); });
    }
    editar(i: Imovel) { this.form.patchValue(i); }
    remover(i: Imovel) {
        if (i.id) this.service.remover(i.id).subscribe(() =>
            this.load());
    }
}

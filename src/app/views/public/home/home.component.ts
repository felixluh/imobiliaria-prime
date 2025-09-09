import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImoveisService } from '../../../core/services/imovel.service';
import { Imovel } from '../../../core/models/imovel.model';
import { RouterModule } from '@angular/router';
import { CardImovelComponent } from '../../../templates/components/card-imovel/card-imovel.component';

@Component({
  standalone: true,
  imports: [CommonModule, CardImovelComponent], // adicione aqui
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  imoveis: Imovel[] = [];

  constructor(private service: ImoveisService) {}

  ngOnInit() {
    this.service.listar().subscribe(d => this.imoveis = d);
  }
}

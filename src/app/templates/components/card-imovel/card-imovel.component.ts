import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Imovel } from '../../../core/models/imovel.model';

@Component({
selector: 'app-card-imovel',
standalone: true,
imports: [CommonModule, RouterModule],
templateUrl: './card-imovel.component.html',
styleUrls: ['./card-imovel.component.scss']
})

export class CardImovelComponent {
@Input() imovel!: Imovel;
}
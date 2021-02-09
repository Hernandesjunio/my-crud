import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { Cliente } from '../models/cliente.model';

@Component({
  selector: 'app-display',
  templateUrl: './display.component.html',
  styleUrls: ['./display.component.scss'],
})
export class DisplayComponent implements OnInit {
  @Input() cliente: Cliente;
  @Output() save = new EventEmitter<Cliente>();
  @Output() delete = new EventEmitter<number>();
  isEditing = false;
  constructor() {}

  ngOnInit(): void {}

  gravar(cliente: Cliente) {
    this.isEditing = false;
    this.save.emit(cliente);
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cliente } from './models/cliente.model';

@Injectable({
  providedIn: 'root',
})
export class ClienteService {
  constructor(private http: HttpClient) {}

  private readonly api = 'http://localhost:3000';

  buscarCliente(): Observable<Cliente[]> {
    return this.http.get<Cliente[]>(`${this.api}/clientes`);
  }

  excluirCliente(id: number): Observable<any> {
    return this.http.delete(`${this.api}/clientes/${id}`);
  }

  criarCliente(cliente: Cliente): Observable<Cliente> {
    return this.http.post<Cliente>(`${this.api}/clientes`, cliente);
  }

  atualizarCliente(cliente: Cliente): Observable<Cliente> {

    return this.http.put<Cliente>(
      `${this.api}/clientes/${cliente.id}`,
      cliente
    );
  }
}

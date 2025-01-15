import { Injectable } from '@angular/core';
import { Pagination } from '@shared/interfaces/pagination.interface';

@Injectable({
  providedIn: 'root',
})
export class PaginationService {
  private states: Record<string, Pagination> = {};

  getState(stateKey: string): Pagination | null {
    return this.states[stateKey] || null;
  }

  setState(stateKey: string, pagination: Pagination): void {
    this.states[stateKey] = pagination;
  }

  resetState(stateKey: string): void {
    delete this.states[stateKey];
  }
}

import { Injectable } from '@angular/core';
import { Place } from './place.model';

@Injectable({
  providedIn: 'root',
})
export class PlacesService {
  private _places: Place[] = [
    new Place(
      'p1',
      'Manhattan Mansion',
      'New York',
      'https://i.pinimg.com/originals/8f/c6/f7/8fc6f7319a45f87aeb4fbc9be96b9ff7.jpg',
      159.99
    ),
    new Place(
      'p2',
      'Monte Carlo',
      'France',
      'https://k7f6k2y7.stackpathcdn.com/wp-content/uploads/2020/05/Monte-Carlo-Casino-revenue-900x600.jpg',
      189.99
    ),
    new Place(
      'p3',
      'Foggy Palace',
      'Transylvania',
      'https://i.pinimg.com/originals/9c/88/44/9c8844b217bdb6c17db14f51ad2e51a5.jpg',
      99.99
    ),
    new Place(
      'p4',
      'Lagos Island',
      'Ikoyi',
      'https://images.squarespace-cdn.com/content/v1/5bf48451620b851a77ad58d9/1553626311267-I5R4NU40YL8MJG7G4O5C/LASWA+Five+Cowries+Terminal+Ikoyi.jpeg',
      99.99
    ),
  ];

  get places() {
    return [...this._places];
  }

  constructor() {}

  getPlace(id: string) {
    return {...this._places.find(
      p => p.id === id)};
  }
}

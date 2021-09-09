import { formatDate } from '@angular/common';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { take, map, tap, delay } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';
import { Place } from './place.model';

@Injectable({
  providedIn: 'root',
})
export class PlacesService {
  private _places = new BehaviorSubject<Place[]>([
    new Place(
      'p1',
      'Manhattan Mansion',
      'New York',
      'Its a spacious newly renovated spacious 3 bedrooms flat in a serviced mini-estate with a swimming pool tennis court green area with a 24 electricity in Ikeja GRA for rent, apartment tiled round, painted, spacious sitting room with a dining section and a visitors toilet, fitted with air conditioner, well furnished kitchen with cabinets, water heater and an emergency exit. Spacious bedrooms with wardrobe and a toilet and bathroom shared by both rooms with water heater, master bedroom en-suite with a walk-in closet, water heater and more.',
      'https://i.pinimg.com/originals/8f/c6/f7/8fc6f7319a45f87aeb4fbc9be96b9ff7.jpg',
      159.99,
      'Bungalow',
      new Date('2019-12-31'),
      'Daniel',
      '2 Bed Rooms'
    ),
    new Place(
      'p2',
      'Monte Carlo',
      'France',
      'Its a spacious newly renovated spacious 3 bedrooms flat in a serviced mini-estate with a swimming pool tennis court green area with a 24 electricity in Ikeja GRA for rent, apartment tiled round, painted, spacious sitting room with a dining section and a visitors toilet, fitted with air conditioner, well furnished kitchen with cabinets, water heater and an emergency exit. Spacious bedrooms with wardrobe and a toilet and bathroom shared by both rooms with water heater, master bedroom en-suite with a walk-in closet, water heater and more.',
      'https://k7f6k2y7.stackpathcdn.com/wp-content/uploads/2020/05/Monte-Carlo-Casino-revenue-900x600.jpg',
      189.99,
      'Duplex',
      new Date(),
      'Daniel',
      '3 Bed Rooms'
    ),
    new Place(
      'p3',
      'Foggy Palace',
      'Transylvania',
      'Its a spacious newly renovated spacious 3 bedrooms flat in a serviced mini-estate with a swimming pool tennis court green area with a 24 electricity in Ikeja GRA for rent, apartment tiled round, painted, spacious sitting room with a dining section and a visitors toilet, fitted with air conditioner, well furnished kitchen with cabinets, water heater and an emergency exit. Spacious bedrooms with wardrobe and a toilet and bathroom shared by both rooms with water heater, master bedroom en-suite with a walk-in closet, water heater and more.',
      'https://i.pinimg.com/originals/9c/88/44/9c8844b217bdb6c17db14f51ad2e51a5.jpg',
      99.99,
      'Block of Flat',
      new Date(),
      'Daniel',
      '2 Bed Rooms'
    ),
    new Place(
      'p4',
      'Lagos Island',
      'Ikoyi',
      'Its a spacious newly renovated spacious 3 bedrooms flat in a serviced mini-estate with a swimming pool tennis court green area with a 24 electricity in Ikeja GRA for rent, apartment tiled round, painted, spacious sitting room with a dining section and a visitors toilet, fitted with air conditioner, well furnished kitchen with cabinets, water heater and an emergency exit. Spacious bedrooms with wardrobe and a toilet and bathroom shared by both rooms with water heater, master bedroom en-suite with a walk-in closet, water heater and more.',
      'https://images.squarespace-cdn.com/content/v1/5bf48451620b851a77ad58d9/1553626311267-I5R4NU40YL8MJG7G4O5C/LASWA+Five+Cowries+Terminal+Ikoyi.jpeg',
      99.99,
      'Duplex',
      new Date(),
      'Daniel',
      '2 Bed Rooms'
    ),
  ]);

  get places() {
    return this._places.asObservable();
  }

  constructor(private authService: AuthService) {}

  getPlace(id: string) {
    return this.places.pipe(
      take(1),
      map((places) => {
        return { ...places.find((p) => p.id === id) };
      })
    );
  }

  addPlace(
    title: string,
    location: string,
    description: string,
    price: number,
    type: string,
    date: Date,
    rooms: string
  ) {
    const newPlace = new Place(
      Math.random().toString(),
      title,
      location,
      description,
      'https://images.squarespace-cdn.com/content/v1/5bf48451620b851a77ad58d9/1553626311267-I5R4NU40YL8MJG7G4O5C/LASWA+Five+Cowries+Terminal+Ikoyi.jpeg',
      price,
      type,
      date,
      this.authService.userId,
      rooms
    );

    return this.places
      .pipe(
        take(1),
      delay(1000),
      tap(places => {
        this._places.next(places.concat(newPlace));
      })
    );
  }

  // updatePlace(placeId: string, title: string, description: string) {
  //   return this.places.pipe(
  //     take(1),
  //     delay(1000),
  //     tap(places => {
  //       const updatedPlaceIndex = places.findIndex(pl => pl.id === placeId);
  //       const updatedPlaces = [...places];
  //       const oldPlace = updatedPlaces[updatedPlaceIndex];
  //       updatedPlaces[updatedPlaceIndex] = new Place(
  //         oldPlace.id,
  //         title,
  //         description,
  //         oldPlace.imageUrl,
  //         oldPlace.price,
  //         oldPlace.availableFrom,
  //         oldPlace.availableTo,
  //         oldPlace.userId
  //       );
  //       this._places.next(updatedPlaces);
  //     })
  //   );
  // }
}

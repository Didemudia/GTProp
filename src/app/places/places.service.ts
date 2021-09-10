import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { take, map, tap, delay, switchMap } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';
import { Place } from './place.model';

interface PlaceData {
  title: string;
  location: string;
  description: string;
  imageUrl: string;
  price: number;
  type: string;
  date: string;
  userId: string;
  rooms: string;
}

@Injectable({
  providedIn: 'root',
})
export class PlacesService {
  private _places = new BehaviorSubject<Place[]>([
    // new Place(
    //   'p1',
    //   'Manhattan Mansion',
    //   'New York',
    //   'Its a spacious newly renovated spacious 3 bedrooms flat in a serviced mini-estate with a swimming pool tennis court green area with a 24 electricity in Ikeja GRA for rent, apartment tiled round, painted, spacious sitting room with a dining section and a visitors toilet, fitted with air conditioner, well furnished kitchen with cabinets, water heater and an emergency exit. Spacious bedrooms with wardrobe and a toilet and bathroom shared by both rooms with water heater, master bedroom en-suite with a walk-in closet, water heater and more.',
    //   'https://i.pinimg.com/originals/8f/c6/f7/8fc6f7319a45f87aeb4fbc9be96b9ff7.jpg',
    //   159.99,
    //   'Bungalow',
    //   new Date('2019-12-31'),
    //   'Daniel',
    //   '2 Bed Rooms'
    // ),
    // new Place(
    //   'p2',
    //   'Monte Carlo',
    //   'France',
    //   'Its a spacious newly renovated spacious 3 bedrooms flat in a serviced mini-estate with a swimming pool tennis court green area with a 24 electricity in Ikeja GRA for rent, apartment tiled round, painted, spacious sitting room with a dining section and a visitors toilet, fitted with air conditioner, well furnished kitchen with cabinets, water heater and an emergency exit. Spacious bedrooms with wardrobe and a toilet and bathroom shared by both rooms with water heater, master bedroom en-suite with a walk-in closet, water heater and more.',
    //   'https://k7f6k2y7.stackpathcdn.com/wp-content/uploads/2020/05/Monte-Carlo-Casino-revenue-900x600.jpg',
    //   189.99,
    //   'Duplex',
    //   new Date(),
    //   'Daniel',
    //   '3 Bed Rooms'
    // ),
    // new Place(
    //   'p3',
    //   'Foggy Palace',
    //   'Transylvania',
    //   'Its a spacious newly renovated spacious 3 bedrooms flat in a serviced mini-estate with a swimming pool tennis court green area with a 24 electricity in Ikeja GRA for rent, apartment tiled round, painted, spacious sitting room with a dining section and a visitors toilet, fitted with air conditioner, well furnished kitchen with cabinets, water heater and an emergency exit. Spacious bedrooms with wardrobe and a toilet and bathroom shared by both rooms with water heater, master bedroom en-suite with a walk-in closet, water heater and more.',
    //   'https://i.pinimg.com/originals/9c/88/44/9c8844b217bdb6c17db14f51ad2e51a5.jpg',
    //   99.99,
    //   'Block of Flat',
    //   new Date(),
    //   'Daniel',
    //   '2 Bed Rooms'
    // ),
    // new Place(
    //   'p4',
    //   'Lagos Island',
    //   'Ikoyi',
    //   'Its a spacious newly renovated spacious 3 bedrooms flat in a serviced mini-estate with a swimming pool tennis court green area with a 24 electricity in Ikeja GRA for rent, apartment tiled round, painted, spacious sitting room with a dining section and a visitors toilet, fitted with air conditioner, well furnished kitchen with cabinets, water heater and an emergency exit. Spacious bedrooms with wardrobe and a toilet and bathroom shared by both rooms with water heater, master bedroom en-suite with a walk-in closet, water heater and more.',
    //   'https://images.squarespace-cdn.com/content/v1/5bf48451620b851a77ad58d9/1553626311267-I5R4NU40YL8MJG7G4O5C/LASWA+Five+Cowries+Terminal+Ikoyi.jpeg',
    //   99.99,
    //   'Duplex',
    //   new Date(),
    //   'Daniel',
    //   '2 Bed Rooms'
    // ),
  ]);

  get places() {
    return this._places.asObservable();
  }

  constructor(private authService: AuthService, private http: HttpClient) {}

  fetchPlaces() {
    return this.http
      .get<{ [key: string]: PlaceData }>(
        'https://ionic-angular-fab2b-default-rtdb.firebaseio.com/offered-properties.json'
      )
      .pipe(
        map((resData) => {
          const places = [];
          for (const key in resData) {
            if (resData.hasOwnProperty(key)) {
              places.push(
                new Place(
                  key,
                  resData[key].title,
                  resData[key].location,
                  resData[key].description,
                  resData[key].imageUrl,
                  resData[key].price,
                  resData[key].type,
                  new Date(resData[key].date),
                  resData[key].userId,
                  resData[key].rooms
                )
              );
            }
          }
          return places;
          // return [];
        }),
        tap((places) => {
          this._places.next(places);
        })
      );
  }

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
    let generatedId: string;
    const newPlace = new Place(
      Math.random().toString(),
      title,
      location,
      description,
      'https://www.carlylepropertymanagement.com/wp-content/uploads/2020/11/wellesley2.jpg',
      price,
      type,
      date,
      this.authService.userId,
      rooms
    );

    return this.http
      .post<{ name: string }>(
        'https://ionic-angular-fab2b-default-rtdb.firebaseio.com/offered-properties.json',
        { ...newPlace, id: null }
      )
      .pipe(
        switchMap((resData) => {
          generatedId = resData.name;
          return this.places;
        }),
        take(1),
        tap((places) => {
          newPlace.id = generatedId;
          this._places.next(places.concat(newPlace));
        })
      );

    // return this.places.pipe(
    //   take(1),
    //   delay(1000),
    //   tap((places) => {
    //     this._places.next(places.concat(newPlace));
    //   })
    // );
  }

  updatePlace(placeId: string, title: string, description: string) {
    let updatedPlaces: Place[];
    return this.places.pipe(
      take(1),
      switchMap((places) => {
        const updatedPlaceIndex = places.findIndex((pl) => pl.id === placeId);
        const updatedPlaces = [...places];
        const oldPlace = updatedPlaces[updatedPlaceIndex];
        updatedPlaces[updatedPlaceIndex] = new Place(
          oldPlace.id,
          title,
          description,
          oldPlace.location,
          oldPlace.imageUrl,
          oldPlace.price,
          oldPlace.type,
          oldPlace.date,
          oldPlace.userId,
          oldPlace.rooms,
        );
        return this.http.put(
          `https://ionic-angular-fab2b-default-rtdb.firebaseio.com/offered-properties/${placeId}.json`,
          { ...updatedPlaces[updatedPlaceIndex], id: null }
        );
      }),
      tap(() => {
        this._places.next(updatedPlaces);
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

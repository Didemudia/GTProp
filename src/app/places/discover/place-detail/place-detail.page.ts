import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  ActionSheetController,
  ModalController,
  NavController,
} from '@ionic/angular';
import { Subscription } from 'rxjs';
import { CreateBookingComponent } from '../../../bookings/create-booking/create-booking.component';
import { Place } from '../../place.model';
import { PlacesService } from '../../places.service';

@Component({
  selector: 'app-place-detail',
  templateUrl: './place-detail.page.html',
  styleUrls: ['./place-detail.page.scss'],
})
export class PlaceDetailPage implements OnInit, OnDestroy {
  place: Place;
  private placeSub: Subscription;
  likeIcon: string = 'heart-outline';
  like: boolean = true;


  constructor(
    private navCtrl: NavController,
    private route: ActivatedRoute,
    private placesService: PlacesService,
    private modalCtrl: ModalController,
    private actionSheetCtrl: ActionSheetController
  ) {}

  ngOnInit() {
    this.placeSub = this.route.paramMap.subscribe((paramMap) => {
      if (!paramMap.has('placeId')) {
        this.navCtrl.navigateBack('/places/tabs/discover');
        return;
      }
      this.placesService
        .getPlace(paramMap.get('placeId'))
        .subscribe((place) => {
          this.place = place;
        });
    });
  }

  onBookPlace() {
    //this.router.navigateByUrl('/places/tabs/discover');
    //this.navCtrl.navigateBack('/places/tabs/discover');
    this.actionSheetCtrl
      .create({
        header: 'Contact Agent',
        buttons: [
          {
            text: 'Via Phone Call',
            icon: 'call-outline',
            handler: () => {
              this.openBookingModal('select');
            },
          },
          {
            text: 'Via Text Message',
            icon: 'chatbox-ellipses-outline',
            handler: () => {
              this.openBookingModal('random');
            },
          },
          {
            icon: 'close-outline',
            text: 'Cancel',
            role: 'cancel',
          },
        ],
      })
      .then((actionSheetEl) => {
        actionSheetEl.present();
      });
    // this.modalCtrl
    //   .create({
    //     component: CreateBookingComponent,
    //     componentProps: { selectedPlace: this.place },
    //   })
    //   .then((modalEl) => {
    //     modalEl.present();
    //     return modalEl.onDidDismiss();
    //   })
    //   .then((resultData) => {
    //     console.log(resultData.data, resultData.role);
    //     if (resultData.role === 'confirm') {
    //       console.log('Booked!');
    //     }
    //   });
  }

  openBookingModal(mode: 'select' | 'random') {
    console.log(mode);
  }


  toggleLiked(): void {
    this.like = !this.like;
  }



  ngOnDestroy() {
    if (this.placeSub) {
      this.placeSub.unsubscribe();
    }
  }
}

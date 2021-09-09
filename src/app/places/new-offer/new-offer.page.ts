import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { PlacesService } from '../places.service';

@Component({
  selector: 'app-new-offer',
  templateUrl: './new-offer.page.html',
  styleUrls: ['./new-offer.page.scss'],
})
export class NewOfferPage implements OnInit {
  form: FormGroup;

  constructor(
    private placesServices: PlacesService,
    private router: Router,
    // private fb: FormBuilder,
    private loadingCtrl: LoadingController
  ) {}

  ngOnInit() {
    //this.createForm();
    this.form = new FormGroup({
      title: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required],
      }),
      location: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required],
      }),
      description: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required, Validators.maxLength(700)],
      }),
      price: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required, Validators.min(1)],
      }),
      type: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required],
      }),
      rooms: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required],
      }),
      date: new FormControl(new Date),
    });
  }

  // createForm = () => {
  //   this.form = this.fb.group({
  //     title: ['', { updateOn: 'blur', validators: [Validators.required] }],
  //     location: ['', { updateOn: 'blur', validators: [Validators.required] }],
  //     description: [
  //       '',
  //       {
  //         updateOn: 'blur',
  //         validators: [Validators.required, Validators.maxLength(700)],
  //       },
  //     ],
  //     price: ['', { updateOn: 'blur', validators: [Validators.required] }],
  //     type: ['', { updateOn: 'blur', validators: [Validators.required] }],
  //     rooms: ['', { updateOn: 'blur', validators: [Validators.required] }],
  //     date: [new Date()],
  //   });
  // };

  // onCreate = (name: string): void => {};

  onCreateOffer() {
    if (!this.form.valid) {
      return;
    }
      this.loadingCtrl
        .create({
          message: 'Adding Property...',
        })
        .then(loadingEl => {
          loadingEl.present();
          this.placesServices
            .addPlace(
              this.form.value.title,
              this.form.value.location,
              this.form.value.description,
              this.form.value.price,
              this.form.value.type,
              this.form.value.date,
              this.form.value.rooms,

            )
            .subscribe(() => {
              loadingEl.dismiss();
              this.form.reset();
              this.router.navigate(['/places/tabs/discover']);
            });
        });

  }
}

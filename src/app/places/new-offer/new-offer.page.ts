import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PlacesService } from '../places.service';

@Component({
  selector: 'app-new-offer',
  templateUrl: './new-offer.page.html',
  styleUrls: ['./new-offer.page.scss'],
})
export class NewOfferPage implements OnInit {
  form: FormGroup;

  constructor(private placesServices: PlacesService, private router: Router) {}

  ngOnInit() {
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
      date: new FormControl(new Date()),
    });
  }

  onCreateOffer() {
    if (!this.form.valid) {
      return;
    } else {
      this.placesServices.addPlace(
        this.form.value.title,
        this.form.value.location,
        this.form.value.description,
        +this.form.value.price,
        this.form.value.type,
        this.form.value.rooms,
        this.form.value.date
      );
      this.form.reset();
      this.router.navigate(['/places/tabs/discover']);
    }
  }
}

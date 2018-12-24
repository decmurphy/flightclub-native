import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

import { CesiumService } from '../cesium.service';

@Component({
  selector: 'fc-photographer-settings-dlg',
  templateUrl: './photographer-settings-dlg.component.html',
  styleUrls: ['./photographer-settings-dlg.component.scss']
})
export class PhotographerSettingsDlgComponent implements OnInit {

  form: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<PhotographerSettingsDlgComponent>,
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private cesiumService: CesiumService
  ) { }

  ngOnInit() {
    this.resetForm();
  }

  resetForm() {

    this.form = this.formBuilder.group({
      fieldOfView: [this.data.photographerSettings.fieldOfView],
      aspectRatio: [this.data.photographerSettings.aspectRatio],
      origin: this.formBuilder.group({
        latitude: [this.data.photographerSettings.origin.latitude, Validators.required],
        longitude: [this.data.photographerSettings.origin.longitude, Validators.required],
        elevation: [this.data.photographerSettings.origin.elevation],
      })
    });

  }

  formInvalid(): boolean {
    const rawForm = this.form.getRawValue();
    return this.form.invalid || Number.isNaN(rawForm.origin.latitude) || Number.isNaN(rawForm.origin.longitude);
  }

  save() {

    const rawForm = this.form.getRawValue();

    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {
        ...this.route.snapshot.queryParams,
        latitude: rawForm.origin.latitude,
        longitude: rawForm.origin.longitude,
        elevation: rawForm.origin.elevation,
        aspectRatio: rawForm.aspectRatio,
        fieldOfView: rawForm.fieldOfView
      }
    });

    const target = {
        latitude: this.data.site.latitude,
        longitude: this.data.site.longitude
    };

    const newSettings = {
        origin: {
            latitude: parseFloat(rawForm.origin.latitude),
            longitude: parseFloat(rawForm.origin.longitude),
            elevation: parseFloat(rawForm.origin.elevation) || 2
        },
        fieldOfView: rawForm.fieldOfView * Math.PI / 180.0,
        aspectRatio: rawForm.aspectRatio
    };

    this.cesiumService.setGroundCameraLookingAt(target, newSettings);

    this.dialogRef.close(true);
  }

  cancel() {
    this.dialogRef.close(false);
  }

}

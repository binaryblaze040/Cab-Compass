import { Component } from '@angular/core';
import { Cab, CabValidation } from '../../types/cab';
import { CabService } from '../../services/cab.service';
import { SnackbarService } from '../../services/snackbar.service';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-cab',
  templateUrl: './add-cab.component.html',
  styleUrl: './add-cab.component.scss'
})
export class AddCabComponent {

  errors: CabValidation;

  newCab: Cab;

  capacity: string = "";
  
  constructor(
    private dialogRef: MatDialogRef<AddCabComponent>,
    private _cabService: CabService,
    private _snackbar: SnackbarService,
  ) {
    this.newCab = {
      registrationNumber: '',
      driverName: '',
      driverLicenseNumber: '',
      type: '',
      model: '',
      contact: '',
      capacity: 0,
      available: false
    };

    this.errors = {
      registrationNumber: false,
      driverName: false,
      driverLicenseNumber: false,
      type: false,
      model: false,
      contact: {
        required: false,
        invalid: false
      },
      capacity: false
    };
  }

  validateForm(): boolean {
    let isValid = true;
    if(this.newCab.registrationNumber.length === 0) {
      this.errors.registrationNumber = true;
      isValid = false;
    }
    
    if(this.newCab.driverName.length === 0) {
      this.errors.driverName = true;
      isValid = false;
    }

    if(this.newCab.driverLicenseNumber.length === 0) {
      this.errors.driverLicenseNumber = true;
      isValid = false;
    }


    const phoneRegexPattern = /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/;

    if(this.newCab.contact.length === 0) {
      this.errors.contact.required = true;
      isValid = false;
    }
    else if(!phoneRegexPattern.test(this.newCab.contact)) {
      this.errors.contact.invalid = true;
      isValid = false;
    }
    
    if(this.newCab.type.length === 0) {
      this.errors.type = true;
      isValid = false;
    }

    if(this.newCab.model.length === 0) {
      this.errors.model = true;
      isValid = false;
    }
    
    const capacityInNumber = Number(this.capacity);
    if(!Number.isInteger(capacityInNumber) || capacityInNumber < 1 || capacityInNumber > 10) {
      this.errors.capacity = true;
      isValid = false;
    }
    
    this.newCab.capacity = capacityInNumber;

    return isValid;
  }

  confirm(): void {
    // Perform any action needed (e.g., save data) and close the dialog
    if(this.validateForm()) {
      this.newCab.available = false;
      this._cabService.addCab(this.newCab)
      .subscribe({
        next: (addedCab: Cab) => {
          this._snackbar.openSnackBar("center", "bottom", 5, addedCab.model + " added!");
        },
        error: (error) => {
          this._snackbar.openSnackBar("center", "bottom", 5, "Sorry, failed to add employee!");
          console.log(error);
        }
      });

      this.dialogRef.close(true);
    }
  }

  cancel(): void {
    // Close the dialog without any action
    this.dialogRef.close(false);
  }

}

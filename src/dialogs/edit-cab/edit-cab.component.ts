import { Component } from '@angular/core';
import { Cab, CabValidation } from '../../types/cab';
import { MatDialogRef } from '@angular/material/dialog';
import { CabService } from '../../services/cab.service';
import { SnackbarService } from '../../services/snackbar.service';

@Component({
  selector: 'app-edit-cab',
  templateUrl: './edit-cab.component.html',
  styleUrl: './edit-cab.component.scss'
})
export class EditCabComponent {
  errors: CabValidation;

  editCab: Cab;
  
  constructor(
    private dialogRef: MatDialogRef<EditCabComponent>,
    private _cabService: CabService,
    private _snackbar: SnackbarService,
  ) {
    this.editCab = this._cabService.selectedCabForEdit;
    this.editCab.available = false;
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
    
    if(this.editCab.driverName.length === 0) {
      this.errors.driverName = true;
      isValid = false;
    }

    if(this.editCab.driverLicenseNumber.length === 0) {
      this.errors.driverLicenseNumber = true;
      isValid = false;
    }

    const phoneRegexPattern = /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/;

    if(this.editCab.contact.length === 0) {
      this.errors.contact.required = true;
      isValid = false;
    }
    else if(!phoneRegexPattern.test(this.editCab.contact)) {
      this.errors.contact.invalid = true;
      isValid = false;
    }

    return isValid;
  }

  confirm(): void {
    // Perform any action needed (e.g., save data) and close the dialog
    if(this.validateForm()) {
      this._cabService.editCabDetails(this.editCab)
      .subscribe({
        next: (editedCab: Cab) => {
          this._snackbar.openSnackBar("center", "bottom", 5, "Update details for " + editedCab.model + " successful!");
        },
        error: (error) => {
          this._snackbar.openSnackBar("center", "bottom", 5, "Sorry, failed to edit employee!");
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

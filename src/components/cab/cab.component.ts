import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SnackbarService } from '../../services/snackbar.service';
import { CabFilters } from '../../types';
import { Cab } from '../../types/cab';
import { CabService } from '../../services/cab.service';
import { AddCabComponent } from '../../dialogs/add-cab/add-cab.component';
import { EditCabComponent } from '../../dialogs/edit-cab/edit-cab.component';

@Component({
  selector: 'app-cab',
  templateUrl: './cab.component.html',
  styleUrl: './cab.component.scss'
})
export class CabComponent {
  filters: CabFilters = {};

  editMode = false;

  filteredCabs: Cab[] = [];

  allCabs: Cab[] = [];
  
  constructor(
    private _snackbar: SnackbarService,
    private _cabService: CabService,
    private dialog: MatDialog,
  ) {
  }

  ngOnInit(): void {
    this.filters = {
      available: false
    };
    this._cabService.getAllCabs()
    .subscribe({
      next: (data) => {
        this.filteredCabs = data;
        this.allCabs = data;
      },
      error: (error) => {
        console.error('Error fetching Cab: ', error);
      }
    });
  }

  containsSubstring(word: string, query: string): boolean {
    return word.toLowerCase().includes(query.toLowerCase());
  }

  getFilteredCabs(): void {
    this.filteredCabs = structuredClone(this.allCabs);
    if (this.filters.registrationNumber) {
      this.filteredCabs = this.filteredCabs.filter((cab) => {
        return this.filters.registrationNumber
          ? cab.registrationNumber === this.filters.registrationNumber
          : true;
      });
    }

    if (this.filters.driverLicenseNumber) {
      this.filteredCabs = this.filteredCabs.filter((cab) => {
        return this.filters.driverLicenseNumber
          ? this.containsSubstring(cab.driverLicenseNumber, this.filters.driverLicenseNumber)
          : true;
      });
    }

    if (this.filters.contact) { 
      this.filteredCabs = this.filteredCabs.filter((cab) => {
        return this.filters.contact
          ? this.containsSubstring(
              cab.contact.toString(),
              this.filters.contact.toString()
            )
          : true;
      });
    }

    if (this.filters.type) {
      this.filteredCabs = this.filteredCabs.filter((cab) => {
        return this.filters.type
          ? this.containsSubstring(cab.type, this.filters.type)
          : true;
      });
    }

    if (this.filters.available) {
      this.filteredCabs = this.filteredCabs.filter((cab) => {
        return this.filters.available
          ? cab.available === this.filters.available
          : true;
      });
    }

    if (this.filters.capacity) {
      this.filteredCabs = this.filteredCabs.filter((cab) => {
        return this.filters.capacity
          ? cab.capacity >= this.filters.capacity
          : true;
      });
    }

    this._snackbar.openSnackBar("center", "bottom", 5, "Filters applied, " + this.filteredCabs.length + (this.filteredCabs.length > 1? " cabs found!" : " cab found!"));
  }

  toggleEditMode(): void {
    this.editMode = !this.editMode;
  }

  switchCabAvailability(): void {
    this.filters.available = !this.filters.available;
    this.getFilteredCabs();
  }

  addNewCab(): void {
    const dialogRef = this.dialog.open(AddCabComponent);
    dialogRef.afterClosed().subscribe();
  }

  editCab(cab: Cab): void {
    // open a model to get the changes
    this._cabService.selectedCabForEdit = cab;
    const dialogRef = this.dialog.open(EditCabComponent);
    dialogRef.afterClosed().subscribe();
  }

  deleteCab(cab: Cab): void {
    if (confirm("Are you sure you want to delete " + cab.model + " with Regn: " + cab.registrationNumber + " ?") == true) {
      this._cabService.deleteCab(cab)
      .subscribe({
        next: (updatedCab: Cab) => {
          this._snackbar.openSnackBar("center", "bottom", 5, updatedCab.model + " deleted successfully!");
        },
        error: (error) => {
          this._snackbar.openSnackBar("center", "bottom", 5, "Sorry, deletion failed!");
          console.error('Error deleting cab: ', error);
        }
      });
    }
  }

}

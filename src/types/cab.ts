import { EmployeeWithCabRequirement, errorType } from "./employee";

export interface Cab {
    registrationNumber: string;
    driverName: string;
    driverLicenseNumber: string;
    type: string;
    model: string;
    contact: string;
    available: boolean;
    capacity: number;
}

export interface CabValidation {
    registrationNumber: boolean;
    driverName: boolean;
    driverLicenseNumber: boolean;
    type: boolean;
    model: boolean;
    contact: errorType;
    capacity: boolean;
}

export interface CabWithAssignedEmployees extends Cab {
    employees: EmployeeWithCabRequirement[];
}

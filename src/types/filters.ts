import { EmployeeWithCabRequirement } from "./employee";

export interface EmployeeFilters {
    employeeId?: string;
    name?: string;
    email?: string;
    contact?: number;
    designation?: string;
    address?: string;
}

export interface CabFilters {
    registrationNumber?: string;
    driverLicenseNumber?: string;
    type?: string;
    contact?: string;
    available?: boolean;
    capacity?: number;
}

export interface AssignedCabFilters {
    registrationNumber?: string;
    employeeId?: string;
    employeeContact?: string;
    employeeEmail?: string;
}
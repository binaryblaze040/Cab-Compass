export interface Employee {
    employeeId: string;
    name: string;
    email: string;
    contact: number;
    designation: string;
    address: string;
}

export interface EmployeeValidation {
    employeeId: boolean;
    name: boolean;
    email: errorType;
    contact: errorType;
    designation: boolean;
    address: boolean;
}

export interface errorType {
    required: boolean;
    invalid: boolean;
}
export class LocationDto {
    id: string;

    name: string;
}

export class ClientInfoDto {

    id: string;

    nit: string;

    fullName: string;

    address: string;

    phone: string;

    country: LocationDto;

    city: LocationDto;

    state: LocationDto;

    space: number;

    percentageVisits: number;
        
}
    
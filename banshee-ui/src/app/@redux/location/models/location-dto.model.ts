export class CityDto {
    id: string;

    name: string;
}

export class StateDto {
    id: string;

    name: string;

    cities: CityDto[]
}

export class LocationDto {

    id: string;

    name: string;

    states: StateDto[];
        
}
    
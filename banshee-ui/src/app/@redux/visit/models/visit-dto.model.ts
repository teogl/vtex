import { SellerDto } from '@redux/seller/models/seller-dto.model';

export class VisitDto {

    id: string;

    date: Date;

    seller: SellerDto;

    total: number;

    description: string;

    clientInfoId: string;
        
}
    
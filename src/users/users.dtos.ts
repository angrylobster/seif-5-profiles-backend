import { Expose } from 'class-transformer';
import { NameDetails } from './users.entity';

export class UserNameDetails {
    @Expose()
    name: NameDetails;
}
import { BasicDto } from 'src/infrastructure/contracts/BasicDTO';
import { ROLES } from 'src/common/constants/roles';
import { CamelizeKeys } from 'src/infrastructure/types/common/camelizeKeys';

export class UserDto extends BasicDto {
  email: string;
  firstName: string;
  lastName: string;
  id: number;
  password: string;
  role: {
    type: keyof typeof ROLES;
    id: number;
  };

  clone<UserDto>(data: object): UserDto {
    const dto = new UserDto();
    Object.assign(dto, data);
    return dto as UserDto;
  }

  present(): CamelizeKeys<this> {
    const result = super.present();
    delete result.password;
    return result;
  }
}

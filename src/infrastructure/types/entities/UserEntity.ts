import { ROLES } from 'src/common/constants/roles';

interface UserEntity {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  password: string;
  role: {
    type: keyof typeof ROLES;
  };
}

export type { UserEntity };

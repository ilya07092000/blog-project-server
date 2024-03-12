const ROLES = {
  ADMIN: 'ADMIN',
  USER: 'USER',
  MODERATOR: 'MODERATOR',
};

const DEFAULT_ROLE: keyof typeof ROLES = ROLES.USER as keyof typeof ROLES;

export { ROLES, DEFAULT_ROLE };

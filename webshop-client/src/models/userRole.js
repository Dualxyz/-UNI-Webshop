export const UserRole = {
  Buyer: 0,
  Seller: 1,
  Admin: 2,
};

export const AllowedRoles = [UserRole.Buyer, UserRole.Seller];

export function roleIdToName(roleId) {
  return Object.keys(UserRole).find((key) => UserRole[key] === roleId);
}

export function roleNameToId(roleName) {
  return UserRole[roleName];
}

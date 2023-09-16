export function registerRequestDto(data) {
  return {
    username: data.username,
    email: data.email,
    password: data.password,
    firstName: data.firstName,
    lastName: data.lastName,
    birthdate: data.birthdate,
    address: data.address,
    role: parseInt(data.role),
  };
}

export function registerResponseDto(data) {
  return {
    id: data.id,
    username: data.username,
    email: data.email,
    password: data.password,
    firstName: data.firstName,
    lastName: data.lastName,
    birthdate: data.birthdate,
    address: data.address,
    role: data.role,
  };
}

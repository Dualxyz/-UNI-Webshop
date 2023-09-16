export function userRequestDto(data) {
  return {
    username: data.username,
    email: data.email,
    firstName: data.firstName,
    lastName: data.lastName,
    birthdate: data.birthdate,
    address: data.address,
    role: data.role,
  };
}

export function userResponseDto(data) {
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
    verificationStatus: data.verificationStatus,
  };
}

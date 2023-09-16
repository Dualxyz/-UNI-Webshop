export function loginRequestDto(data) {
  return {
    email: data.email,
    password: data.password,
  };
}

export function loginResponseDto(data) {
  return {
    id: data.id,
    token: data.token,
  };
}

export function verificationRequestDto(data) {
  return {
    verificationStatus: parseInt(data.verificationStatus),
  };
}

export function verificationResponseDto(data) {
  return {
    id: data.id,
    verificationStatus: data.verificationStatus,
  };
}

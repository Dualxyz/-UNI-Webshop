export const VerificationStatus = {
  Pending: 0,
  Rejected: 1,
  Accepted: 2,
};

export const AllowedStatuses = [
  VerificationStatus.Rejected,
  VerificationStatus.Accepted,
];

export function statusIdToName(statusId) {
  return Object.keys(VerificationStatus).find(
    (key) => VerificationStatus[key] === statusId
  );
}

export function statusNameToId(statusName) {
  return VerificationStatus[statusName];
}

export function getString(body: any, key: string): string {
  if (!body?.[key]) throw new Error(`Field ${key} not found`);
  return String(body?.[key]);
}

export function getNumber(body: any, key: string): number {
  const field = Number(getString(body, key));
  if (Number.isNaN(field)) {
    throw new Error(`Field ${key} is not a number`);
  }
  return field;
}

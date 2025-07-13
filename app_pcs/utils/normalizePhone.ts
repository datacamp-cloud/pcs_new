export default function normalizePhone(num: string): string {
  return num.replace(/^(\+225|00225)/, '').replace(/\D/g, '');
}

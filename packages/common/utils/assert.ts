export default function assert(condition: boolean) {
  if (!condition) {
    throw new Error('assertion error');
  }
}

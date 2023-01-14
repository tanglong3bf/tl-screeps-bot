import {roleCarrier} from "./carrier";

it('source', () => {
  const result = roleCarrier().source(null);
  expect(result).toBe(false);
});

import { Match } from "meteor/check";

export const NotEmptyString = Match.Where((x) => {
  check(x, String);
  return x.length > 0;
});

export const EmailString = Match.Where((x) => {
  check(x, String);
  return /^([0-9a-zA-Z_\.-]+)@([0-9a-zA-Z_-]+)(\.[0-9a-zA-Z_-]+){1,2}$/.test(x);
});

export const PhoneString = Match.Where((x) => {
  check(x, String);
  return /^\d{3}-\d{3,4}-\d{4}$/.test(x);
});

export const BirthdayString = Match.Where((x) => {
  check(x, String);
  return /^(19[0-9][0-9]|20\d{2})\/(0[0-9]|1[0-2])\/(0[1-9]|[1-2][0-9]|3[0-1])$/.test(
    x,
  );
});

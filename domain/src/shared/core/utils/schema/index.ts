import { array } from "./array.shared.js"
import { boolean } from "./boolean.shared.js"
import { enum_ } from "./enum.shared.js"
import { number } from "./number.shared.js"
import { object } from "./object.shared.js"
import { string } from "./string.shared.js"
import { unknown } from "./unknown.shared.js"
import { record } from "./record.shared.js"
import { union } from "./union.shared.js"
import { lazy } from "./lazy.shared.js"

export * from "./validate-request.shared.js";

export const schema = {
  array,
  boolean,
  enum: enum_,
  number,
  object,
  string,
  unknown,
  record,
  union,
  lazy,
};
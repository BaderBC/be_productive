import {
  registerDecorator,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import momentTimezone from 'moment-timezone';

@ValidatorConstraint({ name: 'isValidTimezone', async: false })
export class IsValidTimezone implements ValidatorConstraintInterface {
  validate(timezone: string) {
    return momentTimezone.tz.zone(timezone) !== null;
  }
}

export function IsTimezone() {
  return function (object: object, propertyName: string) {
    registerDecorator({
      name: 'isTimezone',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [],
      validator: IsValidTimezone,
    });
  };
}

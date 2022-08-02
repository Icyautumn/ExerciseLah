import { FormControl, FormGroup } from '@angular/forms';

export function passwordMatchValidator(pwSet: FormGroup) {
  var password = pwSet.controls.newPassword.value;
  var password2 = pwSet.controls.confirmPassword.value;
  if ((password !== password2 )) {
    return {'notmatch': true};
  } else {
    return null;
  }


}

import { FormControl, FormGroup } from '@angular/forms';

export function passwordMatchValidator(pwSet: FormGroup) {
  var password = pwSet.controls.newPassword.value;
  console.log(password);
  var password2 = pwSet.controls.confirmPassword.value;
  console.log(password2);
  if ((password !== password2 )) {
    return {'notmatch': true};
  } else {
    return null;
  }


}

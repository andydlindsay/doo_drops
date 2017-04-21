import { Injectable } from '@angular/core';

@Injectable()
export class UservalidateService {

  constructor() { }

  validateRegister(user) {
    // flash

    // validate name field
    if(user.name == undefined || user.name == "") {

    }


    //   if(user.name == undefined || user.email == undefined || user.username == undefined || user.password == undefined) {
    //     return false;
    //   }
    return true;
  }

  validateEmail(email) {
    const re = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
    return re.test(email);
  }

}

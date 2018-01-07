export class User {
  name: string;
  photoURL: string;
  accountType: string;
  email: string;
  allData: any;

  constructor(values: Object = {}){
    Object.assign(this, values);
  }
}

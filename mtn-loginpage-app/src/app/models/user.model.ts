export class User {
    constructor(
      public status:string,
      public email: string,
      public password: string,
       public token: string,
       public localId: string,
       public expirationDate: Date
    ) {}
  
    get expireDate() {
        return this.expirationDate;
      }
    
      get userToken() {
        return this.token;
      }
}
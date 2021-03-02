
export class User{
    constructor(public email: string,
         public id: string,
         private _token: string,
         private _experationDate: Date
         ){

    }

    public get token(){
        if(!this._experationDate && new Date() > this._experationDate){
            return null;
        }
        return this._token;
    }
}
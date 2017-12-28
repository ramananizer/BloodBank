export class User {
    id: number;
    username: string;
    password: string;
    firstName: string;
    lastName: string;
    bloodGroup : string;
    address : string;
}

export class Requirement
{
    bloodGroup : string;
    name : string;
    address : string;
    description : string;
    _id : any;
}

export class ResponseModel
{
    description : string;
    requirementId : any;
}
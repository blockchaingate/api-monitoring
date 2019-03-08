export class ApiStatusInfo {
    API_Endpoint : string
    API_Call : string
    API_Status : Api_Status[]
    
    constructor(Api_Endpoint, Api_Call ){
        this.API_Endpoint = Api_Endpoint
        this.API_Call = Api_Call
    }
}

export class Api_Status {
    time : number // unix timestamp
    status : number // 0 for error and 1 for expected response
    response_time : number // response time in milliseconds
}   
export class GetAllServiceLogs {
    static readonly type = '[ServiceLogs] Get All Service Logs';
    constructor(public tableName: string, public serviceType: string) {}
  }

  export class GetAllService {
    static readonly type = '[ServiceLogs] Get All Service';

  }

  export class GetAllConstants {
    static readonly type = '[Constants] Get All Constants';
  }
  
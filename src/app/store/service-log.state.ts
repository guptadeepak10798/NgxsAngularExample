import { State, Action, StateContext, Selector } from '@ngxs/store';
import { GetAllService, GetAllServiceLogs } from './service-log.actions';
import { SharedServiceService } from '../components/services/shared-service.service';
import { Logs } from '../components/Model/logs.model';
import { Injectable } from '@angular/core';
// import { clear } from 'console'


// export interface ServiceLog {
//   id: number;
//   clientId: string;
//   userName: string;
//   requestData: string;
//   updatedTime: string;
//   createdTime: string;
//   responseData: string;
//   transactionId: string;
// }

export interface ServiceLogStateModel {
    serviceLogs: Logs[];
}

@State<ServiceLogStateModel>({
    name: 'serviceLogs',
    defaults: {
        serviceLogs: []
    }
})
@Injectable()
export class ServiceLogState {
    constructor(private sharedService: SharedServiceService) { }

    @Selector()
    static getServiceLogs(state: ServiceLogStateModel) {
        return state.serviceLogs;
    }

    @Action(GetAllServiceLogs)
    getAllServiceLogs(ctx: StateContext<ServiceLogStateModel>, action: GetAllServiceLogs) {

        this.sharedService.getServiceLogByTableName(action.tableName, action.serviceType).subscribe((res: Logs[]) => {
            console.log("insideeeeeee Actions===>");

            const state = ctx.getState();

            console.log("insideeeeeee Actions===>", state);
            ctx.patchState({
                serviceLogs: res
            });
        });
    }


    @Selector()
    static getServiceLog(state: ServiceLogStateModel) {
        return state.serviceLogs;
    }

    @Action(GetAllService)
    getAllService(ctx: StateContext<ServiceLogStateModel>, action: GetAllService) {

        this.sharedService.getServiceLog().subscribe((res: any) => {
            console.log("getServiceLog Actions===>");

            const state = ctx.getState();

            console.log("getServiceLog state Actions===> ", state);
            console.clear();
            ctx.patchState({
                serviceLogs: res
            });
            // ctx.setState(
            //     ...state,
            //     GetAllServiceLogs: res;


            // )

        });
    }
}

export { GetAllServiceLogs };


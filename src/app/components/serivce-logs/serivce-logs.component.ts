import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SharedServiceService } from '../services/shared-service.service';
import { Store } from '@ngxs/store';
import { GetAllServiceLogs, ServiceLogState } from 'src/app/store/service-log.state';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { Logs } from '../Model/logs.model';


@Component({
  selector: 'app-serivce-logs',
  templateUrl: './serivce-logs.component.html',
  styleUrls: ['./serivce-logs.component.css']
})
export class SerivceLogsComponent implements OnInit {
  serviceLogs: any[] = [];
 // data: any;
  tableName: string | undefined;
  serviceType: string | undefined;

  constructor(
    private store: Store,
    private service: SharedServiceService,
    private http: HttpClient,
    private router: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.tableName = this.router.snapshot.queryParams.tableName;
    this.serviceType = this.router.snapshot.queryParams.serviceType;

    console.log('OnInit tableName', this.tableName);
    console.log('OnInit serviceType', this.serviceType);
    this.getAllDatangxs();
  }

  
  // serviceLogArray: Logs[] = [];
  logsArray: Logs[] = [];
  @Select(ServiceLogState.getServiceLogs) serviceLogs$: Observable<Logs[]> | undefined;
  getAllDatangxs(){
    this.store.dispatch(new GetAllServiceLogs(this.tableName ?? '', this.serviceType ?? ''));
    
    if (this.serviceLogs$) {
      this.serviceLogs$.subscribe((res) => {
        console.log("service logs--=====>",res);
        this.logsArray = res;

      });
    }
  }
}

//   getAllServiceData() {
//     console.log('getServiceLog API call');
//     this.service.getServiceLogByTableName(this.tableName, this.serviceType).subscribe((res: any) => {
//       console.log('getServiceLogData', res);
//       this.serviceLogs = res;
//       console.log('API response from server', this.serviceLogs);

//       setTimeout(() => {
//         $('#datatableexample').DataTable({
//           pagingType: 'full_numbers',
//           pageLength: 5,
//           processing: true,
//           lengthMenu: [5, 10, 25, 50, 100],
//           order: [[0, 'desc']]
//         });
//       }, 1);
//     });
//   }
// }
// import { HttpClient } from '@angular/common/http';
// import { Component, OnInit } from '@angular/core';
// import { ActivatedRoute } from '@angular/router';
// // import { Column, GridOption } from 'angular-slickgrid';
// import { SharedServiceService } from '../services/shared-service.service';
// import { Store } from '@ngxs/store';
// import { GetAllServiceLogs, ServiceLogState } from 'src/app/store/service-log.state';
// import { Select } from '@ngxs/store';
// import { Observable } from 'rxjs';






// @Component({
//   selector: 'app-serivce-logs',
//   templateUrl: './serivce-logs.component.html',
//   styleUrls: ['./serivce-logs.component.css']
// })
// export class SerivceLogsComponent implements OnInit {

//   serviceLogs: any[] = [];
//   // searchText: any;
//   data: any;
//   // filteredData: any;
// // public data = [
// //   {name: 'Ajay', email: 'therichpost@gmail.com', website:'therichpost.com'},
// //   {name: 'Jas', email: 'therichpost@gmail.com', website:'therichpost.com'},
// //   {name: 'therichpost', email: 'therichpost@gmail.com', website:'therichpost.com'},
// //   {name: 'therichpost', email: 'therichpost@gmail.com', website:'therichpost.com'},
// //   {name: 'Jas', email: 'therichpost@gmail.com', website:'therichpost.com'},
// //   {name: 'therichpost', email: 'therichpost@gmail.com', website:'therichpost.com'},
// //   {name: 'therichpost', email: 'therichpost@gmail.com', website:'therichpost.com'},
// //   {name: 'Jas', email: 'therichpost@gmail.com', website:'therichpost.com'},
// //   {name: 'therichpost', email: 'therichpost@gmail.com', website:'therichpost.com'},
// //   {name: 'therichpost', email: 'therichpost@gmail.com', website:'therichpost.com'},
// // ];
// // dtOptions: any = {};

//   constructor(private store: Store,private service: SharedServiceService,  private http: HttpClient,private router: ActivatedRoute) { 
 
//   }

//   tableName: string | undefined;
//   serviceType: string | undefined;

//   @Select(ServiceLogState.getServiceLogs) serviceLogs$: Observable<any[]> |;


//   ngOnInit(): void{
//     this.tableName = this.router.snapshot.queryParams.tableName;
//     this.serviceType = this.router.snapshot.queryParams.serviceType;

//    console.log("insdeeee OnInit tableName", this.tableName);
//    console.log("insdeeee OnInit serviceType ", this.serviceType);

//   this.store.dispatch(new GetAllServiceLogs(this.tableName, this.serviceType));
  

//    this.serviceLogs$.subscribe(serviceLogs => {
//     this.getAllServiceData();
//     console.log(serviceLogs);
//   });

//   }
  
//   // dtOptions: any = {};
//   // ngOnInit(): void {

//   //   // this.dtOptions = {
//   //   //   pagingType: 'full_numbers',
//   //   //   pageLength: 5,
//   //   // lengthMenu : [5, 10, 25],
//   //   //   processing: true
//   //   // };    
//   //   this.tableName = this.router.snapshot.queryParams.tableName
//   //   this.serviceType = this.router.snapshot.queryParams.serviceType
//   //   console.log("insdeeee OnInit tableName",this.router.snapshot.queryParams.tableName);
//   //   console.log("insdeeee OnInit serviceType ",this.router.snapshot.queryParams.serviceType);

  
//   //   this.store.dispatch(new GetAllServiceLogs(this.tableName, this.serviceType));
   

//   //   this.service.getServiceLogByTableName(this.tableName, this.serviceType).subscribe((result) => {
//   //     //  this.form.patchValue(result);
//   //     //  this.updateForm(result);   
//   //   })

//   //   this.getAllServiceData();
//   // }



//   getAllServiceData() {
//     console.log("getServiceLog API call==>");
//     this.service.getServiceLogByTableName(this.tableName, this.serviceType).subscribe((res: any) => {
//     console.log("getServiceLogData::::", res);
//     this.serviceLogs = res;
//     console.log("API response from server====>",this.serviceLogs);
    
//     setTimeout(() => {
//       $('#datatableexample').DataTable({
//         pagingType: 'full_numbers',
//         pageLength: 5,
//         processing: true,
//         lengthMenu: [5, 10, 25,50,100],
//         order: [[0, 'desc']] 
//       });
//     }, 1);

//     });
//   }

// }

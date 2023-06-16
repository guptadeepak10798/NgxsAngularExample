  import { Component, OnInit } from '@angular/core';
  import { Location } from '@angular/common';

  import { Router } from '@angular/router';
  import { SharedServiceService } from '../../services/shared-service.service';
import { Select, Store } from '@ngxs/store';
import { ServiceLogState } from 'src/app/store/service-log.state';
import { Logs } from '../../Model/logs.model';
import { Observable } from 'rxjs/internal/Observable';
import { GetAllService } from 'src/app/store/service-log.actions';

  @Component({
    selector: 'app-log-dashboard',
    templateUrl: './log-dashboard.component.html',
    styleUrls: ['./log-dashboard.component.css']
  })
  export class LogDashboardComponent implements OnInit {

    cards: any[] = [];
    searchText: any;
    data: any;
    filteredData: any[] = [];
    originalData: any[] = [];
    searchPerformed: boolean = false;

    constructor(private store: Store,private location: Location, private service: SharedServiceService, private router: Router) { }

    ngOnInit(): void {
      this.getDetails();
      this.originalData = this.cards;
    }
    //  cards = [
    //       {
    //         "tableName": "pff_constant",
    //         "serviceType": "createFinance", 
    //       },
    //       {
    //         "tableName": "pff1_constant",
    //         "serviceType": "getdocument",
    //       }
    //     ]

    // openData(index: number) {
    //   const card = this.cards[index];
    //   console.log("element", card);

    // }


    public loading = false;

    // wORKING FINAL
    // getDetails() {
    //   console.log("Into the getv method");
    //   this.loading = true;

    //   return this.service.getServiceLog().subscribe(data => {
    //     for (let parentName in data) {
    //       if (data.hasOwnProperty(parentName)) {
    //         let childObjects = data[parentName];
    //         for (let childName in childObjects) {
    //           if (childObjects.hasOwnProperty(childName)) {
    //             let childObject = childObjects[childName];
    //             let card = {
    //               parent: parentName,
    //               child: childName,
    //               data: childObject
    //             };
    //             this.cards.push(card);
    //             this.loading = false;

    //           }
    //         }
    //       }
    //     }

    //     console.log("data==>", data);
    //     console.log("API data here ssssss: ", this.cards);
    //   });

    // }

    logsArray: Logs[] = [];
    @Select(ServiceLogState.getServiceLog) serviceLogs$: Observable<any> | undefined;
    getDetails(){
      this.store.dispatch(new GetAllService());

      if (this.serviceLogs$) {
        this.serviceLogs$.subscribe((data) => {
          console.log("service logs--=====>",data);
          // this.logsArray = res;
          for (let parentName in data) {
                  if (data.hasOwnProperty(parentName)) {
                    let childObjects = data[parentName];
                    for (let childName in childObjects) {
                      if (childObjects.hasOwnProperty(childName)) {
                        let childObject = childObjects[childName];
                        let card = {
                          parent: parentName,
                          child: childName,
                          data: childObject
                        };
                        this.cards.push(card);
                        this.loading = false;
        
                      }
                    }
                  }
          }
        });
      }
    }

    openData(index: number) {
      const filteredCards = this.searchText ? this.filteredData : this.cards;
      const card = filteredCards[index];
      console.log("element", card);
      this.router.navigate(['/serviceLog'], {
        queryParams: {
          tableName: card.parent,
          serviceType: card.child
        }
      });
    }

   

    applyFilter() {
      const filterValue = this.searchText.trim().toLowerCase();
      this.filteredData = this.cards.filter((item: { child: string }) =>
        item.child.toLowerCase().includes(filterValue)
      );
      console.log("filterValue=======", this.filteredData);
      this.searchPerformed = true;
      console.log("filterValue length=======", this.filteredData.length);
    }

    goBack(): void {
      this.location.back();
    }



  }

import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
// import { ToastrService } from 'ngx-toastr';
import { SharedServiceService } from '../services/shared-service.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  key: any[] = [];
  key2: any[] = [];
  cards: any[] = [];
  parentCards: any[] = [];
  searchText: any;
  data: any;
  filteredData: any[] = [];
  filteredParentCards: any[] = [];
  originalData: any[] = [];
  searchPerformed: boolean = false;

  // parentSerach: boolean = false;


  constructor(private location: Location, private http: HttpClient, private service: SharedServiceService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.getDetails();
  }

  getObjectKeys(obj: any) {
    return Object.keys(obj);
  }
  // this.cards = [
  //   {
  //     "tableName": "pff_constant",
  //     "serviceType": "createFinance",
  //     "data": {
  //       "sourceUrl":"https://localhost:8080"
  //     }
  //   },
  //   {
  //     "tableName": "pff1_constant",
  //     "serviceType": "getdocument",
  //     "data": {}
  //   }
  // ]

  // getDetails() {
  //   console.log("Into the getv method");
  //   return this.service.getData().subscribe(data => {
  //     console.log("data element==>",data);

  //     for (let parentName in data) {
  //       if (data.hasOwnProperty(parentName)) {
  //         let childObjects = data[parentName];
  //         for (let childName in childObjects) {
  //           if (childObjects.hasOwnProperty(childName)) {
  //             let childObject = childObjects[childName];
  //             let card = {
  //               // parent: parentName,
  //               child: childName,
  //               data: childObject
  //             };
  //             this.cards.push(card);

  //             var constant = parentName;

  //             let parentCard = {
  //               parent: parentName,
  //             }

  //             this.parentCards.push(parentCard)
  //           }
  //         }
  //       }
  //     }
  //     console.log("data==>", data);
  //     console.log("API data here ssssss: ", this.cards);

  //     console.log("API data here ssssss: ", this.cards);

  //   });

  // }
  public loading = false;

  getDetails() {
    console.log("Into the loading..... method");
    this.loading = true;
    console.log("this.loading = true;", this.loading = true);

    return this.service.getData().subscribe(data => {
      console.log("data element==>", data);

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
              console.log("this.loading = false;this.loading = false;", this.loading = false);


              // if(constant == parentName ){

              // }
              if (!this.parentCards.includes(parentName)) {
                this.parentCards.push(parentName);
              }

              // let parentCard = {
              //   parent: parentName,
              // }

              // this.parentCards.push(parentCard)
            }
          }
        }
      }

      if (this.searchText) {
        this.filteredParentCards = this.parentCards.filter((parentC: string) =>
          parentC.toLowerCase().includes(this.searchText.trim().toLowerCase())
        );
      } else {
        this.filteredParentCards = this.parentCards;
      }

      console.log("data==>", data);
      console.log("API data here ssssss: ", this.cards);

      console.log("API data here parentCards: ", this.parentCards);

      // console.log("API data here ssssss: ", this.cards.data.apiStatus);
    });

  }




  // openData(index: number) {
  //   const card = this.cards[index];
  //   console.log("element", card);
  //   this.router.navigate(['/test'], {
  //     queryParams: {
  //       tableName: card.parent,
  //       serviceType: card.child
  //     }
  //   });

  // }

  openData(index: number) {
    const filteredCards = this.searchText ? this.filteredData : this.cards;
    const card = filteredCards[index];
    console.log("element", card);
    this.router.navigate(['/test'], {
      queryParams: {
        tableName: card.parent,
        serviceType: card.child
      }
    });
  }

  logout(): void {
    this.service.logout();
  }

  applyFilter() {
    // const filterValue = this.searchText.trim().toLowerCase();
    // this.filteredData = this.cards.filter((item: { child: string }) =>
    //   item.child.toLowerCase().includes(filterValue)
    // );

    // const filterParent = this.searchText.trim().toLowerCase();
    // this.filteredParentCards = this.parentCards.filter((parentC: string) =>
    // parentC.toLowerCase().includes(filterParent)
    // );

    if (this.searchText) {
      const filterValue = this.searchText.trim().toLowerCase();
      console.log("filterValueeee applyFilter", filterValue);

      this.filteredData = this.cards.filter((item: { child: string }) =>
        item.child.toLowerCase().includes(filterValue)
      );

      console.log("child this.filteredData", this.filteredData);

      // this.filteredParentCards = this.parentCards.filter((parentC: string) =>
      //   parentC.toLowerCase().includes(filterValue)
      // );

      this.filteredParentCards = this.parentCards.filter((parentC: string) =>
        this.filteredData.some((card: { parent: string }) =>
          card.parent === parentC
        )
      );
      console.log("filteredParentCards this.filteredParentCards", this.filteredParentCards);

    } else {
      this.filteredData = [];
      this.filteredParentCards = this.parentCards;
    }

    console.log("filterValue=======", this.filteredData);
    this.searchPerformed = true;
  }

  goBack(): void {
    this.location.back();
  }



}

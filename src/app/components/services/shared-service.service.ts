import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Users } from '../Model/users.model';
import { Constants } from '../Model/constants.model';
import { Logs } from '../Model/logs.model';


@Injectable({
  providedIn: 'root'
})
export class SharedServiceService {

  constructor(private http: HttpClient) { }

  baseUrl = "http://192.168.11.249:9999/api/auth";
  tokenUrl = "http://192.168.11.249:8086/token";

  getByIDUrl = "http://192.168.11.249:9999/api/test/fetchAllConstants";
  getAllConstantsUrl = "http://192.168.11.249:9999/api/test";
  updateDataUrl = "http://192.168.11.249:9999/api/test";
  getServiceLogUrl = "http://192.168.11.249:9999/api/test/fetchallServiceLog";

  getAuditLog = "http://localhost:9999/api/test/fetchallAuditLog";
  
   // jsonDataurl = "https://jsonplaceholder.typicode.com";
  // jsonDataBYId = "https://jsonplaceholder.typicode.com/posts"

  signUp(formData: any): Observable<Users[]> {
    console.log("inside insertTemplate call");
    return this.http.post<Users[]>(this.baseUrl + "/signup", formData);
  }

  signIn(formData: any): Observable<Users[]> {
    return this.http.post<Users[]>(this.baseUrl + "/signin", formData);
  }

  logout() {
    // Clear localStorage
    localStorage.clear();
  }

  getData(): Observable<any[]> {
    console.log("inside getData call");
    return this.http.get<any[]>(this.getAllConstantsUrl + "/fetchAllConstants");
  }

  getDataByTableName(tableName: any, serviceType: any): Observable<Constants> {
    console.log("inside getData call");
    return this.http.get<Constants>(this.getByIDUrl + "/" + tableName + "/" + serviceType);
  }

  getAuditLogs(tableName: any, serviceType: any): Observable<Constants> {
    console.log("inside getData call");
    return this.http.get<Constants>(this.getAuditLog + "/" + tableName + "/" + serviceType);
  }

  updateService(formData: any): Observable<any> {
    console.log("inside update call");
    console.log("formData inside service call",formData);
    
    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');
    return this.http.post<any>(this.updateDataUrl + "/updateConstant", formData, { headers })
  }

  getServiceLog(): Observable<any[]> {
    console.log("inside getData call");
    return this.http.get<any[]>(this.getServiceLogUrl);
  }

  // getServiceLogByTableName(tableName: any, serviceType: any): Observable<Logs> {
  //   console.log("inside getData call");
  //   return this.http.get<Logs>(this.getServiceLogUrl + "/" + tableName + "/" + serviceType);
  // }

  getServiceLogByTableName(tableName: any, serviceType: any): Observable<any[]> {
    console.log("inside getData call");
    return this.http.get<any[]>(this.getServiceLogUrl + "/" + tableName + "/" + serviceType);
  }

  // updateTemplateData(formData: Constants) {
  //   let headers: HttpHeaders = new HttpHeaders();
  //   headers = headers.append('Content-Type', 'application/json');
  //   return this.http.post<Constants[]>(this.updateData + '/' + formData.tableName +'/' +formData.serviceType, formData, { headers });
  // }




}

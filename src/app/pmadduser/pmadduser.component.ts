import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Postuser } from '../postuser';
import { User } from './user';
import { Observable } from 'rxjs';
import { BaseService } from './base.service';
import { map, catchError } from 'rxjs/operators';
import { Response } from '@angular/http';

@Component({
  selector: 'app-pmadduser',
  templateUrl: './pmadduser.component.html',
  styleUrls: ['./pmadduser.component.scss']
})
export class PmadduserComponent extends BaseService implements OnInit {

  userToAdd: User;
  isFirstNameAsc: any;
  isLastNameAsc: any;
  isEmpIdAsc: any;
  users: Array<User>;
  buttonName: string;
  UserObservable: Observable<any[]>;
  tmpdata: Observable<any[]>;
  constructor(private http: HttpClient) {
    super();
    this.users = new Array<User>();


  }


  ngOnInit(): void {


    this.userToAdd = new User();
    this.getUsers().subscribe((users) => {
      console.log(JSON.stringify(users));
      this.users = users;



    },
      (error) => {
      });

  }
  public getUsers(): Observable<User[]> {

    return this.http.get("http://localhost:8099/projmgmt/getUsers")
      .pipe(map((res: Response) => {
        const data = res['users'];
        return data;
      }))
      .pipe(catchError(this.handleError));

  }


  resetAll() {
    this.userToAdd = new User();

  };

  addUser() {
    let headers = new Headers({ 'Content-Type': 'application/json' });



    this.http.post("http://localhost:8099/projmgmt/addUser",
      this.userToAdd)
      .subscribe(
        data => {
          console.log("POST Request is successful ", data);
        },
        error => {
          console.log("Error", error);
        }
      );


  }
}

import { AfterContentChecked, AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { User } from 'src/app/models/user.model';
import { RoutingService } from './../../services/routing.service';
import { UserService } from './../../services/user.service';

@Component({
  selector: 'exads-users-table',
  templateUrl: './users-table.component.html',
  styleUrls: ['./users-table.component.scss']
})
export class UsersTableComponent implements OnInit, AfterViewInit, AfterContentChecked {

  public readonly fullScreenColumns = ['username', 'fullname', 'email', 'status', 'created'];
  public readonly mobileColumns = ['username', 'fullname'];
  public isMobile: boolean;
  public dataSource = new MatTableDataSource<User>();
  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  constructor(private userService: UserService,
    private routingService: RoutingService) { }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  ngOnInit(): void {
    this.userService.getUsers().toPromise().then((users: User[]) => {
      this.dataSource.data = users;
    }).catch((err) => console.error(err));
  }

  ngAfterContentChecked(): void {
    this.isMobile = window.innerWidth <= 600;
  }

  public navigateToCreateUser(): void {
    this.routingService.navigateToCreateUser();
  }

}

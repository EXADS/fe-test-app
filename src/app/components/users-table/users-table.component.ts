import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { UserService } from './../../services/user.service';
import {MatPaginator, MatTableDataSource} from '@angular/material';

@Component({
  selector: 'exads-users-table',
  templateUrl: './users-table.component.html',
  styleUrls: ['./users-table.component.scss']
})
export class UsersTableComponent implements OnInit, AfterViewInit {

  public readonly displayedColumns = ['username', 'fullname', 'email', 'status', 'created'];
  public dataSource = new MatTableDataSource<User>();
  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  constructor(private userService: UserService) { }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  ngOnInit() {
    this.userService.getUsers().toPromise().then((users: User[]) => {
      this.dataSource.data = users;
    }).catch((err) => console.error(err));
  }

}

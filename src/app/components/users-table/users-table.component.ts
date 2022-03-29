import { Component, OnInit } from '@angular/core';
import { ColumnMode } from '@swimlane/ngx-datatable';
import { User } from 'src/app/models/user.model';
import { UserService } from './../../services/user.service';


@Component({
  selector: 'exads-users-table',
  templateUrl: './users-table.component.html',
  styleUrls: ['./users-table.component.scss']
})
export class UsersTableComponent implements OnInit {

  public columnMode = ColumnMode.force;
  public rows: User[] = [];
  public messages = {
  emptyMessage: 'TABLE.NO_DATE',
  totalMessage: 'TABLE.TOTAL',
  selectedMessage: 'TABLE.SELECTED'
  }
  constructor(private userService: UserService) { }

  ngOnInit() {
    this.userService.getUsers().toPromise().then((users: User[]) => {
      this.rows = users;
    }).catch((err) => console.error(err));
  }

}

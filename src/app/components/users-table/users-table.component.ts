import { AfterContentChecked, AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSnackBar, MatTableDataSource, PageEvent } from '@angular/material';
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
  public readonly pageSizes = [5, 10, 20];
  public isMobile: boolean;
  public subFailed = false;
  public subSucceeded = false;
  public dataSource = new MatTableDataSource<User>();
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;

  @ViewChild('userTableContainer', { static: false }) userTableContainer: ElementRef;
  constructor(private userService: UserService,
    private routingService: RoutingService, private snackBar: MatSnackBar) { }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  ngOnInit(): void {
    this.userService.getUsers().toPromise().then((users: User[]) => {
      this.dataSource.data = users;
      this.subFailed = false;
      this.subSucceeded = true;
    }).catch((err: Error) => {
      this.snackBar.open(err.message, '', { duration: 10000, panelClass: 'error' });
      this.subFailed = true;
      this.subSucceeded = false;
      console.error(err);
    });
  }

  ngAfterContentChecked(): void {
    this.isMobile = window.innerWidth <= 600;
  }

  public navigateToCreateUser(): void {
    this.routingService.navigateToCreateUser();
  }

  public handlePageEvent(event: PageEvent) {
    if (event && !!event.pageSize) {
      setTimeout(() => {
        const matPaginatorBottom: Element = document.querySelector('.mat-paginator-range-actions');
        //@ts-ignore
        matPaginatorBottom.style.bottom = this.calculateNewBottom(event.pageSize);
      }, 60)
    }
  }

  private calculateNewBottom() {
    return (window.innerHeight - (this.userTableContainer.nativeElement.offsetHeight + 64 + 40)) + 'px'
  }
}

import { AfterContentChecked, AfterViewInit, ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatTableDataSource, PageEvent } from '@angular/material';
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
  public dataSource = new MatTableDataSource<User>();
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;

  @ViewChild('appToolbar', { static: false }) appToolbar: any;
  @ViewChild('userTableContainer', { static: false }) userTableContainer: ElementRef;
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

  public handlePageEvent(event: PageEvent) {
    if (event && !!event.pageSize) {
      setTimeout(()=>{
        const matPaginatorBottom: Element = document.querySelector('.mat-paginator-range-actions');
        //@ts-ignore
        matPaginatorBottom.style.bottom = this.calculateNewBottom(event.pageSize);
      },60)

    }
  }

  private calculateNewBottom(pageSize: number) {
    // if (pageSize == 20)
    //   return (window.innerHeight - 713) + 'px';
    // else if (pageSize == 10)
    //   return (window.innerHeight - 503) + 'px';
    // else if (pageSize == 5)
    //   return (window.innerHeight - 398) + 'px';
    //windows innerHeight - height of component + mat-toolbar height + paginator height
    return (window.innerHeight - (this.userTableContainer.nativeElement.offsetHeight + 64 + 40)) + 'px'
  }
}

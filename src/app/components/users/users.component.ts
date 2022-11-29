import { Component, HostListener, OnInit } from "@angular/core";
import { UserService } from "src/app/services/user.service";
import { User } from "src/app/models/user";
import { StatusService } from "src/app/services/status.service";
import { Status } from "src/app/models/status";
import { Language } from "src/app/models/language";
import { MatSlideToggleChange, PageEvent, Sort } from "@angular/material";
import { MatPaginatorIntl } from "@angular/material";
import { CustomPaginator } from "src/app/objects/CustomPaginatorConfiguration";
import { LanguageService } from "src/app/services/language.service";

@Component({
  selector: "exads-users",
  templateUrl: "./users.component.html",
  styleUrls: ["./users.component.scss"],
  providers: [{ provide: MatPaginatorIntl, useValue: CustomPaginator() }],
})
export class UsersComponent implements OnInit {
  constructor(
    private userService: UserService,
    private statusService: StatusService,
    private languageService: LanguageService
  ) {}

  isDarkTheme: boolean = JSON.parse(localStorage.getItem("darkMode"));

  translations: Language[] = [];

  users: User[] = [];
  user: User;

  statuses: Status[] = [];
  status: Status;

  displayedColumns: string[] = [
    "Username",
    "Full Name",
    "Email",
    "Status",
    "Date Created",
  ];

  columnsToDisplay: string[] = this.displayedColumns.slice();
  pageNumber: number = 0;
  noPerPage: number = 20;
  numberRecords: number = 0;
  pageSizeOptions = [20, 50, 100];
  showFirstLastButtons = true;

  showNumber1: number = 0;
  showNumber2: number = 0;

  sortedData: User[];

  innerWidth: number;

  ngOnInit() {
    this.getPage(0, 20);
    this.getAllStatuses();
    this.getLanguage();
    this.innerWidth = window.innerWidth;
  }

  ngAfterViewInit() {}

  @HostListener("window:resize", ["$event"])
  onResize(event) {
    this.innerWidth = window.innerWidth;
  }

  getPage(pageNum: number, limit: number) {
    this.showNumber1 = 1 + pageNum * limit;
    this.showNumber2 = limit + pageNum * limit;
    this.userService.getPage(pageNum, limit).subscribe(
      (users) => (
        (this.users = users["data"]["users"]),
        (this.numberRecords = users["data"]["count"]),
        (this.sortedData = this.users.slice()),
        this.sortData({
          active: "username",
          direction: "asc",
        })
      )
    );
  }

  setDarkThemeMode(value: MatSlideToggleChange) {
    localStorage.setItem("darkMode", value.checked + "");
  }

  getAllStatuses() {
    this.statusService
      .getAllStatuses()
      .subscribe((statuses) => (this.statuses = statuses["data"]));
  }

  handlePageEvent(event: PageEvent) {
    this.pageNumber = event.pageIndex;
    this.getPage(this.pageNumber, this.noPerPage);
  }

  handleTopPageEvent(event: PageEvent) {
    this.noPerPage = event.pageSize;
    this.getPage(this.pageNumber, this.noPerPage);
  }

  //-I would normally integrate the 'order by' into the database query
  //-Iterating over the array after retrieving the data would not be a good implementation
  //-A more practical query would be:
  //   'this.url + "/users?page=" + pageNum + "&limit=" + limit+ "&sort=" + sort + "&direction=" + direction'
  sortData(sort: Sort) {
    const data = this.users.slice();
    if (!sort.active || sort.direction === "") {
      this.sortedData = data;
      return;
    }
    this.sortedData = data.sort((a, b) => {
      const isAsc = sort.direction === "asc";
      switch (sort.active) {
        case "username":
          return this.compare(a.username, b.username, isAsc);
        case "name":
          return this.compare(a.username, b.username, isAsc);
        case "email":
          return this.compare(a.email, b.email, isAsc);
        case "status":
          return this.compare(a.id_status, b.id_status, isAsc);
        case "date":
          return this.compare(a.created_date + "", b.created_date + "", isAsc);
        default:
          return 0;
      }
    });
  }

  compare(a: number | string, b: number | string, isAsc: boolean) {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }

  getLanguage() {
    this.languageService.getLanguage().subscribe((data) => {
      this.translations = JSON.parse(data);
    });
  }
}

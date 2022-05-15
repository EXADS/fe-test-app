import { HttpClientModule } from "@angular/common/http";
import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { FormsModule } from "@angular/forms";
import {
  MatPaginatorModule,
  MatSlideToggleModule,
  MatTableModule,
} from "@angular/material";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { User } from "src/app/models/user";
import { UsersComponent } from "./users.component";

describe("UsersComponent", () => {
  let component: UsersComponent;
  let fixture: ComponentFixture<UsersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [UsersComponent],
      providers: [],
      imports: [
        HttpClientModule,
        MatSlideToggleModule,
        MatPaginatorModule,
        FormsModule,
        MatTableModule,
        BrowserAnimationsModule,
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should test the table ", (done) => {
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      fixture.detectChanges();
      let tableRows = fixture.nativeElement.querySelectorAll("tr");

      expect(tableRows.length).toBe(21);

      // Header row
      let headerRow = tableRows[0];
      expect(headerRow.cells[0].innerHTML).toContain("Username");
      expect(headerRow.cells[1].innerHTML).toContain("Full Name");
      expect(headerRow.cells[2].innerHTML).toContain("Email");
      expect(headerRow.cells[3].innerHTML).toContain("Status");
      expect(headerRow.cells[4].innerHTML).toContain("Date Created");

      let row1 = tableRows[1];
      expect(row1.cells[0].innerHTML).toContain("asketcherb");
      expect(row1.cells[1].innerHTML).toContain("Arvy");
      expect(row1.cells[2].innerHTML).toContain("aallardb@mail.ru");
      expect(row1.cells[3].innerHTML).toContain("Active");
      expect(row1.cells[4].innerHTML).toContain("18-07-2020");

      let row2 = tableRows[2];
      expect(row2.cells[0].innerHTML).toContain("classeyh");
      expect(row2.cells[1].innerHTML).toContain("Constancy Lassey");
      expect(row2.cells[2].innerHTML).toContain("classeyh@csmonitor.com");
      expect(row2.cells[3].innerHTML).toContain("Active");
      expect(row2.cells[4].innerHTML).toContain("23-03-2020");

      done();
    });
  });
});

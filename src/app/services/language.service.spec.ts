import { HttpClientModule } from "@angular/common/http";
import { TestBed } from "@angular/core/testing";

import { LanguageService } from "./language.service";

describe("LanguageService", () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
    }).compileComponents()
  );

  it("should be created", () => {
    const service: LanguageService = TestBed.get(LanguageService);
    expect(service).toBeTruthy();
  });
});

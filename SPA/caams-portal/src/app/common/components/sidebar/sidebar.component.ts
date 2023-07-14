import { AfterViewInit, Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Users } from "@app/auth/settings/users/model/users";
import { UsersService } from "@app/auth/settings/users/services/users.service";
import { TranslateService } from "@ngx-translate/core";
import { SharedService } from "../../services/shared.service";

declare var $: any;
declare var WOW: any;

@Component({
  selector: "app-sidebar",
  templateUrl: "./sidebar.component.html",
  styleUrls: ["./sidebar.component.css"],
})
export class SidebarComponent implements OnInit, AfterViewInit {
  public defaultLink: string = "/";

  public disableSidebar: boolean = false;
  public menuJson: any[] = [];
  public tempMenuJson: any[] = [];
  public role = "";
  public resetRequired = "";
  public currentUser: Users;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private sharedService: SharedService,
    private translate: TranslateService,
    private usersService: UsersService
  ) {
    translate.setDefaultLang("en");
  }

  ngOnInit() {
    if (this.route.snapshot.data.home) {
      this.route.data.subscribe((data) => {
        if (data.home[0]) {
          this.menuJson = JSON.parse(data.home[0].body.menuJson);
          this.currentUser = data.home[0].body;
          this.usersService.setCurrentUser(this.currentUser)
          this.resetRequired = data.home[0].body.resetRequired;
          this.role = data.home[0].body.roles[0];
        }
      });
    }
    this.sharedService.disableSource.asObservable().subscribe((data) => {
      if (data != undefined) {
        this.disableSidebar = data;
      }
    });
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.setActiveLanguageLink();

      this.addPlugIns();
    });
  }

  addPlugIns() {
    $(".comment-scrollbar").mCustomScrollbar({
      axis: "y",
      autoHideScrollbar: true,
      scrollbarPosition: "outside",
      theme: "light-1",
    });

    $("#metismenu").metisMenu();

    $("#sidebarCollapse").on("click", function () {
      $("#sidebar").toggleClass("active");
      $("#footer").toggleClass("active");
    });
    $(".sicker-menu").sticky({
      topSpacing: 0,
    });
    $("#sidebarCollapse").on("click", function () {
      $("body").toggleClass("mini-navbar");
    });
    $(document).on("click", ".header-right-menu .dropdown-menu", function (e) {
      e.stopPropagation();
    });
    new WOW().init();
  }

  deactivateMyAccountsLink() {
    if (this.router.url !== this.defaultLink) {
      $("#myAccountsMenuLink").removeClass("active");
    }
  }

  changeLanguage(lan: string) {
    this.translate.use(lan);
    this.setActiveLanguageLink();
  }

  setActiveLanguageLink() {
    if (this.translate.currentLang === "en") {
      $("#englishLangLink").addClass("active");
      $("#banglaLangLink").removeClass("active");
      document.documentElement.setAttribute("lang", "en");
    } else if (this.translate.currentLang === "bn") {
      $("#banglaLangLink").addClass("active");
      $("#englishLangLink").removeClass("active");
      document.documentElement.setAttribute("lang", "bn");
    }
  }
}

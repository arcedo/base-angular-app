import { Routes } from "@angular/router";
import { TestComponentComponent } from "./features/test-feature/components/test-component/test-component.component";

export const routes: Routes = [
  {
    path: "",
    redirectTo: "home",
    pathMatch: "full",
  },
  {
    path: "home",
    component: TestComponentComponent,
    title: "ROUTES.HOME.TITLE",
  },
  {
    path: "**",
    loadComponent: () =>
      import("./core/components/error-page/error-page.component").then(
        (m) => m.ErrorPageComponent,
      ),
    title: "ROUTES.ERROR.TITLE",
  },
];

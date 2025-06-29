import { Component } from "@angular/core";
import { TranslateModule } from "@ngx-translate/core";

@Component({
  selector: "app-test-component",
  standalone: true,
  templateUrl: "./test-component.component.html",
  imports: [TranslateModule],
})
export class TestComponentComponent {
  title = "Test Component";
}

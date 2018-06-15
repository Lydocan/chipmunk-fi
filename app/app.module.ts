import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptFormsModule } from "nativescript-angular/forms";
import { NativeScriptModule } from "nativescript-angular/nativescript.module";


import { AppComponent } from "./app.component";
import { AuthService } from "~/shared/auth.service";
import { HttpClient, HttpHandler, HttpClientModule } from "@angular/common/http";

@NgModule({
  declarations: [AppComponent],
  bootstrap: [AppComponent],
  imports: [
    NativeScriptModule,
    NativeScriptFormsModule,
    HttpClientModule
  ],
  providers: [
    AuthService
  ],
  schemas: [NO_ERRORS_SCHEMA],
})
export class AppModule { }

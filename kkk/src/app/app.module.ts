import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Config } from './config';
import { AuthServiceService } from './services/auth-service.service';
import { HttpModule } from '@angular/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { BannerComponent } from './banner/banner.component';
import { FooterComponent } from './footer/footer.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { PropertyComponent } from './property/property.component';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { ForgetPasswordComponent } from './forget-password/forget-password.component';
import { ShowPropertyComponent } from './show-property/show-property.component';
import { ChangepasswordComponent } from './changepassword/changepassword.component';
import { PropertyDetailComponent } from './property-detail/property-detail.component';
//import {WebStorageModule, LocalStorageService} from "angular-localstorage";
import { AgmCoreModule } from '@agm/core';
import { OpenCartComponent } from './open-cart/open-cart.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { PaymentpageComponent } from './paymentpage/paymentpage.component';
import { NgxStripeModule } from 'ngx-stripe';
import { ReactiveFormsModule } from '@angular/forms';
import { RxReactiveFormsModule } from "@rxweb/reactive-form-validators";
import { AdminComponent } from './admin/admin.component';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import {NgxPaginationModule} from 'ngx-pagination';
import{AuthTokenService} from '../app/services/auth-token.service';
import { ResetpasswordComponent } from './resetpassword/resetpassword.component';
import { PaytmGetwayComponent } from './paytm-getway/paytm-getway.component';

// import { AuthService , AuthServiceConfig,FacebookLoginProvider, GoogleLoginProvider, LinkedinLoginProvider, SocialLoginModule} from 'ng4-social-login';
// const config = new AuthServiceConfig([
//   {
//     id: GoogleLoginProvider.PROVIDER_ID,
//     provider: new GoogleLoginProvider('63373339712-5i833p83asu0rrhfm63sbf87hg2kbj9a.apps.googleusercontent.com 	')
//   },
 
 
//   {
//     id: FacebookLoginProvider.PROVIDER_ID,
//     provider: new FacebookLoginProvider('700149727095513')
//   },
 
// ],false);
 
// export function providerConfig(){
// return config;
// }

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    BannerComponent,
    FooterComponent,
    LoginComponent,
    SignupComponent,
    HomeComponent,
    AboutComponent,
    ContactComponent,
    PropertyComponent,
    ForgetPasswordComponent,
    ShowPropertyComponent,
    ChangepasswordComponent,
    PropertyDetailComponent,
    OpenCartComponent,
    CheckoutComponent,
    PaymentpageComponent,
    AdminComponent,
    AdminPanelComponent,
    ResetpasswordComponent,
    PaytmGetwayComponent,
 
   
   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgxStripeModule.forRoot('pk_test_GJR0iwIfVvYV5GDXkEeVxre2009TD5qmrX'),
    FormsModule,
    RxReactiveFormsModule,
    ReactiveFormsModule,
    HttpModule,
    HttpClientModule,
    NgxPaginationModule,
    // SocialLoginModule,
   // WebStorageModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDOIgk6RFmiTBpwXzTLI-ADb4VYjg_Vjlk'

    })
  
  ],
  providers: [
    Config,
    AuthServiceService,
    HttpClient,
    AuthTokenService
    // {provide:AuthServiceConfig,useFactory:providerConfig}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

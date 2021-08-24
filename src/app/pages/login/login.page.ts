import { Component, OnInit, ViewChild } from "@angular/core";
import {
  IonContent,
  NavController,
  MenuController,
  ToastController,
  PopoverController,
  ModalController,
  IonSlides,
} from "@ionic/angular";
import { News } from 'src/app/models/pokeapi';

import { Startup } from "src/app/models/pokeapi";
import { take } from "rxjs/operators";
// Modals
import { LoadingController, AlertController } from "@ionic/angular";
// Call notifications test by Popover and Custom Component.
import { ItemDetailsPage } from "../modal/item-details/item-details.page";
import { MenuService } from "../../services/menu.service";
import { StartupService } from "../../services/startup.service";

import { TranslateService } from "@ngx-translate/core";
import { EventProvider } from "../../event-provider.service";
import { Pipe, PipeTransform } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { AuthService } from "src/app/services/auth.service";
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { first } from 'rxjs/operators';
import { AuthenticationService } from "src/app/services/authentication.service";



@Component({
  selector: "app-login",
  templateUrl: "./login.page.html",
  styleUrls: ["./login.page.scss"],
})

@Injectable({ providedIn: 'root' })

export class LoginPage implements OnInit {
  loginForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  error = '';

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService
) { 
    // redirect to home if already logged in
    if (this.authenticationService.currentUserValue) { 
        this.router.navigate(['/']);
    }
}

ngOnInit() {
    this.loginForm = this.formBuilder.group({
        username: ['', Validators.required],
        password: ['', Validators.required]
    });

    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/area/11';
}

// convenience getter for easy access to form fields
get f() { return this.loginForm.controls; }

onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.loginForm.invalid) {
        return;
    }

    this.loading = true;
    this.authenticationService.login(this.f.username.value, this.f.password.value)
        .pipe(first())
        .subscribe(
            data => {
                this.router.navigate([this.returnUrl]);
            },
            error => {
                this.error = error;
                this.loading = false;
            });
}
}

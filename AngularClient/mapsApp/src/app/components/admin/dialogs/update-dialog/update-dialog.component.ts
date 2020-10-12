import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material';
import {AuthService} from '../../../../services/auth/auth.service';

@Component({
  selector: 'app-update-dialog',
  templateUrl: './update-dialog.component.html',
  styleUrls: ['./update-dialog.component.css']
})
export class UpdateDialogComponent implements OnInit {

  Id: any;
  form: any = {roles: [{id: null, name: null}]};
  updateData: any = {};

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private authService: AuthService,
  ) {
  }

  ngOnInit() {
    this.Id = this.data.id;
    this.form.name = this.data.name;
    this.form.username = this.data.username;
    this.form.email = this.data.email;
    switch (this.data.roles[0].id) {
      case 1: {
        this.form.role = 'user';
        break;
      }
      case 2: {
        this.form.role = 'pm';
        break;
      }
      case 3: {
        this.form.role = 'admin';
        break;
      }
    }
  }

  onSubmit() {
    switch (this.form.role) {
      case 'user': {
        this.form.roles[0].id = 1;
        this.form.roles[0].name = 'ROLE_USER';
        break;
      }
      case 'pm': {
        this.form.roles[0].id = 2;
        this.form.roles[0].name = 'ROLE_PM';
        break;
      }
      case 'admin': {
        this.form.roles[0].id = 3;
        this.form.roles[0].name = 'ROLE_ADMIN';
        break;
      }
    }
    delete this.form.role;
    this.authService.updateUser(this.Id, this.form)
      .subscribe((res) => {
        console.log(res);
      });
  }

}

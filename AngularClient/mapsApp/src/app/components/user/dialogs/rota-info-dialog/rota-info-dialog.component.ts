import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-rota-info-dialog',
  templateUrl: './rota-info-dialog.component.html',
  styleUrls: ['./rota-info-dialog.component.css']
})
export class RotaInfoDialogComponent implements OnInit {

  liste: any = [];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
  }

  ngOnInit() {
  }
}

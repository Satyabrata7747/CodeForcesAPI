import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DataService } from '../Services/data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  constructor(public data: DataService) {}
  save(f) {
    this.data.isLoading = true;
    this.data.user(f.value.search);
    console.log(this.data.users);
  }
  ngOnInit(): void {
    this.data.home();
  }
}

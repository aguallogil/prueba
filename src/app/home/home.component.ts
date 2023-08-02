import { Component, OnInit } from '@angular/core';
import { MealService } from '../services/meal.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  constructor(private mealService:MealService){

  }
  ngOnInit(): void {
    this.mealService.getAll().subscribe(console.log);
  }
}

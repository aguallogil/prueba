import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Meal } from '../models/meal.model';
@Injectable({
  providedIn: 'root'
})
export class MealService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getAll(): Observable<any> {
    return this.http.get<any>(this.apiUrl+'meals');
  }
  save(data:Meal): Observable<any> {
    return this.http.post<any>(this.apiUrl+'meals/insert',data);
  }
  update(data:Meal): Observable<any> {
    return this.http.patch<any>(this.apiUrl+'meals/'+data._id,data);
  }
  delete(id:string){
    return this.http.delete<any>(this.apiUrl+'meals/'+id);
  }
  getAllByName(name:string): Observable<any> {
    return this.http.get<any>(this.apiUrl+'meals/getallbyname/'+name);
  }
  getPagination(page:number):Observable<any>{
    return this.http.get<any>(this.apiUrl+'meals/pagination/'+page);
  }
}
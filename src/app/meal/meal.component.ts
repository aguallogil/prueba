import { Component, OnInit } from '@angular/core';
import { MealService } from '../services/meal.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Meal } from '../models/meal.model';
import { Dismiss, DismissInterface, DismissOptions, Modal, ModalOptions } from 'flowbite';
import { Router } from '@angular/router';
import {ConfirmDialogComponent } from '../shared/confirmdialog/confirmdialog.component';
import { MatDialog } from '@angular/material/dialog';
import {AlertDialogComponent} from '../shared/alertdialog/alertdialog.component';


@Component({
  selector: 'app-meal',
  templateUrl: './meal.component.html',
  styleUrls: ['./meal.component.css']
})
export class MealComponent implements OnInit{
  dismiss: DismissInterface;
  isDelete:boolean=false;
  //paginacion
  currentPage = 1;
  totalPages = 1;
  pages: number[] = [];
  //fin
  searchTerm: string = '';

  modal:Modal;
  notificationModal:Modal;
  popupModal:Modal;
  mealForm!: FormGroup;
  formSubmitted: boolean = false;
  data:any=[];
  popup:boolean=true;
  constructor(private mealService:MealService,private formBuilder: FormBuilder,public router: Router,private dialog: MatDialog){
  
  }
  ngOnInit(): void {
    this.inicia();
  }
  inicia():void{
    // programmatically hide it
    this.formSubmitted=false;
    const $targetEl = document.getElementById('editUserModal');
    const options:ModalOptions = {
      placement: 'center',
      backdrop: 'dynamic',
      backdropClasses: 'bg-gray-900 bg-opacity-50 dark:bg-opacity-80 fixed inset-0 z-40',
      closable: true,
      onHide: () => {
          this.mealForm.reset();
      },
      onShow: () => {
          
      },
      onToggle: () => {
          
      }
    };
    this.modal = new Modal($targetEl,options);
    this.mealForm = this.formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      price: ['', Validators.required],
      _id: ['']
    });
    this.getMeals(this.currentPage);
  }
  closeModal(event: Event) {
    event.preventDefault();

    this.modal.hide();
  }
  onSubmit() {
    this.formSubmitted = true;
  
    if (this.mealForm.valid) {
      // Si el formulario es válido, aquí puedes agregar la lógica para enviar los datos al backend y realizar la autenticación real.
      const meal=new Meal();
      meal.name=this.mealForm.get('name')?.value;
      meal.description=this.mealForm.get('description')?.value;
      meal.price=this.mealForm.get('price')?.value;
      meal._id=this.mealForm.get('_id')?.value;
      const dialogRef = this.dialog.open(ConfirmDialogComponent);
     
      dialogRef.afterClosed().subscribe(result => {
        if (result === true) {
          if(meal._id){
            this.mealService.update(meal).subscribe(res=>{
              // console.log(res);
              if(res._id){
                this.modal.hide();
                const dialogRef2 = this.dialog.open(AlertDialogComponent, {
                  data: {
                    message: '¡se guardó correctamente!'
                  }
                });
                dialogRef2.afterClosed().subscribe(() => {
                 
                  this.inicia();
                });
              }
            });
          }
          else
          {
            this.mealService.save(meal).subscribe(res=>{
              // console.log(res);
              if(res._id){
                this.modal.hide();
                const dialogRef2 = this.dialog.open(AlertDialogComponent, {
                  data: {
                    message: '¡se guardó correctamente!'
                  }
                });
                dialogRef2.afterClosed().subscribe(() => {
                  
                  this.inicia();
                });
              }
            },error=>{
              console.log(error);
            });
            
          }
        } else {
          this.modal.hide();
          this.mealForm.reset();
          this.inicia();
        }
      });
      
    }
  }
  click(event:Event){
    event.preventDefault();
    
    //const modal = new Modal($targetEl,options);
    this.modal.show();
  }
  edit(event:Event,item:any){
   event.preventDefault();
   this.mealForm.setValue({
      name: item.name, 
      description: item.description,
      price: item.price,
      _id: item._id
    }); 
    //const modal = new Modal($targetEl,options);
    this.modal.show();
  }
  async reload(url: string): Promise<boolean> {
    await this.router.navigateByUrl('.', { skipLocationChange: true });
    return this.router.navigateByUrl(url);
  }
  delete(event:Event,item:any){
    event.preventDefault();
    const dialogRef = this.dialog.open(ConfirmDialogComponent);

      dialogRef.afterClosed().subscribe(result => {
        if (result === true) {
          this.mealService.delete(item._id).subscribe(res=>{
            if(res){
              const dialogRef2 = this.dialog.open(AlertDialogComponent, {
                data: {
                  message: '¡se eliminó correctamente!'
                }
              });
          
              dialogRef2.afterClosed().subscribe(() => {
                this.inicia();
              });
            }
          });
        } else {
        }
      });
  }
  filterUsers(): void {
    if (!this.searchTerm){
      this.inicia();
      return
    } ;

    this.mealService.getAllByName(this.searchTerm).subscribe(res=>{
      this.data=res;
    });
  }
  closeNotification(event:Event){
    this.notificationModal.hide();
  }
  getMeals(page: number) {
    this.mealService.getPagination(page).subscribe((data) => {
      this.data = data.meals;
      this.currentPage = data.currentPage;
      this.totalPages = data.totalPages;
      this.pages = Array.from({ length: this.totalPages }, (_, i) => i + 1);
    });
  }
  goToPage(page: number) {
    
    this.getMeals(page);
  }
  onSearchChange() {
    if (this.searchTerm.trim() === '') {
      this.filterUsers() // Si el input está vacío, muestra todos los resultados
    }
  }
  
}

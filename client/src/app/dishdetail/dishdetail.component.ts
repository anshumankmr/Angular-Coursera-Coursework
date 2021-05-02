import { Component, OnInit , ViewChild , Inject } from '@angular/core';
import { Params, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Dish } from '../shared/dish';
import { DishService } from '../services/dish.service';
import { switchMap, take } from 'rxjs/operators';
import { Comment  } from "../shared/comment";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { visibility , expand} from "../animations/app.animation";
@Component({
  selector: 'app-dishdetail',
  templateUrl: './dishdetail.component.html',
  styleUrls: ['./dishdetail.component.scss'],
  animations: [visibility(),expand()]
})
export class DishdetailComponent implements OnInit {
  dish !: Dish;
  dishIds !: string[];
  errMess !: string;
  prev !: string;
  next !: string;
  commentForm!: FormGroup;
  comment!: Comment;
  key!: string;
  dishcopy !: Dish;
  visibility = "shown";
  @ViewChild('fform') commentFormDirective;

  formErrors = {
    'author': '',
    'rating':'',
  };
  validationMessages = {
    'author': {
      'required':      'Name is required.',
      'minlength':     'Name must be at least 2 characters long.',
    },
    'comment': {
      'required' : 'Rating is Required'
    }
  };

  constructor(private dishService: DishService , private location: Location, private route: ActivatedRoute, private fb: FormBuilder , @Inject('BaseURL') public BaseURL) { 
    this.createForm();
    
  }
  formatLabel(value: number) {
    return value;
  }
  createForm(){
    // for convenience at this time but may be need elsewhere so we encapsulate it
    this.commentForm = this.fb.group({
      author: ['',[Validators.required,Validators.minLength(2),Validators.maxLength(25)]],
      rating:5,
      comment: ['', Validators.required],
      date: new Date()
    });
    this.commentForm.valueChanges.
    subscribe(data => this.onValueChanged(data), errMess => {
      this.errMess = <any>errMess;
    });
    this.onValueChanged();
  }
  onValueChanged(data?: any) {
    if (!this.commentForm) { return; }
    this.commentForm.value.date = new Date();
    const form = this.commentForm;
    for (const field in this.formErrors) {
      if (this.formErrors.hasOwnProperty(field)) {
        // clear previous error message (if any)
        this.formErrors[field] = '';
        const control = form.get(field);
        if (control && control.dirty && !control.valid) {
          const messages = this.validationMessages[field];
          for (const key in control.errors) {
            if (control.errors.hasOwnProperty(key)) {
              this.formErrors[field] += messages[key] + ' ';
            }
          }
        }
      }
    }
  }
  ngOnInit(): void {
    console.log(this.BaseURL);
    this.dishService.getDishIds().subscribe(dishIds => {
      this.dishIds = dishIds;
    }, errMess => {
      this.errMess = <any>errMess;
    });
    let id = this.route.params
    .pipe(switchMap((params: Params) => {
      this.visibility = "hidden";
      return this.dishService.getDish(params['id']);
    }))
    .subscribe(x => {
      this.dish = x;
      this.dishcopy = x;
      // this.clearForm();
      this.setPrevNext(this.dish.id);
      // if (localStorage.getItem(this.key)){
      //   this.dish.comments = (JSON.parse(localStorage.getItem(this.key)!));
      // } 
      this.visibility = 'shown';
    }, errMess => {
      this.errMess = <any>errMess;
    });
  }
  setPrevNext(dishId: string){
    const index = this.dishIds.indexOf(dishId);
    this.key = String(index);
    this.prev = this.dishIds[(this.dishIds.length + index -1 )%this.dishIds.length];
    this.next = this.dishIds[(this.dishIds.length + index + 1 )%this.dishIds.length];
  }
  saveToSession(dishId: string, comments?: any){
    const index = this.dishIds.indexOf(dishId);
    this.key = String(index);
    localStorage.setItem(this.key,JSON.stringify(comments));
  }
  clearStorage(){
    localStorage.clear();
  }
  clearForm(){
    this.commentFormDirective.resetForm();
    this.commentForm.reset({
      author: '',
      rating: 5,
      comment:'',
      date: new Date()
    });
  }
  onSubmit(): void{
    this.comment = this.commentForm.value;
    console.log(this.comment, this.dish.comments);
    this.dishcopy.comments?.push(this.comment);
    this.dishService.putDish(this.dishcopy).subscribe(dish => {
      this.dish = dish;
      this.dishcopy = dish;
    }, errMess => {
      this.errMess = <any>errMess;
      this.dish = <any>null;
      this.dishcopy = <any>null;
    });
    // this.saveToSession(this.dish.id, this.dish.comments);
    this.clearForm();
  }
  goBack(): void {
    this.location.back();
  }
}

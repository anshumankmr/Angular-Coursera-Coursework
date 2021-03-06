import { Component, createPlatform, OnInit , ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms/';
import { Feedback,ContactType  } from "../shared/feedback";
import { flyInOut, expand } from '../animations/app.animation';
import { FeedbackService } from '../services/feedback.service'
@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
      // tslint:disable-next-line:use-host-property-decorator
      host: {
        '[@flyInOut]': 'true',
        'style': 'display: block;'
        },
        animations: [
          flyInOut(),
          expand()
        ]
})
export class ContactComponent implements OnInit {
  feedbackForm!: FormGroup;
  feedback!: Feedback;
  contactType = ContactType;
  feedbackCopy!: Feedback;
  showSpinner = false;
  showFeedbackForm = true;
  showFeedback = false;
  errMess !: string;
  @ViewChild('fform') feedbackFormDirective;
  formErrors = {
    'firstname': '',
    'lastname': '',
    'telnum': '',
    'email': ''
  };
  validationMessages = {
    'firstname': {
      'required':      'First Name is required.',
      'minlength':     'First Name must be at least 2 characters long.',
      'maxlength':     'FirstName cannot be more than 25 characters long.'
    },
    'lastname': {
      'required':      'Last Name is required.',
      'minlength':     'Last Name must be at least 2 characters long.',
      'maxlength':     'Last Name cannot be more than 25 characters long.'
    },
    'telnum': {
      'required':      'Tel. number is required.',
      'pattern':       'Tel. number must contain only numbers.'
    },
    'email': {
      'required':      'Email is required.',
      'email':         'Email not in valid format.'
    },
  };
  constructor(private fb: FormBuilder,  private feedbackservice: FeedbackService) { 
    this.createForm();
  }
  createForm(){
    // for convenience at this time but may be need elsewhere so we encapsulate it
    this.feedbackForm = this.fb.group({
      firstname: ['',[Validators.required,Validators.minLength(2),Validators.maxLength(25)]],
      lastname: ['',[Validators.required,Validators.minLength(2),Validators.maxLength(25)]],
      telnum: [0,[Validators.required, Validators.pattern("[0-9]+")]],
      email:['',[Validators.required,Validators.email]],
      agree: false,
      contacttype: 'None',
      message:''
    });
    this.feedbackForm.valueChanges.
    subscribe(data => this.onValueChanged(data));
    this.onValueChanged();
  }
    
  onValueChanged(data?: any) {
    if (!this.feedbackForm) { return; }
    const form = this.feedbackForm;
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

  onSubmit() {
    this.feedback = this.feedbackForm.value;//since this matches exactly, if they don't need matching, it must be mapped exactly
    console.log(this.feedback);
    this.showFeedbackForm = false;
    this.showSpinner = true;
    this.feedbackservice.giveFeedback(this.feedback)
      .subscribe(
        feedback => {
         this.feedbackCopy = feedback;
         this.feedback = <any>null; 
         setTimeout(() => { 
           this.feedbackCopy = <any>null; 
           this.showFeedbackForm = true 
           this.showSpinner = false;
          }, 5000); 
        },
        errMess => {
          this.errMess = errMess;
        });
    this.feedbackForm.reset({
      firstname: '',
      lastname: '',
      telnum: 0,
      email:'',
      agree: '',
      contacttype: 'None',
      message:''
    });
    this.feedbackFormDirective.resetForm();
  }
  ngOnInit(): void {
  }

}

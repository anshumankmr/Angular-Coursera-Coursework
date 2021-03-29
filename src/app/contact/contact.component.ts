import { Component, createPlatform, OnInit , ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms/';
import { Feedback,ContactType  } from "../shared/feedback";
@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {
  feedbackForm!: FormGroup;
  feedback!: Feedback;
  contactType = ContactType;
  @ViewChild('fform') feedbackFormDirective;

  constructor(private fb: FormBuilder) { 
    this.createForm();
  }
  createForm(){
    // for convenience at this time but may be need elsewhere so we encapsulate it
    this.feedbackForm = this.fb.group({
      firstname: ['',Validators.required],
      lastname: ['',Validators.required],
      telnum: [0,Validators.required],
      email:['',Validators.required],
      agree: false,
      contacttype: 'None',
      message:''
    });
  }
  onSubmit() {
    this.feedback = this.feedbackForm.value;//since this matches exactly, if they don't need matching, it must be mapped exactly
    console.log(this.feedback);
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

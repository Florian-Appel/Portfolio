import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  contact_validation = {
    name: true,
    email: true,
    message: true,
  }

  messageSend = false;


  contact = {
    name: '',
    email: '',
    message: '',
  };

  post = {
    // Where to send the post request Ex. http://my-domain/sendMail.php
    //or https://my-domain/sendMail.php if you have SSL-Certificate Active
    endPoint: 'https://florian-appel.developerakademie.net/sendMail.php',
    // What to send, notice JSON.stringify
    body: (payload: any) => JSON.stringify(payload),
    // How to send, notice Content-Type and responseType
    options: {
      headers: {
        'Content-Type': 'text/plain',
        responseType: 'text',
      },
    },
  };

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
  }



  /**
   * Do not forget to import FormsModule and HttpCLientModule in app.module.ts
   */
  onSubmit(ngForm: {
    resetForm: any; submitted: any; form: { valid: any; }; 
}) {
    this.updateValidation(ngForm);
    if (ngForm.submitted && ngForm.form.valid) {
      this.http
        .post(this.post.endPoint, this.post.body(this.contact))
        .subscribe({
          next: (response) => {
            ngForm.resetForm()
            this.messageSend = true;
            this.timeOutSendMail();
            console.log(response);
            // Here Message was send
          },
          error: (error) => {
            console.error(error);
            // Here Message was not send!!!!!
          },
          complete: () => console.info('send post complete'),
        });
    }
  }

  timeOutSendMail() {
    setTimeout(() => {
      this.messageSend = false;
    }, 1000);
  }

  updateValidation(ngForm: { submitted?: any; form: any; }) {
    if (ngForm.form.controls.name.status == "INVALID") {
      this.contact_validation.name = false;
    } else {
      this.contact_validation.name = true;
    }
    if (ngForm.form.controls.email.status == "INVALID") {
      this.contact_validation.email = false;
    } else {
      this.contact_validation.email = true;
    }
    if (ngForm.form.controls.message.status == "INVALID") {
      this.contact_validation.message = false;
    } else {
      this.contact_validation.message = true;
    }
  }

}
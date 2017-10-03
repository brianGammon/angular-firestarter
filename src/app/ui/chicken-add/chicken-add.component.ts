import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  templateUrl: './chicken-add.component.html',
  styleUrls: ['./chicken-add.component.scss']
})
export class ChickenAddComponent implements OnInit {
  // eggs: FirebaseListObservable<any> = null;
  // flock: FirebaseObjectObservable<any> = null;
  chickenForm: FormGroup;

  formErrors = {
    'name': '',
    'dob': ''
  };

  validationMessages = {
    'name': {
      'required': 'Chicken name is required.'
    },
    'dob': {
      'required': 'Date of birth is required.'
    }
  };

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private db: AngularFireDatabase
  ) { }

  ngOnInit() {
    this.chickenForm = this.fb.group({
      'name': ['', [
        Validators.required
      ]
      ],
      'dob': ['', [
        Validators.required
      ]
      ],
      'photo': ['']
    });

    this.chickenForm.valueChanges.subscribe(data => this.onValueChanged(data));
    this.onValueChanged(); // reset validation messages

  }

  addChicken() {
    console.log(this.chickenForm.value);
    const itemPath = 'chickens/flockId1';
    const items = this.db.list(itemPath);

    items.push(this.chickenForm.value)
      .then(data => {
        console.log(data);
        this.router.navigateByUrl('/flock');
      })
      .catch(error => console.log(error))
  }

  // Updates validation state on form changes.
  onValueChanged(data?: any) {
    if (!this.chickenForm) { return; }
    const form = this.chickenForm;
    for (const field in this.formErrors) {
      if (Object.prototype.hasOwnProperty.call(this.formErrors, field)) {
        // clear previous error message (if any)
        this.formErrors[field] = '';
        const control = form.get(field);
        if (control && control.dirty && !control.valid) {
          const messages = this.validationMessages[field];
          for (const key in control.errors) {
            if (Object.prototype.hasOwnProperty.call(control.errors, key)) {
              this.formErrors[field] += messages[key] + ' ';
            }
          }
        }
      }
    }
  }

  // getKeys(flock: string) {
  //   return Object.keys(eggs);
  // }

}

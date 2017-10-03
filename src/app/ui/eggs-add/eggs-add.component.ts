import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import * as moment from 'moment';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  templateUrl: './eggs-add.component.html',
  styleUrls: ['./eggs-add.component.scss']
})
export class EggsAddComponent implements OnInit {
  chickens: FirebaseListObservable<any> = null;
  // flock: FirebaseObjectObservable<any> = null;
  eggForm: FormGroup;

  formErrors = {
    'dateLaid': '',
    'chickenId': '',
    'weight': '',
    'damaged': ''
  };

  validationMessages = {
    'dateLaid': {
      'required': 'Date egg was laid is required.'
    },
    'chickenId': {
      'required': 'Chicken ID is required.'
    },
    'weight': {
      'required': 'Weight is required.'
    },
    'damaged': {
      'required': 'Damaged is required.'
    }
  };

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private db: AngularFireDatabase
  ) { }

  ngOnInit() {
    const defaultDate = this.route.snapshot.queryParamMap.get('date') || moment().format('YYYY-MM-DD');
    console.log(defaultDate);
    const chickensPath = 'chickens/flockId1'
    this.chickens = this.db.list(chickensPath);

    this.eggForm = this.fb.group({
      'dateLaid': [defaultDate, [
        Validators.required
      ]],
      'chickenId': ['', [
        Validators.required
      ]
      ],
      'weight': ['', [
        Validators.required
      ]
      ],
      'damaged': ['']
    });

    this.eggForm.valueChanges.subscribe(data => this.onValueChanged(data));
    this.onValueChanged(); // reset validation messages

  }

  addEgg() {
    const itemPath = 'eggs/flockId1';
    const items = this.db.list(itemPath);
    const newEgg = {
      'date': this.eggForm.value['dateLaid'],
      'chicken': this.eggForm.value['chickenId'],
      'weight': this.eggForm.value['weight'],
      'damaged': !!this.eggForm.value['damaged']
    }
    items.push(newEgg)
      .then(data => {
        console.log(data);
        this.router.navigateByUrl('/eggs/' + this.eggForm.value['dateLaid']);
      })
      .catch(error => console.log(error))
  }

  // Updates validation state on form changes.
  onValueChanged(data?: any) {
    if (!this.eggForm) { return; }
    const form = this.eggForm;
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

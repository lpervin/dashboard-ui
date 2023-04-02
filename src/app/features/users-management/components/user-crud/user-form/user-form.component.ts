import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserModel } from '../../../models/UsersModel';

@Component({
  selector: 'ui-dashboard-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit {
  @Output() save = new EventEmitter();
  @Output() cancel = new EventEmitter();
  
  userForm = new FormGroup({
    name: new FormControl("", Validators.required),
    age: new FormControl(0, Validators.min(18)),
    email: new FormControl("", [Validators.required, Validators.email])
  });

  userId!: string | null;
  @Input() set userupdate(userToUpdate: UserModel | null | undefined){
      this.userForm.reset();
      if (userToUpdate){
        this.userForm.setValue({
          name: userToUpdate.name,
          age: userToUpdate.age,
          email: userToUpdate.email
        });
        this.userId = userToUpdate?.id;
      }
  }

  get name() {
    return this.userForm.get("name");
  }

  get age() {
    return this.userForm.get("age");
  }

  get email() {
    return this.userForm.get("email");
  }
  constructor() { }

  ngOnInit(): void {
  }

  onSubmit(formValue:UserModel):void{
    this.save.emit({...formValue, id: this.userId});
  }  
}

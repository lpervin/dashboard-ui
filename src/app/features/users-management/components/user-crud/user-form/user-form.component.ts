import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
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
    name: new FormControl(""),
    age: new FormControl(0),
    email: new FormControl("")
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
  constructor() { }

  ngOnInit(): void {
  }

  onSubmit(formValue:UserModel):void{
    this.save.emit({...formValue, id: this.userId});
  }  
}

import { Component, Inject, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-dialog-settingprofile',
  templateUrl: './dialog-settingprofile.component.html',
  styleUrls: ['./dialog-settingprofile.component.scss']
})
export class DialogSettingprofileComponent implements OnInit {

  public userInfo: any;
  public userName: any;

  constructor(
    public dialogRef: MatDialogRef<DialogSettingprofileComponent>,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.userInfo = this.userService.user
    this.userName = this.userInfo.userName
  }

  onNoClick(): void{
    this.dialogRef.close();
  }

  public async updateProfile(){
    let mess = await this.userService.updateProfile(this.userInfo._id, this.userName, this.userInfo.avatar);
    console.log(this.userInfo._id);
    alert(mess);
    this.dialogRef.close();
  }

}

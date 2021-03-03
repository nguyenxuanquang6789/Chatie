import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  data: []
  constructor(private http: HttpClient) { }
  async registerAccount(email,userName,password){ 
    let result;
    let temp;
    let registerUrl ="http://192.168.31.158:8080/user/email"
   result = await this.http.post(registerUrl,{
    email:email, 
    userName:userName , 
    password: password
   }).toPromise().then(data=>{ 
     temp=data;
      console.log(temp.message);
      
   })
   console.log(temp)
   return temp
  }
}
 


import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BackendserviceService } from '../backendservice.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  title = 'reactiveforms';
  userList : any =[];
  
  expresponse : string="";

  constructor(private http : HttpClient,
    private baccess : BackendserviceService){

  }
  getAllUsers(){
  //   this.http.get('http://localhost:8002/DisplayAllUser').subscribe((response)=>{
  //     this.userList=response;
  //     console.log(this.userList);   
  // }
  //   );

        //for backend access
        this.userList = this.baccess.getAllUsers();

  }
  addUser(udata:any)
  {// for adding users
    // console.log("user data", udata);
    // console.log(udata.value);
    // this.userList.push(udata.value);
    // this is for sending post request
    // this.http.post('http://localhost:8002/AddUser',udata.value).subscribe((response)=>
    // { 
    //   this.expresponse=response.toString();

    // })
    //this is for accessing backend service
    this.expresponse=this.baccess.addUser(udata);
  }
  // editUser()
  // {
  //   this.http.post('http://localhost:8002/AddUser',udata.value).subscribe((response)=>
  //   { 
  //     this.expresponse=response.toString();

  //   })
  // }
  // editUser(udata: any) {
    
  //   const userId = udata.id; 
  
    
  //   const updatedUserData = {
  //     id: userId,
  //     password: udata.pass,
  //     Email: udata.email,
      
  //   };
  
  //   this.http.put('http://localhost:8002/UpdateUser', [{'uid':userId}], updatedUserData)
  //     .subscribe((response) => {
  //       this.expresponse = response.toString();
  //       // Handle the response as needed (e.g., display a success message)
  //     });
  // }
}

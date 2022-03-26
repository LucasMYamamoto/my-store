import { FilesService } from './services/files.service';
import { UsersService } from './services/users.service';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  imgParent = '';
  showImg = true;
  widthImg = 10;
  name = 'Lucas';
  age = 18;
  img = 'https://www.w3schools.com/howto/img_avatar.png';
  btnDisabled = true;
  register = {
    'name': '',
    'email': '',
    'password': ''
  }

  person = {
    name: 'Lucas',
    age: 36,
    avatar: 'https://www.w3schools.com/howto/img_avatar.png'
  }
  names: string[] = ['Lucas', 'Lupe', "Benja"];
  newName = '';
  box = {
    width: 100,
    height: 100,
    background: 'red'
  }

  //token_access
  token='';
  imgRta = '';

  // product: Product = {
  //   id: '1',
  //   name: 'Product 1',
  //   image: './assets/images/toy.jpg',
  //   price: 100
  // }

  constructor(
    private authService: AuthService,
    private usersService: UsersService,
    private filesService: FilesService
  ) { }

  toggleButton() {
    this.btnDisabled = !this.btnDisabled;
  }

  increaseAge() {
    this.person.age += 1;
  }

  onScroll(event: Event) {
    const element = event.target as HTMLElement;
    // console.log(element.scrollTop);
  }

  changeName(event: Event) {
    const element = event.target as HTMLInputElement;
    element.value;
    this.person.name = element.value;
  }

  addName() {
    this.names.push(this.newName);
    this.newName = '';
  }

  deleteName(index: number) {
    this.names.splice(index, 1);
  }

  onRegister() {
    console.log(this.register);

  }

  onLoaded(img: string) {
    // console.log('log padre',img);
  }

  toggleImg() {
    this.showImg = !this.showImg;
  }

  createUser(){
    this.usersService.create({
      name: 'Lucas',
      email: 'lucas@gmail.com',
      password: '12345'
    })
    .subscribe(rta => {
      console.log(rta);
    });
  }

  donwloadPdf(){
this.filesService.getFile('my-pdf','https://young-sands-07814.herokuapp.com/api/files/dummy.pdf','application/pdf')
.subscribe()
  }

  onUpload(event: Event) {
    const element = event.target as HTMLInputElement;
    const file = element.files?.item(0);
    if (file) {
      this.filesService.uploadFile(file)
      .subscribe(rta => {
        this.imgRta = rta.location;
      });
    }

  }
}

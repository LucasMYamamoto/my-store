import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  imgParent='';
  showImg =true;
  widthImg= 10;
  name = 'Lucas';
  age= 18;
  img = 'https://www.w3schools.com/howto/img_avatar.png';
  btnDisabled =true;
  register = {
    'name': '',
    'email':'',
    'password': ''
  }

  person = {
    name: 'Lucas',
    age: 36,
    avatar: 'https://www.w3schools.com/howto/img_avatar.png'
  }
  names: string[] = ['Lucas', 'Lupe', "Benja"];
  newName='';
  box ={
    width: 100,
    height: 100,
    background: 'red'
  }

  // product: Product = {
  //   id: '1',
  //   name: 'Product 1',
  //   image: './assets/images/toy.jpg',
  //   price: 100
  // }

  toggleButton(){
    this.btnDisabled= !this.btnDisabled;
  }

  increaseAge(){
    this.person.age += 1;
  }

  onScroll(event: Event){
    const element = event.target as HTMLElement;
    console.log(element.scrollTop);
  }

  changeName(event: Event){
    const element = event.target as HTMLInputElement;
    element.value;
    this.person.name = element.value;
  }

  addName(){
    this.names.push(this.newName);
    this.newName ='';
  }

  deleteName(index: number){
    this.names.splice(index,1);
  }

  onRegister(){
    console.log(this.register);

  }

  onLoaded(img: string){
    console.log('log padre',img);


  }

  toggleImg(){
    this.showImg = !this.showImg;
  }

}

import { Injectable } from '@angular/core';
import { Http } from "@angular/http";

@Injectable()
export class ProductosService {

  productos:any[] = [];
  cargando_productos:boolean = false;


  constructor(public http:Http) {

    this.cargar_productos();
  }

  public cargar_producto( cod:string){
    return this.http.get(`https://danieljuarez-c7e2b.firebaseio.com/productos/${ cod }.json`)
  }

  public cargar_productos(){

    this.cargando_productos = false;
      this.http.get("https://danieljuarez-c7e2b.firebaseio.com/productos_idx.json")
      .subscribe( data => {

          this.cargando_productos= true;
        this.productos = data.json();
         
      });

  }
}

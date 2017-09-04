import { Injectable } from '@angular/core';
import { Http } from "@angular/http";

@Injectable()
export class ProductosService {

  productos:any[] = [];
  productos_filtrados:any[]= [];
  cargando_productos:boolean = false;


  constructor(public http:Http) {

    this.cargar_productos();
  }

  public cargar_producto( cod:string){
    return this.http.get(`https://danieljuarez-c7e2b.firebaseio.com/productos/${ cod }.json`)
  }

  public cargar_productos(){

    let promesa = new Promise( ( resolve, reject )=>{
 this.cargando_productos = false;
      this.http.get("https://danieljuarez-c7e2b.firebaseio.com/productos_idx.json")
      .subscribe( data => {

          this.cargando_productos= true;
        this.productos = data.json();
        resolve();
         
      });

    }); 
return promesa;
  }

  public buscar_producto(termino:string ){
    //console.log("Buscando producto...");
    //console.log(this.productos.length);

    if(this.productos.length == 0){
      this.cargar_productos().then(()=>{
        //termino la carga de productos
        this.filtrar_productos(termino);
      });
    }else{
this.filtrar_productos(termino);
    }

  }
  private filtrar_productos(termino:string){
    this.productos_filtrados = [];
    termino = termino.toLowerCase();

    this.productos.forEach(prod => {
      
      if(prod.categoria.indexOf(termino) >=0 || prod.titulo.toLowerCase().indexOf(termino) >=0){
this.productos_filtrados.push(prod);
//console.log(prod);

      }
      //console.log(prod);
    }); 
  }
}

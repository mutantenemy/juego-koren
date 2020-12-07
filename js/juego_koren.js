var canvas;
var ctx;

/*variables para imagenes*/
var imgPersonaje1;
var imgCautivadora;
var imgFlor;
var imgAloeVera;
var imgCarnivora;
//variables de plantas

//variables para audio
var audioPerdida=0;
var audioPuntos=0;

var puntos=0;
var vidas=3;
var teclaSalto=false;

/*Variable para el fondo*/
var posicionFondo=0;

function Personaje(x,y,ancho,alto){
	this.x=x;
	this.y=y;
	this.ancho=ancho;
	this.alto=alto;
	//metodos --> adelante, subir, bajar, patear--PISO DE ARRIBA/PISO DE ABAJO//
	this.arriba=function(){
		if(this.y>270){
			this.y-=30;
			this.x+=20;
		}
	}
	this.abajo=function(){
		if(this.y<340){
			this.y+=30;
			this.x+=20;
		}
		
	}
	this.derecha=function(){
		if(this.x<720){
			this.x+=10; //this.x=this.x+10
			posicionFondo-=3;
		}
		imgPersonaje1.src="img/personaje01.png" //estp hay que hacerlo cuando patea
	}
	this.izquierda=function(){ //no debería ir para atrás Noah
		if(this.x>0){
			this.x-=10;
			posicionFondo+=3;
		}
		//imgPersonaje1.src="img/personaje02.png" //
		
	}
	/*this.agachar=function(){
		this.alto=75;
		this.y=415;
	}*/
	this.dibujaPersonaje=function(){
		ctx.drawImage(imgPersonaje1,this.x,this.y,this.ancho,this.alto);
	}
}

function Elemento(x,y,tipo,ancho,alto){
	this.x=x;
	this.y=y;
	this.tipo=tipo;
	this.ancho=ancho;
	this.alto=alto;

	this.dibujaElemento=function(img){
		ctx.drawImage(img,this.x,this.y,this.ancho,this.alto);
	}
	this.mover=function(){ //si el fondo se mueve, los objetos tambien deberian... no sabemos regular velocidad//
		if(this.x>-10){
			this.x-=10;
		}else{
			this.sortear();
		}
		
	}
	this.sortear=function(){
		//sorteo en x
		//formula (maximo-minimo+1)+minimo
		//entre 900 y 1500
		this.x=Math.floor(
				Math.random()*(1500-900+1)
				)+900; // Ya saben en que posicion de X tienen que crearse los elementos. Cambien esto a canvas.x o canvas.width
		//entre 340 y 500
		this.y=Math.floor(
				Math.random()*(500-340+1)
				)+340; // hagan un random que solo tire 2 valores y de ahi determinar con un IF si se crea en el piso o en el techo
	}
	this.colision=function(){ //con cada objetos//
		/* IF
			Elemento esta por debajo del origen del personae
			Origen del elemento esta por arriba del piso del personje
			Elemento esta por la derecha del origen del personaje
			Origen del elemento esta dentro del personaje
		*/	 
		if(
			(this.y+this.alto)>personajeUno.y
			&&(this.y)<(personajeUno.y+personajeUno.alto)
			&&(this.x+this.ancho)>personajeUno.x
			&&(this.x)<(personajeUno.x+personajeUno.ancho)
			){
			this.sortear();
			if(this.tipo=="flor"){
				puntos+=10;
				audioPuntos.play();
			}else{
				vidas--;
				audioPerdida.play()
			}
		}
	}
}

function Carnivora (x,y, ancho, alto, imagen){
	this.x=x
	this.y=y
	this.ancho=ancho
	this.alto=alto
	this.imagen=imagen

	this.dibujaCarnivora=function(img){
		ctx.drawImage(img,this.x,this.y,this.ancho,this.alto);
	}
	/*this.mover=function(){ //si el fondo se mueve, los objetos tambien deberian... no sabemos regular velocidad//
		if(this.x>-10){
			this.x-=10;
		}else{
			this.sortear();
		}
		
	}
	this.sortear=function(){
		//sorteo en x
		//formula (maximo-minimo+1)+minimo
		//entre 900 y 1500
		this.x=Math.floor(
				Math.random()*(1500-900+1)
				)+900; // Ya saben en que posicion de X tienen que crearse los elementos. Cambien esto a canvas.x o canvas.width
		//entre 340 y 500
		this.y=Math.floor(
				Math.random()*(500-340+1)
				)+340; // hagan un random que solo tire 2 valores y de ahi determinar con un IF si se crea en el piso o en el techo
	}*/
	this.colision=function(){ //con cada objetos//
		/* IF
			Elemento esta por debajo del origen del personae
			Origen del elemento esta por arriba del piso del personje
			Elemento esta por la derecha del origen del personaje
			Origen del elemento esta dentro del personaje
		*/	 
		if(
			(this.y+this.alto)>personajeUno.y
			&&(this.y)<(personajeUno.y+personajeUno.alto)
			&&(this.x+this.ancho)>personajeUno.x
			&&(this.x)<(personajeUno.x+personajeUno.ancho)
			){
			this.sortear();
			if(this.tipo=="cranivora"){
			borrar();
			ctx.font="80px Impact";
			ctx.fillStyle="#000";
			ctx.fillText("Game Over",360,300); //screenshot noah muerto
				audioPerdida.play()
			}
		}
	}
}
/*crear objetos*/

var personajeUno=new Personaje(200,340,240,135);//los ultimos dos valores son ancho y alto  MODIFICAR TAMAÑO
var florUno=new Elemento(900,400,"flor",33,60);//los ultimos dos valores son ancho y alto
var cautivadoraUno=new Elemento(1300,490,"cautivadora",130,73);//los ultimos dos valores son ancho y alto
var aloeVeraUno=new Elemento (500,220,"aloeVera",130,73);
var carnivoraUno=new Carnivora(0,0,"carnivora",150,160); // Carnivora deberia ser su pripio objeto con otras reglas
// modificar con plantas de la clase element cautivadora - carnivora - aloeVera y flor//


function dibujar(){
	//selecciono el canvas
	canvas=document.getElementById("canvas");
	canvas.style.backgroundImage="url(img/fondo.png)"; //fondoPueblo (hacer inifnito)
	canvas.style.backgroundSize="cover";

	//defino el contexto
	ctx=canvas.getContext("2d");

	dibujaTexto();

	/*Manera en que dibuja al personaje*/
	imgPersonaje1=new Image();//creo un objeto image
	imgPersonaje1.src="img/personaje01.png";
	imgPersonaje1.onload=function(){//si la imagen está cargada
		personajeUno.dibujaPersonaje();
	}

	/*Manera que dibuja el diamante*/ //cambiar por plantas//
	imgFlor=new Image();
	imgFlor.src="img/flor.png";
	imgFlor.onload=function(){
		florUno.dibujaElemento(imgFlor);
	}

	/*Manera que dibuja la bomba*/
	imgCautivadora=new Image();
	imgCautivadora.src="img/cautivadora.png";
	imgCautivadora.onload=function(){
		cautivadoraUno.dibujaElemento(imgCautivadora);
	}

	imgAloeVera=new Image();
	imgAloeVera.src="img/aloeVera.png";
	imgAloeVera.onload=function(){
		aloeVeraUno.dibujaElemento(imgAloeVera);
	}
	imgCarnivora=new Image();
	imgCarnivora.src="img/carnivora.png";
	imgCarnivora.onload=function(){
		carnivoraUno.dibujaCarnivora(imgCarnivora);

	//audios
	audioPerdida=new Audio();
	audioPerdida.src="audios/perdida.mp3";
	audioPuntos=new Audio();
	audioPuntos.src="audios/puntos.mp3"

	setInterval(function(){
		if(vidas>0){
			/*Hacer que los elementos se muevan*/
			cautivadoraUno.mover();
			florUno.mover();
			aloeVeraUno.mover();
			//carnivoraUno.mover();
			if(teclaSalto==true){
				personajeUno.arriba();
			}else{
				personajeUno.abajo();
			}
			/*ver si colisionaron con el personaje*/ //PLANTAAS//
			cautivadoraUno.colision();
			florUno.colision();
			aloeVeraUno.colision();
			carnivoraUno.colision();
			/*borra y redibuja*/
			borrar();
			dibujaTexto();
			personajeUno.dibujaPersonaje();
			florUno.dibujaElemento(imgFlor);
			cautivadoraUno.dibujaElemento(imgCautivadora);
			aloeVeraUno.dibujaElemento(imgAloeVera);
			carnivoraUno.dibujaCarnivora(imgCarnivora);
		}else{
			borrar();
			ctx.font="80px Impact";
			ctx.fillStyle="#000";
			ctx.fillText("Game Over",360,300); //screenshot noah muerto//
		}
		
	},1000/25);
	return
}



function borrar(){
	canvas.width=1066;
	canvas.heigth=600;
}
function dibujaTexto(){
	ctx.font="20px Impact"; //definia la fuente
	ctx.fillStyle="#000000";//definia el color
	//Dibuja un texto recibe 3 valores, el texto, posX, posY
	ctx.fillText("Vidas: "+vidas,715,40);
	ctx.fillText("Puntos: "+puntos,20,40);

}
document.addEventListener("keydown",function(e){
	switch(e.keyCode){
		case 38:
			teclaSalto=true;
		break;
		case 40:
			personajeUno.agachar();
		break;

		case 39:
			personajeUno.derecha();
		break;
	}
	canvas.style.backgroundPosition=posicionFondo+"px 0px";
});
document.addEventListener("keyup",function(e){
	personajeUno.alto=150;//reestablecemos el alto del personaje
	personajeUno.y=340;//restablecemos la posición del personaje
	teclaSalto=false;
})
};
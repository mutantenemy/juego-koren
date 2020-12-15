var canvas;
var ctx;
//var fuente= new FontFace ("NOMBRE FUENTE", "url(fonts/Heaters.otf") format ("truetype")");

/*variables para imagenes*/
var imgPersonaje1=new Image();
var imgCautivadora=new Image();
var imgFlor=new Image();
var imgAloeVera=new Image();
var imgCarnivora=new Image();
//CREO VARIABLES PARA CORAZONES
var imgCora1=new Image();
var imgCora2=new Image();
var imgCora3=new Image();
//Source
imgCora1.src="img/cora1.png";
imgCora2.src="img/cora2.png";
imgCora3.src="img/cora3.png";

//variables para audio
var audioPerdida=0;
var audioPuntos=0;


var puntos=0;
var vidas=3;
/*var teclaSalto=false*/
var colorBoton="#000"
var inicio=false;
var intervalo;

var posXPer=600;
var posYPer=350;
var arrastrar=false;

/*Variable para el fondo*/
var posicionFondo=0;
var opciones= [100,450];
var posicion=Math.floor(Math.random ()*2);
var posicionEnY= opciones [posicion];


function dibujar(){
	//selecciono el canvas
	canvas=document.getElementById("canvas");
	canvas.style.backgroundImage="url(img/fondo.png)"; //fondoPueblo (hacer inifnito)
	canvas.style.backgroundSize="cover";
	//defino el contexto
	ctx=canvas.getContext("2d");
	dibujarTextoInicio();
}

function juego(){
	borrar();
	inicio=true;//indico que le juego esta iniciado
	canvas.style.cursor="";
	/*Manera en que dibuja al personaje*/
	imgPersonaje1.src="img/personaje01.png";
	imgPersonaje1.onload=function(){//si la imagen está cargada
		personajeUno.dibujaPersonaje();
	}

	imgFlor.src="img/flor.png";
	imgFlor.onload=function(){
		florUno.dibujaElemento(imgFlor);
	}
	
	imgCautivadora.src="img/cautivadora.png";
	imgCautivadora.onload=function(){
		cautivadoraUno.dibujaElemento(imgCautivadora);
	}

	imgAloeVera.src="img/aloeVera.png";
	imgAloeVera.onload=function(){
		aloeVeraUno.dibujaElemento(imgAloeVera);
	}
	
	imgCarnivora.src="img/carnivora.png";
	imgCarnivora.onload=function(){
		carnivoraUno.dibujaCarnivora(imgCarnivora);
	}

	

	//audios
	audioPerdida=new Audio();
	audioPerdida.src="audios/perdida.mp3";
	audioPuntos=new Audio();
	audioPuntos.src="audios/puntos.mp3";


	intervalo=setInterval(function(){
		borrar();
		if(vidas==0){
			ctx.font="100px impact";
			ctx.fillStyle="#000000";
			ctx.fillText('GAME OVER', 350,300);
			ctx.fillStyle=colorBoton;
			ctx.font="30px impact";
			ctx.fillText('REINICIAR',350,350);
		}else{
			dibujaTexto();
			/*Hacer que los elementos se muevan*/
			cautivadoraUno.mover();
			florUno.mover();
			aloeVeraUno.mover();
			
			/*if(teclaSalto==true){
				personajeUno.arriba();
			}else{
				personajeUno.abajo();
			}*/
			/*ver si colisionaron con el personaje*/ 
			cautivadoraUno.colision();
			florUno.colision();
			aloeVeraUno.colision();
			carnivoraUno.colision();
			

			personajeUno.dibujaPersonaje();
			florUno.dibujaElemento(imgFlor);
			cautivadoraUno.dibujaElemento(imgCautivadora);
			aloeVeraUno.dibujaElemento(imgAloeVera);
			carnivoraUno.dibujaCarnivora(imgCarnivora);
			

			
			posicionFondo-=10;
			canvas.style.backgroundPosition=posicionFondo+"px 0px";
			dibujaVidas();
			coraUno.dibujaCora(imgCora1);
			coraDos.dibujaCora(imgCora2);
			coraTres.dibujaCora(imgCora3);

			
			//canvas.src="imagengameover.jpg" //screenshot noah muerto//
		}
		
	},1000/25);
}

function dibujaVidas(){
	switch(vidas){
		//case 0:
		case 1:
			//coraUno.dibujaCora(imgCora1);
			coraUno.mostrar();
			coraDos.ocultar();
			coraTres.ocultar();
			break;
		case 2:
			//coraDos.dibujaCora(imgCora2);
			coraDos.mostrar();
			coraUno.ocultar();
			coraTres.ocultar();
			break;
		case 3:
			//coraTres.dibujaCora(imgCora3);
			coraTres.mostrar();
			coraUno.ocultar();
			coraDos.ocultar();
			break;
		default:
			break;
	}
}

function dibujaTexto(){
	ctx.font="20px Impact"; //definia la fuente
	ctx.fillStyle="#000000";//definia el color
	//Dibuja un texto recibe 3 valores, el texto, posX, posY
	ctx.fillText("Vidas: "+vidas,715,40);
	ctx.fillText("Puntos: "+puntos,20,40);

}
function dibujarTextoInicio(){
	borrar();
	ctx.font="40px impact";
	ctx.fillStyle=colorBoton;
	ctx.fillText('INICIAR', 350,350);
}


function Personaje(x,y,ancho,alto){
	this.pateando=false
	this.x=x;
	this.y=y;
	this.ancho=ancho;
	this.alto=alto;
	//metodos --> adelante, subir, bajar, patear--PISO DE ARRIBA/PISO DE ABAJO//
	this.arriba=function(){
		if(this.y==350){
			this.y-=265;
			/*this.ancho==350;
			this.alto==170;*/
		}
		
	}
	this.abajo=function(){
		if(this.y==85){
			this.y+=265;
			}
	}		
	this.derecha=function(){
		if(this.x<720){
			this.x+=10; //this.x=this.x+10
			posicionFondo-=10;
		}
	}	
	this.izquierda=function(){
		if(this.x>-50){
			this.x-=10;
			posicionFondo+=3;
		}	
	}
	this.patear=function(){ //no debería ir para atrás Noah
		//console.log("Pateando = " + this.pateando)
		imgPersonaje1.src="img/personaje02.png"	
		this.pateando=true
	}
	/*this.arrastrar=function(){
		this.x=-10;
	}*/

	/*this.agachar=function(){
		this.alto=75;
		this.y=415;
	}*/
	this.dibujaPersonaje=function(){
		ctx.drawImage(imgPersonaje1,this.x,this.y,this.ancho,this.alto);
	}
}

function Elemento(x,y,tipo,ancho,alto){
	this.golpear=true
	this.x=x;
	this.y=y;
	this.tipo=tipo;
	this.ancho=ancho;
	this.alto=alto;

	this.dibujaElemento=function(img){
		ctx.drawImage(img,this.x,this.y,this.ancho,this.alto);
	}
	this.mover=function(){ //si el fondo se mueve, los objetos tambien deberian... no sabemos regular velocidad//
		if(this.x>-50){
			this.x-=20; 
			//if(this.tipo=="cautivadora" && arrastrar==true){
			//	personajeUno.x-=10	
			//}else if(arrastrar==true && personajeUno.pateando==true){
			//	arrastrar=false
			//}
		}else{
			
			// EL -800 ES TWEAKABLE PARA LA FRECUENCIA EN LA QUE APARECEN ALOE VERAS
			if(this.tipo=="aloeVera" && this.x>-800){
				// Soy AloeVera y estoy Entre -800 y -10
				this.x-=20;
			} else {
				// No soy Aloe Vera O estoy a la izquierda de -800
				this.sortear();
			}
		}
	}
	this.sortear=function(){
		//sorteo en x
		//formula (maximo-minimo+1)+minimo
		//entre 900 y 1500
		if(this.tipo=="aloeVera"){

			this.x=Math.floor(
				Math.random()*(6000-5000+1)
				)+10000; 
		}else{
			this.x=Math.floor(
				Math.random()*(3000-1500+1)
				)+1500;  
		}
		this.y=posicionEnY
	
		
				// hagan un random que solo tire 2 valores y de ahi determinar con un IF si se crea en el piso o en el techo
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
			//this.sortear();
			if(this.tipo=="flor"){
				puntos+=10;
				this.sortear();
				audioPuntos.play();
			}else if
				(this.tipo=="aloeVera")
				{
					if(vidas<3){
					vidas++;
					this.sortear();
				}
					
			}
			else if
				(this.tipo=="cautivadora"){
				if (this.golpear){				
					vidas--;
				 	this.golpear=false
				}
				if(this.tipo=="cautivadora" && arrastrar==true){
					personajeUno.x-=20
				}
				audioPerdida.play();
				if(personajeUno.pateando && arrastrar==true){
					//console.log ("Planta pateada")
					arrastrar=false;
					this.sortear();
					this.golpear=true
				}else{
					//console.log ("Arrastrando a Noah")
					arrastrar=true
					//this.x-=10
				}
			}


		}
	}
}

function Carnivora (x,y, ancho, alto){
	this.x=x
	this.y=y
	this.ancho=ancho
	this.alto=alto

	this.dibujaCarnivora=function(){
		ctx.drawImage(imgCarnivora,this.x,this.y,this.ancho,this.alto);
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
			(personajeUno)&&(this.y+this.alto)>personajeUno.y
			&&(this.y)<(personajeUno.y+personajeUno.alto)
			&&(this.x+this.ancho)>personajeUno.x
			&&(this.x)<(personajeUno.x+personajeUno.ancho)
			){
			ctx.font="80px Impact";
			ctx.fillStyle="#000";
			ctx.fillText("Game Over",360,300);
			imgPersonaje1.src="imagengameover.jpg"
			 //screenshot noah muerto
				audioPerdida.play()
			}
		}
	}
			

function Cora(x,y, ancho, alto){
	this.x=x
	this.y=y
	this.ancho=ancho
	this.alto=alto

	this.dibujaCora=function(img){
		//console.log("Estoy dibujando corazones")
		ctx.drawImage(img,this.x,this.y,this.ancho,this.alto);
	}

	this.mostrar=function(){
		this.x=800

	}
	this.ocultar=function(){
		this.x=-800

	}

}

/*crear objetos*/

var personajeUno=new Personaje(posXPer,posYPer,180,180);//los ultimos dos valores son ancho y alto  MODIFICAR TAMAÑO
var florUno=new Elemento(900,400,"flor",53,95);//los ultimos dos valores son ancho y alto
var cautivadoraUno=new Elemento(1300,100,"cautivadora",160,110);//los ultimos dos valores son ancho y alto
var aloeVeraUno=new Elemento (800,340,"aloeVera",90,80);
var carnivoraUno=new Carnivora(0,180,200,240); // Carnivora deberia ser su pripio objeto con otras reglas
// modificar con plantas de la clase element cautivadora - carnivora - aloeVera y flor//
//CREE OBJETOS PARA CORAZON
var coraUno=new Cora(715,50,100,40);
var coraDos=new Cora(715,50,100,40);
var coraTres=new Cora(715,50,100,40);





function borrar(){
	canvas.width=1066;
	canvas.heigth=600;
}



document.addEventListener("keydown",function(e){
	switch(e.keyCode){
		/*case 37:
			personajeUno.izquierda();
		break;*/
		case 38:
			if(arrastrar==false){
				personajeUno.arriba();
			}
		break;
		case 40:
			if(arrastrar==false){
				personajeUno.abajo();
			}
		break;
		
		/*case 39:
			personajeUno.derecha();
		break;*/

		case 32:
			personajeUno.patear();
		break;

	}
	canvas.style.backgroundPosition=posicionFondo+"px 0px";
});
document.addEventListener("keyup",function(e){
	/*personajeUno.alto=150;//reestablecemos el alto del personaje
	personajeUno.y=340;//restablecemos la posición del personaje
	teclaSalto=false;*/
	//Comentario de Alicia: acá evaluo que se suelta cierta tecla y suelto la patada
	if(e.keyCode==32){
		
		imgPersonaje1.src="img/personaje01.png"
		personajeUno.pateando=false
		console.log("Pateando = " + personajeUno.pateando)
	}
	
});

/*Reinicio del juego*/
document.addEventListener('click',function(e){
	//Acá evaluo en función de vidas y de la variable inicio, si estoy al principio o al final del juego
	if(vidas==0){
		if(e.x>200&&e.x<500&&e.y>300&&e.y<380){
			vidas=3;
			puntos=0;
			personajeUno.x=posXPer;
			personajeUno.y=posYPer;
		}
	}else if(inicio==false){
		//si inicio es falso estamos al principio del juego y llamo a la función juego
		juego();
	}
	});
document.addEventListener('mousemove',function(e){
	//si está al final o al principio del juego:
	if(vidas==0 || inicio==false){
		if(e.x>200&&e.x<500&&e.y>300&&e.y<380){
				canvas.style.cursor="pointer";
				colorBoton="#fff";
		}else{
			canvas.style.cursor="";
			colorBoton="#000";
		}
		//y si es al principio, hago que redibuje el botón de inicio.
		if(inicio==false){
			dibujarTextoInicio();
		}
	}
	
});
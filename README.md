# JuegoInterfaces para práctica 5 - Isabel
Documentación de resolución de ejercicios

Se ruega jugar el juego en una pantalla con resolución 1920x1080 para su correcto funcionamiento.

# EJERCICIO 1

### Movimiento del personaje principal con teclado

Para en movimiento del personaje principal hemos creado en el documento html en el que se encuentra el personaje un div con una id personaje y que posteriormente posicionaremos en el mapa con las propiedades css top y left, ya que en el archivo style.css está definida como absolute.

    <div id='personaje'>

*codigo.js lineas 106,123,150,174*

Crearemos una clase Personaje en clases.js que guarde la capa donde está alojado el personaje, su anchura y altura y sus posiciones.

```
class Personaje { // Personaje principal.
    constructor(capa) {
        this.capa = capa;
        this.izquierda = capa.offset().left;
        this.arriba = capa.offset().top;
        this.altura = capa.outerHeight(true);
        this.anchura = capa.outerWidth(true);
        this.derecha = this.izquierda + this.anchura;
        this.abajo = this.arriba + this.altura;
    }
```
*clases.js lineas 2-11*

Una vez tenemos las dos anteriores, creamos en codigo js el personaje en cuestión.

    personaje = new Personaje($('#personaje'));

*codigo.js lineas 187*

Para detectar que teclas estamos pulsando, creamos un evento keydown que detecta cuando se pulsa una tecla y guarda su codigo numérico. Posteriormente llamamos al método mueve() mandandole la numeración de tecla recibida.

```
$(document).keydown(function(e) {
t = e.which;
mueve(t);
});
```
*codigo.js lineas 206-209*

La función mueve() contendrá un switch que dependiendo de la numeración recibida llamará a la función personaje.moverX() que le corresponda y guardaremos en la variable global ultimaPosicion la dirección a la que accedemos para el apartado PNG de este punto. En esta explicación solo se hablará de la opción 38  (tecla Arriba)  para reducir la demostración de codigo.

```
function mueve(t) {
switch(t)
  {
     case 37:
     personaje.moverIzquierda(1);
     break;
     case 39:
     personaje.moverDerecha(1);
     break;
     case 38:
     personaje.moverArriba(1);
     ultimaPosicion = "arriba";
     break;
     case 40:
     personaje.moverAbajo(1);
     break;
  }
}
```
*codigo.js lineas 224-432*

Una vez ha llamado a la función, en este caso se especifica un tipo por lo que veremos en el ejercicio 3, esta función sumara a la dirección escogida (en este caso: top) los pixeles que especifiquemos. Y, finalmente, actualizará las coordenadas con respecto a su tamaño llamando a la funcion actualizaCoordenadas() que tiene la misma clase Personaje.

```
moverArriba(tipo) {
 if(tipo==1)
   {
     this.capa.animate({ top: this.arriba -= 5 }, { duration: 1, queue: false});
   }
 this.actualizaCoordenadas();
}

actualizaCoordenadas(movimiento) {
    this.derecha = this.izquierda + this.anchura;
    this.abajo = this.arriba + this.altura;
}
```
*clases.js lineas 244-343*

### Imagen gif al moverse

Para cambiar la imagen al moverse nos remitimos de nuevo a la función moverX() que hemos visto anteriormente, en el caso de este juego en particular habrá dos opciones porque se permite elegir sexo al inicio del juego, con una variable global que será 0 si es un chico o 1 si es una chica. Una vez ha comprobado si es chico o chica, cambia la imagen de fondo de la capa a la adecuada y adapta las propiedades css width y height a la altura y anchura de la imagen en concreto.

```
moverArriba(tipo) {
    if(sexo==0)
    {
        this.capa.css("background-image", "url(images/personaje/chicoArriba.gif)");
        this.capa.css("width", "35px");
        this.capa.css("height", "47px");
    }
    else
    {
        this.capa.css("background-image", "url(images/personaje/chicaArriba.gif)");
        this.capa.css("width", "29px");
        this.capa.css("height", "45px");
    }
}
```
*clases.js lineas 244-339*

### Imagen PNG al pararse

Para cambiar la imagen a PNG una vez que dejamos de pulsar la tecla usamos un evento keyup en el que llamamos a la función detiene() de la clase Personaje.

```
$(document).keyup(function(e) {
personaje.detiene();
});
```
*codigo.js lineas 210-2017*

Esta función tenemos un switch que comprueba la ultima posición que anteriormente hemos proporcionado para saber que imagen PNG debe usar y le cambiará la imagen de fondo que corresponda al div personaje. Aunque no se haya incluido en el código a continuación, tambien comprueba como en el anterior si el sexo es chico o chica.

```
detiene(){
    switch(ultimaPosicion)
    {
      case "arriba":
      $('#personaje').css("background-image", "url(images/personaje/chicaArriba.png)");
      break;
}
```
*clase.js lineas 13-58*

# EJERCICIO 2

Para los puntos recinto cerrado y obstáculos abremos creado un div con posicion absoluta que contrendrá todos estos objetos y que, a su vez, tendrá de imagen de fondo la imagen repetida del script del suelo que hemos elegido para ese nivel.

    <div id='interfaz'></div>
*codigo.js lineas 106,123,150,174*

### Recinto cerrado

En el interior del div comentado anteriormente se encontraran las paredes que delimitan la pantalla con una class llamada suelo y el id correspondiente al gráfico que queremos poner, que estará especificado en el style.css. Estos se posicionaran con un style propio para cada objeto que especifica la posición de ese objeto.

```
<!-- PAREDES QUE DELIMITAN LA PANTALLA--> 
<div id='paredHorizontal' class='suelo' style='width: 100%; top: 0px;'></div> 
<div id='paredHorizontal' class='suelo' style='width: 100%; bottom: 0px;'></div> 
<div id='paredVerticalRepeat' class='suelo' style='height: 611px;'></div> 
<div id='paredVerticalRepeat' class='suelo' style='height: 611px; right: 0px;'></div>
```
*codigo.js lineas 106,123,150,174*

### Obstáculos

Para los obstáculos haremos lo mismo, usaremos el id correspondiente al estilo que le hayamos dado a ese id, es decir, a la imagen de fondo que queramos que se vea según que objeto sea y le daremos una class suelo. En la demostración se usa un nuevo estilo width porque el objeto en cuestión tiene la propiedad background-repeat: repeat;

```
<!--Obstaculos--> 
<div id='roca1' class='suelo' style='width: 276px ; top: 90px; left: 50px;'></div> 
<div id='roca1' class='suelo' style='width: 230px ; top: 150px; left: 400px;'></div> 
<div id='roca1' class='suelo' style='width: 184px ; top: 260px; left: 110px;'></div>
```
### Colisiones del personaje con obstáculos

Para controlar las colisiones del personaje con obstaculos volvemos a ver la función mueve(), en este caso seguiremos con la tecla 38 (Arriba) para facilitar la comprensión lectora. La condición que controlará si choca o no con un obstaculo es si no colisiona con este. En este ejemplo veremos que usa un if not colisiona con argumento “terreno”, la función colisiona está definida en la clase Personaje.

```
case 38:
   if (!personaje.colisionaPorArriba("terreno")) 
   {               
      personaje.moverArriba(1);                         
   }
break;
```
*codigo.js lineas 224-432*

En esta función se crea una variable falsa que solo se volverá verdadera si al obtener todos los terrenos (Ahora hablaremos de la función getTerrenos) y comprobar su posición, esta no colisiona con la del personaje más los pixeles de movimiento indicados. Una vez hecha la comprobación devuelve verdadero o falso según corresponda.

```
colisionaPorArriba(tipo) {
    let colisiona = false;
    if (tipo == "terreno") {
        let terrenos = getTerrenos();
        terrenos.forEach(val => {
            if (this.abajo > val.arriba && this.arriba - 5 < val.abajo &&      
            this.derecha > val.izquierda && this.izquierda < val.derecha) {
                colisiona = true;
            }
        });
    }
return colisiona;
}
```
*clases.js lineas 62-240*

Para obtener todos los terrenos el archivo codigo.js tiene una función llamada getTerrenos() que devuelve un array con todos los objetos que tienen la clase suelo.

```
function getTerrenos() {
    let terrenos = [];
    $(".suelo").each((i,val) => {
        let terreno = new Objeto($(val));
        terrenos.push(terreno);
    });
    return terrenos;
}
```
*codigo.js lineas 724-731*

# EJERCICIO 3

### Movimiento aleatorio de mobs

Para el movimiento aleatorio de mobs es necesario primero crear una clase Mounstruo, que nos recogerá los mismos datos que la ya mencionada clase Personaje. Una vez hayamos creado el nivel que corresponde en la funcion container() ya mencionada anterioriormente, se llamará a la función crearMobs() que usara la función getMonstruos() para recoger un array con todos los divs con clase mounstruo que hay en el escenario. No nos vamos a detener mucho en el codigo de las funciones mencionadas puesto que se han mostrado funciones similares anteriormente.

Una vez tenemos el array de mounstruos en pantalla, dependiendo del nivel (en esta demostración de codigo solo se mostrarán los niveles 0 y 1) tendremos una variable que habremos modificado dependiendo del nivel en el que diremos cuántos monstruos hay en ese nivel y 4 variables mounstroX que alojaran esos objetos. De haber solo uno, solo la variable monstruo1 será usada.

```
function crearMobs(){
    let mounstruos = getMonstruos();
    for(let i=0;i<enemigosLVL;i++)
    {
        if(i==0)
        {
            mounstruo1 = mounstruos[i];
        }
        if(i==1)
        {
            mounstruo2 = mounstruos[i];
        }
    }
}  
```
*codigo.js lineas 886-907*

De nuevo en la función container(), después de haber creado los Mobs, se limpiará primero el intervalo countdownMobs y se volverá a llamar con un setInterval que incluirá la función playMobs() con la velocidad que pertenece al nivel. (Lo veremos más adelante)

```
function container()
{
   clearInterval(countdownMobs);
   countdownMobs = setInterval(playMobs, velocidadMobs);
}
```
*codigo.js lineas 201-202*

La función playMobs() llamará a la función movimientoMobs() de tantos mounstruos como haya en el nivel en el que estemos. En este caso solo mostramos el codigo del nivel 0 y 1. Esta función se llamará infinitas veces hasta que volvamos a limpiar el intervalo con clearInterval(countdownMobs)

```
function playMobs(){
    movimientoMobs(mounstruo1);
    if(nivel>=1)
    {
        movimientoMobs(mounstruo2);
    }
}
```
*codigo.js lineas 909-923*

La función movimientoMobs() creara una variable dirección que nos dará un numero entre 1 y 4 (Las distintas direcciones posibles) y llamará a las ya mencionadas funciones colisionaPorX() y moverX() que esta vez se hayan en la clase Mounstruo.

Esta función se hará tantas veces como mounstruos haya en pantalla, como hemos visto anteriormente al hacer la llamada a este método.

En este ejemplo de código, una vez más, solo se muestra una dirección para la facilidad de lectura.

```
function movimientoMobs(mounstruo){
    var direccion = Math.round(Math.random() * 4);
    switch(direccion)
    {
        case 1:
        if(!mounstruo.colisionaPorArriba("objeto"))
        {
            if(!mounstruo.colisionaPorArriba("personaje"))
            {
                mounstruo.moverArriba();
            }
        }
        break;
    }
}
```
*codigo.js lineas 925-966*

### Velocidad de mobs

La velocidad se indicará en la variable velocidadMobs cada vez que se inicie un nivel nuevo.

```
function container()
{
    if(nivel==0)
    {
       velocidadMobs = 1000;
    }
    if(nivel==1)
    {
       velocidadMobs = 800;
    }
    ...
}
```
*codigo.js lineas 69-221*

### Pérdida de vida del personaje

La pérdida de vida de un personaje se hará si el personaje si colisiona con un mounstruo, usando de nuevo la función colisionaPorX() de la clase Personaje. Si hecha esta comprobación, resulta que si colisiona con un mounstruo, el personaje se moverá en dirección tipo 2 (Dirección contraria a la que iba) y la variable vida restará un punto.

Posteriormente, comprobará la vida del personaje para hacer el apartado que viene a continuación.

```
case 38:
     if (!personaje.colisionaPorArriba("mounstruo"))
     {
         personaje.moverArriba(1);
     }
     else
     {
          personaje.moverAbajo(2);
          vida=vida-1;
          comprobarVida();
      }
break;
```

### Vidas

Una vez se ha restado la vida y se ha llamado a la función comprobarVida(), esta usará switch para cambiar la imagen del elemento img que tiene las id’s corazon1, 2, 3 y 4. Cambiando estas imagenes por un corazon lleno o un corazón vacío. En el caso de que la vida sea 0, cambiará la pantalla a GAME OVER.

```
function comprobarVida(){
    switch(vida)
    {
        case 4:
        $('#corazon1').attr("src","images/interfaz/corazonlleno.png");
        $('#corazon2').attr("src","images/interfaz/corazonlleno.png");
        $('#corazon3').attr("src","images/interfaz/corazonlleno.png");
        $('#corazon4').attr("src","images/interfaz/corazonlleno.png");
        break;
        case 3:
        $('#corazon1').attr("src","images/interfaz/corazonlleno.png");
        $('#corazon2').attr("src","images/interfaz/corazonlleno.png");
        $('#corazon3').attr("src","images/interfaz/corazonlleno.png");
        $('#corazon4').attr("src","images/interfaz/corazonvacio.png");
        break;
        case 2:
        $('#corazon1').attr("src","images/interfaz/corazonlleno.png");
        $('#corazon2').attr("src","images/interfaz/corazonlleno.png");
        $('#corazon3').attr("src","images/interfaz/corazonvacio.png");
        $('#corazon4').attr("src","images/interfaz/corazonvacio.png");
        break;
        case 1:
        $('#corazon1').attr("src","images/interfaz/corazonlleno.png");
        $('#corazon2').attr("src","images/interfaz/corazonvacio.png");
        $('#corazon3').attr("src","images/interfaz/corazonvacio.png");
        $('#corazon4').attr("src","images/interfaz/corazonvacio.png");
        break;
        case 0:
        $('#corazon1').attr("src","images/interfaz/corazonvacio.png");
        $('#corazon2').attr("src","images/interfaz/corazonvacio.png");
        $('#corazon3').attr("src","images/interfaz/corazonvacio.png");
        $('#corazon4').attr("src","images/interfaz/corazonvacio.png");
        nivel=-2;
        container();
        break;
    }
}
```
*codigo.js lineas 572-608*

### Puntos

La puntuación se controla con la función sumaPuntuación(tipo) en la que tipo sería el evento que hace que sume puntos. En concreto en nuestro juego hay 3 formas de ganar puntos a lo largo del nivel. Matando monstruos (mob), cumpliendo misiones (mision) y cogiendo las estrellas (estrella).  En cada una de ellas se sumaría la puntuación correspondiente a la que ya tenemos y se mostraría en el div con id puntuacion. Como animación extra, se cambiaría de posición el div con id moneda, que muestra el gif de una monedita, encima de nuestro personaje y cambiaría el display de none a block y con un contador de tiempo de nuevo a none.

```
function sumaPuntuacion(tipo){
    if(tipo == "mob")
    {
        puntuacion+= 25;
        $("#puntuacion").html("PUNTOS: "+puntuacion);
    }
    if(tipo == "mision")
    {
        puntuacion+= 5;
        $("#puntuacion").html("PUNTOS: "+puntuacion);
    }
    if(tipo == "estrella")
    {
        puntuacion+= 100;
        $("#puntuacion").html("PUNTOS: "+puntuacion);
    }
    $("#moneda").css("top",(posicionY-80)+"px");
    $("#moneda").css("left",(posicionX-3)+"px");
    $("#moneda").css("display","block");
    setTimeout(function() {$("#moneda").css("display","none");}, 200);
}
```
*codigo.js lineas 843-863*

# EJERCICIO 4

### Obtención de arma

Para la obtención de arma crearemos una variable boolean al inicio que declararemos como falsa. En nuestro juego solo hay un arma en todo el juego, asi que en cada comienzo de nivel posterior al 0 tendremos que declararla true y cambiar la imagen del div con id espada del que hablaremos más adelante.

    let arma = false;
*codigo.js linea 22*

En el codigo html el arma se consigue en un cofre con id cofreArma y clase arma.

    <div id='cofreArma' class='arma' style='top:80px; left: 225px;'>

De nuevo en la funcion mueve() se comprueba si colisiona con un objeto tipo arma, que hará un getArmas() a los objetos con clase arma. Si colisiona con uno de estos y no tiene ya el arma, es decir, la variable arma es falsa, se llamará a la función ponerArma().

```
case 38:
   if (!personaje.colisionaPorArriba("arma"))
   {
      personaje.moverArriba(1);
   }
   else
   {
      if(!arma)
         ponerArma();
   }
```

Esta función cambiará la variable arma de false a true, cambiará la imagen de fondo del cofre por una de un cofre abierto, añadirá al div de la interfaz con id espada la imagen del arma, y mostrará un mensaje en el div con id mensaje durante un corto periodo de tiempo para avisar al jugador que ha encontrado el arma.

```
function ponerArma()
{
    arma=true;
    $('#cofreArma').css("background-image", "url(images/obstaculos/cofreAbierto.png)");
    $('#espada').attr("src","images/interfaz/espada.png");
    $('#mensaje').css("display", "block");
    $('#mensaje').html("¡Felicidades!<br>Has conseguida la bola mágica,      
                         <br>dispara a tus enemigos usando [SPACE].");
    setTimeout(function() {$('#mensaje').css("display", "none")}, 2000);
}
```
*codigo.js lineas 646-661*

### Disparar

En el caso del disparo, volvemos al codigo en el que se especifica que tecla pulsamos, en este caso sería la 32, el espacio, solo hará algo si ya se ha conseguido el arma y el numero de disparos es 0, para evitar crear más de un disparo a la vez. 

Esto llamará a la función de la clase personaje crearDisparo() con la ultima posición del personaje. Y creará un disparo de la clase disparo con el numero del disparo. 

Una vez la función crearDisparo() explicada más adelante se ejecuta, vuelve a mirar la ultima posición y mientras el disparo no colisione con ningún terreno o enemigo, se mueve con la función mueveX() de la clase disparo hacia la ultima posición hasta que choca con alguno.

```
case 32: 
  if(arma == true && numeroDisparos==0)
  {
      numeroDisparos++;
      personaje.crearDisparo(ultimaPosicion, numeroDisparos);
      disparo = new Disparo($('#disparo'+numeroDisparos));
      let colisionaTerreno = false;
      let colisionaMonstruo = false;
      switch(ultimaPosicion)
      {
         case "arriba":
         while(colisionaTerreno == false && colisionaMonstruo == false)
         {
             if(!disparo.colisionaPorArriba("terreno")) 
             {
                if(!disparo.colisionaPorArriba("mounstruo"))
                    disparo.moverArriba();
                else
                    colisionaTerreno = true;
             }
             else 
             {
                 colisionaMonstruo = true;
             }
             setTimeout(function() {numeroDisparos=0}, 300);
         }
         break;
      }
```

La función crearDisparo() mirará la ultima posición del personaje y situará al lado del personaje un div con id disparoX (Donde x es el numero de disparo)

```
crearDisparo(ultimaPosicion,nro)
{
    switch(ultimaPosicion)
    {
      case "arriba":
        $("#interfaz").append("<div id='disparo"+nro+"' class='disparo' style='top: "
         +this.arriba+"px; left: "+(this.izquierda+8)+"px;'</div>");
      break;
    }

}
```
*clases.js lineas 346-364*

La función mueveX() de la clase disparo es igual que la de personaje, solo que el movimiento es más grande que el del personaje con una diferencia de 5px.

```
class Disparo { 
    constructor(capa) {
        this.capa = capa;
        this.izquierda = capa.offset().left;
        this.arriba = capa.offset().top;
        this.altura = capa.outerHeight(true);
        this.anchura = capa.outerWidth(true);
        this.derecha = this.izquierda + this.anchura;
        this.abajo = this.arriba + this.altura;     }
    //MOVIMIENTO DEL DISPARO
    moverArriba() {
        this.capa.animate({ top: this.arriba -= 10 }, { duration: 300, queue: false });
        this.actualizaCoordenadas();     }
       actualizaCoordenadas(movimiento) {
        this.derecha = this.izquierda + this.anchura;
        this.abajo = this.arriba + this.altura;     }
```
*clases.js lineas 590-621*

### Matar mobs

Si la función colisionaX() de la clase disparo devuelve true, colisiona con un mounstruo y la variable colisionaMonstruo se pone a true, suma la puntuación por matarlo, se ejecuta un setTimeout que borra el div disparo creado en un tiempo y resta uno a la cantidad de monstruos del nivel.

```
colisionaMonstruo = true;
sumaPuntuacion("mob");
setTimeout(function() {$("#disparo"+numeroDisparos).remove();}, 300);
enemigosLVL--;
```
*codigo.js lineas 437-568*

En la función colisionaX() de la clase disparo, que es practicamente igual que la de personaje, devolvería true si colisiona y hace un setTimeout que elimina la capa del monstruo con el que colisiona tras un tiempo.

```
if (tipo == "mounstruo") {
     let mounstruos = getMonstruos();
     mounstruos.forEach(val => {
        if (this.abajo > val.arriba && this.arriba - 10 < val.abajo && this.derecha > 
         val.izquierda && this.izquierda < val.derecha) {
            colisiona = true;
            setTimeout(function() {val.capa.remove();}, 300);
         }  });  }
```
*clases.js lineas 624-707*

### Disparar a un obstáculo

Es exactamente igual a la anterior, solo que si colisiona con un terreno lo que se volvería true sería la variable colisionaTerreno y el disparo desaparecía en el tiempo estipulado.

```
colisionaTerreno = true;
setTimeout(function() {$("#disparo"+numeroDisparos).remove();}, 300);
```
*codigo.js lineas 437-568*

# EJERCICIO 5

### Llaves

Cuando un personaje colisiona con un objeto cofreLlave y aún no se ha conseguido la llave, es decir, la variable llave aún es false, entra en la función consigueLlave() que pone la variable llave a true, y dependiendo de la posición del personaje, detecta si el cofre miraba abajo o a la derecha, y cambia su imagen a uno abierto. Se volvería visible la imagen de la llave en la interfaz y se mostraría un mensaje informando al usuario de que ha conseguido la llave durante un periodo de tiempo.

```
function consigueLlave(){
  llave=true;
  if(ultimaPosicion=="arriba")
  {
    $('#cofreLlave').css("background-image", "url(images/obstaculos/cofreLlaveAbierto.png)");
  }
  if(ultimaPosicion=="izquierda")
  {
     $('#cofreLlave').css("background-image", "url(images/obstaculos/cofreLlaveAbiertoDerecha.png)");
  }
  $('#llave').attr("src","images/interfaz/llave.png");
  $('#mensaje').css("display", "block");
  $('#mensaje').html("¡Felicidades!<br>Has conseguida la llave de esta habitación.");
  setTimeout(function() {$('#mensaje').css("display", "none")}, 2000);
}
```
### Puertas y Nuevo nivel

Cuando se ha conseguido la llave, desde la clase personaje la variable exit se ha puesto en true, por lo tanto si ya se tiene la llave y se colisionaX() con la puertaEspecial, se sumara 150 a la puntuación, se sumará 1 a un nivel y se reiniciará la pantalla llamando a la función container() con el nuevo nivel adquirido.

```   
if(exit)
   {
      puntuacion+=150;
      nivel++;
      container();
   }
```
### Tiempo de juego

Cuando la página se carga y los niveles son jugables, es decir, son 0, 1, 2 o 3, se limpia el posible intervalo existente y se ejecuta otro que llama a la función secondPassed()

```
clearInterval(countdownTimer);
countdownTimer = setInterval(secondPassed, 1000);
```
*codigo.js lineas 199-200*

La función secondPassed() calcula el numero de minutos, los segundos que se dice exactamente cuantos son en cada nivel en la variable seconds y muestra el tiempo restante de nivel. Una vez los segundos llegan a cero, se limpiará el intervalo, se quitará una vida y se iniciará el nivel con la puntuación que se tenía al empezar el nivel.

```
function secondPassed() {

  var minutes = Math.round((seconds - 30)/60); //calcula el número de minutos
  var remainingSeconds = seconds % 60; //calcula los segundos
  //si los segundos usan sólo un dígito, añadimos un cero a la izq
  if (remainingSeconds < 10) { 
      remainingSeconds = "0" + remainingSeconds; 
  } 
  $("#tiempo").html("Tiempo restante: "+minutes+":"+remainingSeconds); 
  if (seconds == 0) { 
      clearInterval(countdownTimer);   
      vida--;
      comprobarVida(vida);
      puntuacion = puntuacionAlEmpezarNVL;
      container();

  } 
  else { 
      seconds--; 
  } 
  } 
```
*codigo.js lineas 866-885*

# EJERCICIO 6

### Función JQueryUI - Efecto rebote

Esta función de JQuery hace un efecto bounce (movimiento rebote) sobre el corazón de vida afectado tras perder una vida.

    $( "#corazon4" ).effect( "bounce", "", 500, "" );
*codigo.js lineas 581-622 *

### Función JQueryUI - Dialog

Esta función se ejecuta si la puntuación conseguida es la máxima por conseguir, dando la enhorabuena con un dialog que se puede cerrar al usuario por haber llegado a la puntuación máxima.

```
if(puntuacion==1115)
        {
            $( "#dialog" ).css("display", "block");
            $( function() {$( "#dialog" ).dialog();});
        }
```
*codigo.js lineas 54-76*

### Función JQueryUI - Selectable

Esta función cambia el color de fondo y el borde del personaje inicial seleccionado, añadiendole la clase .seleccionado y teniendola en cuenta posteriormente para el script del personaje.

```
$(document).ready(function() {
    container();  
    $("#chico").click(function(){
        $("#chico").addClass("seleccionado");
        $("#chica").removeClass("seleccionado");
    }); 
    $("#chica").click(function(){
        $("#chica").addClass("seleccionado");
        $("#chico").removeClass("seleccionado");
    });
    $("#botonEleccion").click(function(){iniciar();});
    function iniciar(){
        if($(".seleccionado").attr("id")=="chico")
            sexo=0;
        else
            sexo=1;
        nivel=0;
        container();        
    }
});
```
*codigo.js lineas 54-76*

# Estimación de horas de trabajo empleadas
Unas 120 horas

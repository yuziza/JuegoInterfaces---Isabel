"user strict";
let personaje;
let mounstruo1;
let mounstruo2;
let mounstruo3;
let mounstruo4;
let sexo;
let suelo;
let disparo;
let vida = 4;
let numeroDisparos=0;
let nivel=1;
let key=false;

//POSICIONES
let ultimaPosicion = "";
let posicionX=550;
let posicionY=250;

//EVENTOS
let puntuacion=0;
let arma = false;
let llave = false;
let llaveAlEmpezarNVL;
let exit = false;
let puntuacionAlEmpezarNVL;
let enemigosLVL=0;

//CONTADOR DEL TIEMPO
let seconds = 3600; //número de segundos a contar
let countdownTimer;
let countdownMobs;

//MISIONES
//LVL 0
let misionArriba = false;
let misionAbajo = false;
let misionDerecha = false;
let misionIzquierda = false;
let misionDisparo = false;
//LVL 1
palancaPulsada=false;
//LVL 2
//LVL 3
//LVL 4
//LVL 5
//TODOS LVL
let misionArma=false;
let misionLlave=false;
let misionSalir=false;

$(document).ready(function() {

    container();
    $("#botonEleccion").click(function(){iniciar()});

    function iniciar(){
        if(document.getElementById("chico").checked)
            sexo=0;
        else
            sexo=1;
        nivel=0;
        container();        
    }
});

function container()
{
    if(nivel==-1)
    {
        $(document).prop('title', 'PRACTICA-5');
        $("#container").html("<center><h1>BIENVENIDO A PRÁCTICA-5</h1><h2>ESTE JUEGO HA SIDO CREADO POR ISABEL FERNÁNDEZ</h2><h3>ELIGE TU PERSONAJE</h3><form id='frmElegido'><table><tr><td><img src='images/personaje/chicaAbajo.gif'></td><td><img src='images/personaje/chicaAbajo.gif'></td></tr><tr><td><input type='radio' name='elegido' id='chico' value='CHICO' checked></td><td><input type='radio' name='elegido' id='chica' value='CHICA'></td></tr></table><br><br><input class='botonInsertCoin' type='button' id='botonEleccion' value='INSERT COIN'></form></center>");
    }
    if(nivel==0)
    {
        enemigosLVL=1;
        seconds = 180;
        puntuacionAlEmpezarNVL = 0;
        arma = false;
        llave = false;
        $(document).prop('title', 'NIVEL 0');
        $("#container").html("<div id='vidas'> <img id='corazon1'> <img id='corazon2'> <img id='corazon3'> <img id='corazon4'> <img id='espada'> <img id='llave'> </div> <div id='nivel'>NIVEL</div> <div id='puntuacion'>PUNTOS: 0</div> <div id='misiones'> <center><h3>MISIONES</h3></center> <ul> <li id='misionArriba'>Muevete hacia arriba con la tecla ARRIBA</li> <li id='misionAbajo'>Muevete hacia abajo con la tecla ABAJO</li> <li id='misionIzq'>Muevete hacia la izquierda con la tecla IZQUIERDA</li> <li id='misionDer'>Muevete hacia la derecha con la tecla DERECHA</li> <li id='misionArma'>Encuentra el arma de hielo</li> <li id='misionDisparo'>Dispara una bola de hielo a un enemigo con la tecla ESPACIO</li> <li id='misionLlave'>Encuentra la llave</li></ul> </div> <div id='interfaz'> <!-- PAREDES QUE DELIMITAN LA PANTALLA--> <div id='paredHorizontal' class='suelo' style='width: 100%;'></div> <div id='paredHorizontal' class='suelo' style='width: 100%; bottom: 0em;'></div> <div id='paredVerticalRepeat' class='suelo' style='height: 611px;'></div> <div id='paredVerticalRepeat' class='suelo' style='height: 611px; right: 0px;'></div> <!--PAREDES EXTRA--> <div id='paredVerticalRepeat' class='suelo' style='height: 200px; top:30px; left: 649px; z-index: 9;'></div> <div id='paredHorizontal' class='suelo' style='width: 250px; top:200px; left: 580px;'></div> <div id='paredVerticalRepeat' class='suelo' style='height: 200px; top:30px; left: 349px; z-index: 9;'></div> <div id='paredHorizontal' class='suelo' style='width: 100px; top:200px; left: 37px; z-index: 9'></div> <div id='paredHorizontal' class='suelo' style='width: 185px; top:200px; left: 271px;'></div> <!--OBJETOS OBSTACULOS--> <!--CELDA DERECHA--> <div id='puertaCarcel' class='suelo' style='top:200px; left: 828px; z-index: 9;'></div> <div id='paredHorizontal' class='suelo' style='width: 250px; top:200px; left: 580px;'></div> <div id='literaHorizontal' class='suelo' style='top:30px; left: 690px;'></div> <div id='barrilRoto' class='suelo' style='top:80px; left: 800px;'></div> <div id='literaHorizontal' class='suelo' style='top:30px; left: 863px;'></div> <div id='cerdito' class='suelo' style='top:220px; left: 867px;'></div> <!--CELDA EN MEDIO--> <div id='puertaEspecialNVL0' class='suelo' style='top:200px; left: 450px;'></div> <!--CELDA IZQUIERDA--> <div id='puertaCarcel' class='suelo' style='top:200px; left: 80px;'></div> <div id='barril' class='suelo' style='top:80px; left: 300px;'></div> <div id='barril' class='suelo' style='top:80px; left: 260px;'></div> <div id='barril' class='suelo' style='top:80px; left: 175px;'></div> <div id='barril' class='suelo' style='top:80px; left: 135px;'></div> <div id='bolaCadena' style='top:80px; left: 45px;'></div> <!--ESPACIO GRANDE--> <div id='sillaMesa' class='suelo' style='width: 288px; top:400px; left: 500px;'></div> <div id='sacos' class='suelo' style='height: 360px; top:250px; left: 36px; z-index: 10'></div> <div id='sacos' class='suelo' style='top:250px; left: 83px; z-index: 10'></div> <div id='sacos' class='suelo' style='top:250px; left: 130px; z-index: 10'></div> <div id='sacos' class='suelo' style='height: 188px; top:300px; left: 160px; z-index: 10'></div> <div id='mounstruoMuerte' class='mounstruo' style='top:400px; left: 85px;'></div> <!--SALIDA--> <div id='puertaNV0' class='exit' style='top:0px; left: 500px;'></div> <!--COFRES--> <div id='cofreArma' class='arma' style='top:80px; left: 225px;'></div> <div id='cofreLlave' class='llave' style='top:350px; left: 110px;'></div> </div> <div id='personaje' style='top:250px; left: 550px;'></div> <div id='muletas'> <img id='botonArriba' src='images/interfaz/flechaArriba.png'><img id='botonAbajo' src='images/interfaz/flechaAbajo.png'><img id='botonDerecha' src='images/interfaz/flechaDerecha.png'><img id='botonIzquierda' src='images/interfaz/flechaIzquierda.png'><img id='botonSpace' src='images/interfaz/space.png'> </div> <div id='tiempo'> </div> <div id='mensaje'></div> <div id='moneda'></div>");
        $("#personaje").css("top", "250px");
        $("#personaje").css("left", "550px"); 
    }
    if(nivel==1)
    {
        enemigosLVL=2;
        seconds = 180;
        puntuacionAlEmpezarNVL = puntuacion;
        misionDisparo = false;
        misionLlave = false;
        arma=true;
        llave = false;
        exit = false;
        $('#espada').attr("src","images/interfaz/espada.png");
        $(document).prop('title', 'NIVEL 1');
        $("#container").html("<div id='vidas'> <img id='corazon1'> <img id='corazon2'> <img id='corazon3'> <img id='corazon4'> <img id='espada'> <img id='llave'> </div> <div id='nivel'>NIVEL</div> <div id='puntuacion'>PUNTOS: 0</div> <div id='misiones'> <center><h3>MISIONES</h3></center> <ul> <li id='misionDisparo'>Mata a todos los enemigos</li> <li id='misionLlave'>Encuentra la llave</li> <li id='misionEstrella'>Encuentra la estrella dorada</li> </ul> </div> <div id='interfaz'> <!-- PAREDES QUE DELIMITAN LA PANTALLA--> <div id='paredHorizontal' class='suelo' style='width: 100%;'></div> <div id='paredHorizontal' class='suelo' style='width: 100%; bottom: 0em;'></div> <div id='paredVerticalRepeat' class='suelo' style='height: 611px;'></div> <div id='paredVerticalRepeat' class='suelo' style='height: 611px; right: 0px;'></div> <!--ESTRELLA--> <div id='agua' style='width: 600px; height: 300px; top: 200px; left:47px;'></div> <div id='trozotierra' style='top: 270px; left: 100px; width: 200px; height: 150px;'></div> <div id='palanca' class='palanca' style='right: 60px; top:100px;'></div> <div id='estrella' class='estrella' style='left: 180px; top:320px;'></div> <!---TIPO SUELO EN AGUA--> <div id='muroInvisible' class='suelo' style='width: 600px; height: 65px; top: 200px; left: 47px;'></div> <div id='muroInvisible' class='suelo' style='width: 600px; height: 70px; top: 425px; left: 47px;'></div> <div id='muroInvisible' class='suelo' style='width: 50px; height: 170px; top: 260px; left: 47px;'></div> <div id='muroInvisible' class='suelo' style='width: 346px; height: 50px; top: 260px; left: 300px;'></div> <div id='muroInvisible' class='suelo' style='width: 346px; height: 50px; top: 380px; left: 300px;'></div> <div id='puente' class='suelo' style='width: 346px; top: 310px; left: 300px;'></div> <!--SALIDA--> <div id='puertaNV0' class='exit' style='top:0px; left: 500px;'></div> <!--COFRES--> <div id='cofreLlave' class='llave' style='top:540px; left: 110px;'></div>  <!--Obstaculos--> <div id='roca1' class='suelo' style='width: 276px ; top: 90px; left: 50px;'></div> <div id='roca1' class='suelo' style='width: 230px ; top: 150px; left: 400px;'></div> <div id='roca1' class='suelo' style='width: 184px ; top: 260px; left: 110px;'></div> <div id='roca1' class='suelo' style='width: 46px ; top: 315px; left: 110px;'></div> <div id='roca1' class='suelo' style='width: 184px ; top: 370px; left: 110px;'></div> <div id='roca1' class='suelo' style='height: 264px ; top: 100px; right: 100px;'></div> <div id='roca1' class='suelo' style='height: 220px ; top: 100px; right: 150px;'></div> <div id='roca1' class='suelo' style='height: 176px ; top: 100px; right: 200px;'></div> <div id='roca1' class='suelo' style='bottom: 80px; height: 138px; left: 50px;'></div> <div id='roca1' class='suelo' style='height: 30px; bottom: 88px; left: 110px;'></div> <div id='roca1' class='suelo' style='bottom: 170px; left: 110px;'></div> <!--CORAZONES--> <div id='corazon' class='corazon' style='top:145px; left: 60px;'></div> </div> <div id='personaje'></div> <!--MOUNSTRUOS--> <div id='mounstruoMarino' class='mounstruo' style='top:635px; left: 700px;'></div> <div id='mounstruoMarino' class='mounstruo' style='top:550px; right: 550px;'></div><div id='muletas'> <img id='botonArriba' src='images/interfaz/flechaArriba.png'><img id='botonAbajo' src='images/interfaz/flechaAbajo.png'><img id='botonDerecha' src='images/interfaz/flechaDerecha.png'><img id='botonIzquierda' src='images/interfaz/flechaIzquierda.png'><img id='botonSpace' src='images/interfaz/space.png'> </div> <div id='tiempo'> </div> <div id='mensaje'></div> <div id='moneda'></div>");
        $("#interfaz").css("background-image", "url(images/terrenos/sueloLVL1.png)");
        $("div#paredHorizontal").css("background-image", "url(images/pared/paredHorizontalLVL1.png)");
        $("div#paredVerticalRepeat").css("background-image","url(images/pared/paredVerticalLVL1.png)");
        $("div#paredVerticalRepeat").css("width","48px");
        $("#puertaNV0").removeClass("exit");
        $("#personaje").css("top", "210px");
        $("#personaje").css("left", "980px");
        $("#cofreLlave").css("background-image", "url(images/obstaculos/cofreLlaveCerradoDerecha.png)");
        $("#cofreLlave").css("width","29px");
        $("#misionDisparo").css("color","white");     
    }

    if(nivel!=-1)
    {
        personaje = new Personaje($('#personaje')); 
        clearInterval(countdownTimer);
        countdownTimer = setInterval(secondPassed, 1000);
        countdownMobs = setInterval(playMobs, 1000);
        $("#puntuacion").html("PUNTOS: "+puntuacion);
        $("#nivel").html("NIVEL "+nivel);
        comprobarVida();
        crearMobs();

        if(key!=true)
        {
            $(document).keydown(function(e) {
                t = e.which;
                mueve(t);
        });
            $(document).keyup(function(e) {
                personaje.detiene();
                $("#botonSpace").attr("src","images/interfaz/space.png");
                $("#botonArriba").attr("src","images/interfaz/flechaArriba.png");
                $("#botonDerecha").attr("src","images/interfaz/flechaDerecha.png");
                $("#botonAbajo").attr("src","images/interfaz/flechaAbajo.png");
                $("#botonIzquierda").attr("src","images/interfaz/flechaIzquierda.png");
            });
            key=true;
        }
    }
}

//FUNCION QUE MUEVE AL PERSONAJE Y DISPARA EL PROYECTIL
function mueve(t) {

    switch(t)
    {
        /*=============================================================================*/
        /*============================ MOVER IZQUIERDA ================================*/
        /*=============================================================================*/
        case 37: 
        $("#botonIzquierda").attr("src","images/interfaz/flechaIzquierdaUsando.png");
        
        if(!misionIzquierda)
        {
            misionIzquierda=true;
            $("#misionIzq").css("color","#4f9");
            sumaPuntuacion("mision");
        }

        if (!personaje.colisionaPorIzquierda("terreno")) 
        {
            if (!personaje.colisionaPorIzquierda("mounstruo"))
            {
                if (!personaje.colisionaPorIzquierda("estrella"))
                {
                    if (!personaje.colisionaPorIzquierda("llave"))
                    { 
                        {
                            if (personaje.colisionaPorIzquierda("corazon"))
                            {
                                if(vida<4)
                                {
                                    vida=vida+1;
                                    comprobarVida();
                                }
                            }
                            personaje.moverIzquierda(1);
                        }
                    }
                    else
                    {
                        if(!llave)
                            consigueLlave();
                    }
                }
                else
                {
                    consigueEstrella();
                }
            }  
            else
            {
                personaje.moverDerecha(2);
                vida=vida-1;
                comprobarVida();
            }
        }          
        ultimaPosicion = "izquierda";
        posicionX = personaje.izquierda;
        posicionY = personaje.abajo;
        break;

        /*=============================================================================*/
        /*=============================== MOVER DERECHA ===============================*/
        /*=============================================================================*/
        case 39:

        if(!misionDerecha)
        {
            misionDerecha=true;
            $("#misionDer").css("color","#4f9");
            sumaPuntuacion("mision");
        }

        $("#botonDerecha").attr("src","images/interfaz/flechaDerechaUsando.png");
        if (!personaje.colisionaPorDerecha("terreno")) 
        {
            if (!personaje.colisionaPorDerecha("mounstruo"))
            {
                if (personaje.colisionaPorDerecha("corazon"))
                {
                    if(vida<4)
                    {
                        vida=vida+1;
                        comprobarVida();
                    }
                }
                personaje.moverDerecha(1);
            }
            else
            {
                vida=vida-1;
                comprobarVida();
                personaje.moverIzquierda(2);
            }
        }
        ultimaPosicion = "derecha";
        posicionX = personaje.izquierda;
        posicionY = personaje.abajo;
        break;

        /*=============================================================================*/
        /*=============================== MOVER ARRIBA ================================*/
        /*=============================================================================*/
        case 38:

        if(!misionArriba)
        {
            misionArriba=true;
            $("#misionArriba").css("color","#4f9");
            sumaPuntuacion("mision");
        }

        $("#botonArriba").attr("src","images/interfaz/flechaArribaUsando.png");
        if (!personaje.colisionaPorArriba("puertaEspecial"))
        {
            if (!personaje.colisionaPorArriba("terreno")) 
            {
                if (!personaje.colisionaPorArriba("arma"))
                {
                    if (!personaje.colisionaPorArriba("llave"))
                    { 
                        if (!personaje.colisionaPorArriba("palanca"))
                        {
                            if (!personaje.colisionaPorArriba("mounstruo"))
                            {
                                if (personaje.colisionaPorArriba("corazon"))
                                {
                                    if(vida<4)
                                    {
                                        vida=vida+1;
                                        comprobarVida();
                                    }
                                }
                                personaje.moverArriba(1);
                            }
                            else
                            {
                                personaje.moverAbajo(2);
                                vida=vida-1;
                                comprobarVida();
                            }
                        }
                        else
                            moverPalanca();
                    }
                    else
                    {
                        if(!llave)
                            consigueLlave();
                    }
                }
                else
                {
                    if(!arma)
                        ponerArma();
                }
            }
        }
        else
        {
            if(exit)
            {
                puntuacion+=150;
                nivel++;
                container();
            }
        }
        ultimaPosicion = "arriba";
        posicionX = personaje.izquierda;
        posicionY = personaje.abajo;
        break;

        /*=============================================================================*/
        /*=============================== MOVER ABAJO =================================*/
        /*=============================================================================*/
        case 40:

        if(!misionAbajo)
        {
            misionAbajo=true;
            $("#misionAbajo").css("color","#4f9");
            sumaPuntuacion("mision");
        }

        $("#botonAbajo").attr("src","images/interfaz/flechaAbajoUsando.png");
        if (!personaje.colisionaPorAbajo("terreno")) 
        {
            if (!personaje.colisionaPorAbajo("mounstruo"))
            {
                if (personaje.colisionaPorAbajo("corazon"))
                {
                    if(vida<4)
                    {
                        vida=vida+1;
                        comprobarVida();
                    }
                }
                personaje.moverAbajo(1);
            }
            else
            {
                personaje.moverArriba(2);
                vida=vida-1;
                comprobarVida();
            }
        }
        ultimaPosicion = "abajo";
        posicionX = personaje.izquierda;
        posicionY = personaje.abajo;
        break;

        /*=============================================================================*/
        /*================================== PROYECTIL ================================*/
        /*=============================================================================*/
        case 32: 
        $("#botonSpace").attr("src","images/interfaz/spaceUsando.png");
        if(arma == true && numeroDisparos==0)
        {
            numeroDisparos++;
            personaje.crearDisparo(ultimaPosicion, numeroDisparos);
            disparo = new Disparo($('#disparo'+numeroDisparos));
            let colisionaTerreno = false;
            let colisionaMonstruo = false;

            switch(ultimaPosicion)
            {
                case "derecha":
                while(colisionaTerreno == false && colisionaMonstruo == false)
                {
                    if(!disparo.colisionaPorDerecha("terreno"))
                    {
                        if(!disparo.colisionaPorDerecha("mounstruo"))
                            disparo.moverDerecha();
                        else
                        {
                            colisionaMonstruo = true;
                            puntuacion+= 25;
                            $("#puntuacion").html("PUNTOS: "+puntuacion);
                            setTimeout(function() {$("#disparo"+numeroDisparos).remove();}, 300);
                            enemigosLVL--;
                            if(enemigosLVL==0)
                            {
                                actualizaMisionMobs();
                            }
                        }

                    }
                    else
                    {
                        colisionaTerreno = true;
                        setTimeout(function() {$("#disparo"+numeroDisparos).remove();}, 300);                          
                    }
                }
                setTimeout(function() {numeroDisparos=0}, 300);
                break;
                case "izquierda":
                while(colisionaTerreno == false && colisionaMonstruo == false)
                {
                    if(!disparo.colisionaPorIzquierda("terreno"))
                    {
                        if(!disparo.colisionaPorIzquierda("mounstruo"))
                            disparo.moverIzquierda();
                        else
                        {
                            colisionaMonstruo = true;
                            puntuacion+= 25;
                            $("#puntuacion").html("PUNTOS: "+puntuacion);
                            setTimeout(function() {$("#disparo"+numeroDisparos).remove();}, 300);
                            enemigosLVL--;
                            if(enemigosLVL==0)
                            {
                                actualizaMisionMobs();
                            }
                        }

                    }
                    else
                    {
                        colisionaTerreno = true;
                        setTimeout(function() {$("#disparo"+numeroDisparos).remove();}, 300);                            
                    }
                }
                setTimeout(function() {numeroDisparos=0}, 300);
                break;
                case "abajo":
                while(colisionaTerreno == false && colisionaMonstruo == false)
                {
                    if(!disparo.colisionaPorAbajo("terreno"))
                    {
                        if(!disparo.colisionaPorAbajo("mounstruo"))
                            disparo.moverAbajo();
                        else
                        {
                            colisionaMonstruo = true;
                            puntuacion+= 25;
                            $("#puntuacion").html("PUNTOS: "+puntuacion);
                            setTimeout(function() {$("#disparo"+numeroDisparos).remove();}, 300);
                            enemigosLVL--;
                            if(enemigosLVL==0)
                            {
                                actualizaMisionMobs();
                            }
                        }

                    }
                    else
                    {
                        colisionaTerreno = true;
                        setTimeout(function() {$("#disparo"+numeroDisparos).remove();}, 300);                            
                    }
                }
                setTimeout(function() {numeroDisparos=0}, 300);
                break;
                case "arriba":
                while(colisionaTerreno == false && colisionaMonstruo == false)
                {
                    if(!disparo.colisionaPorArriba("terreno"))
                    {
                        if(!disparo.colisionaPorArriba("mounstruo"))
                            disparo.moverArriba();
                        else
                        {
                            colisionaMonstruo = true;
                            sumaPuntuacion("mob");
                            setTimeout(function() {$("#disparo"+numeroDisparos).remove();}, 300);
                            enemigosLVL--;
                            if(enemigosLVL==0)
                            {
                                actualizaMisionMobs();
                            }
                        }

                    }
                    else
                    {
                        colisionaTerreno = true;
                        setTimeout(function() {$("#disparo"+numeroDisparos).remove();}, 300);                            
                    }
                }
                setTimeout(function() {numeroDisparos=0}, 300);
                break;
            }
        }
        break;
    }
}


//FUNCION QUE COMPRUEBA CUANTA VIDA TIENE Y CAMBIA LOS CORAZONES ACORDE A ESTA
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
        alert("GAME OVER");
        location.reload();
        break;
    }
}

//ACTUALIZA MISION MOUNSTROUS
function actualizaMisionMobs(){
    if(!misionDisparo)
    {
        misionDisparo=true;
        $("#misionDisparo").css("color","#4f9");
        sumaPuntuacion("mision");
    }
}
//NOS PULSA LA PALANCA
function moverPalanca(){
    if(palancaPulsada==false)
    {
        palancaPulsada = true;
        $("#palanca").css("background-image", "url(images/obstaculos/NIVEL1/palancaVerde.png)");
        $("#puente").css("background-image", "url(images/terrenos/puente.png)");
        $("#puente").removeClass("suelo");
    }
    else
    {
        $("#palanca").css("background-image", "url(images/obstaculos/NIVEL1/palancaRoja.png)");
        $("#puente").css("background-image", "");
        $("#puente").addClass("suelo");
        palancaPulsada=false;
    }    
}

//CONSIGUE LA ESTRELLA
function consigueEstrella(){
    $('#mensaje').css("display", "block");
    $('#mensaje').html("SUMAS 100 PUNTOS POR<br>ENCONTRAR LA ESTRELLA");
    $("#misionEstrella").css("color","#4f9");
    setTimeout(function() {$('#mensaje').css("display", "none")}, 2000);
    sumaPuntuacion("estrella");

}

//NOS VUELVE EL ARMA A TRUE  Y NOS PERMITE DISPARAR
function ponerArma(){

    if(!misionArma)
    {
        misionArma=true;
        $("#misionArma").css("color","#4f9");
        sumaPuntuacion("mision");
    }

    arma=true;
    $('#cofreArma').css("background-image", "url(images/obstaculos/cofreAbierto.png)");
    $('#espada').attr("src","images/interfaz/espada.png");
    $('#mensaje').css("display", "block");
    $('#mensaje').html("¡Felicidades!<br>Has conseguida la bola mágica, <br>dispara a tus enemigos usando [SPACE].");
    setTimeout(function() {$('#mensaje').css("display", "none")}, 2000);
}

//NOS VUELVE LA LLAVE A TRUE Y NOS PERMITE ABRIR LA PUERTA
function consigueLlave(){

    if(!misionLlave)
    {
        misionLlave=true;
        $("#misionLlave").css("color","#4f9");
        sumaPuntuacion("mision");
    }

    llave=true;
    if(ultimaPosicion=="arriba")
        {$('#cofreLlave').css("background-image", "url(images/obstaculos/cofreLlaveAbierto.png)");}
    if(ultimaPosicion=="izquierda")
        {$('#cofreLlave').css("background-image", "url(images/obstaculos/cofreLlaveAbiertoDerecha.png)");}
    $('#llave').attr("src","images/interfaz/llave.png");
    $('#mensaje').css("display", "block");
    $('#mensaje').html("¡Felicidades!<br>Has conseguida la llave de esta habitación.");
    setTimeout(function() {$('#mensaje').css("display", "none")}, 2000);
}


//NOS DEVUELVE UN ARRAY DE TODOS LOS OBJETOS
function getObjetos() {
    let objetos = [];
    $(".suelo").each((i,val) => {
        let objeto = new Objeto($(val));
        objetos.push(objeto);
    });
    $("#palanca").each((i,val) => {
        let objeto = new Objeto($(val));
        objetos.push(objeto);
    });
    $("#estrella").each((i,val) => {
        let objeto = new Objeto($(val));
        objetos.push(objeto);
    });
    $(".arma").each((i,val) => {
        let objeto = new Objeto($(val));
        objetos.push(objeto);
    });
    $(".corazon").each((i,val) => {
        let objeto = new Objeto($(val));
        objetos.push(objeto);
    });
    $(".llave").each((i,val) => {
        let objeto = new Objeto($(val));
        objetos.push(objeto);
    });
    $("#puertaEspecialNVL0").each((i,val) => {
        let objeto = new Objeto($(val));
        objetos.push(objeto);
    });
    $("#puertaNV0").each((i,val) => {
        let objeto = new Objeto($(val));
        objetos.push(objeto);
    });
    return objetos;
}

//NOS DEVUELVE UN ARRAY DE TODAS LAS PAREDES Y OBSTACULOS FIJOS EN PANTALLA
function getTerrenos() {
    let terrenos = [];
    $(".suelo").each((i,val) => {
        let terreno = new Objeto($(val));
        terrenos.push(terreno);
    });
    return terrenos;
}

//NOS DEVUELVE UN ARRAY DE TODAS LAS PALANCAS
function getPalancas() {
    let palancas = [];
    $("#palanca").each((i,val) => {
        let palanca = new Objeto($(val));
        palancas.push(palanca);
    });
    return palancas;
}

//NOS DEVUELVE UN ARRAY DE TODAS LAS ESTRELLAS
function getEstrellas() {
    let estrellas = [];
    $("#estrella").each((i,val) => {
        let estrella = new Objeto($(val));
        estrellas.push(estrella);
    });
    return estrellas;
}

//NOS DEVUELVE UN ARRAY DE TODAS LAS ARMAS EN PANTALLA
function getArmas(){
    let armas = [];
    $(".arma").each((i,val) => {
        let arma = new Objeto($(val));
        armas.push(arma);
    });
    return armas;
}

//NOS DEVUELVE UN ARRAY DE TODOS LOS CORAZONES EN PANTALLA
function getCorazones(){
    let corazones = [];
    $(".corazon").each((i,val) => {
        let corazon = new Objeto($(val));
        corazones.push(corazon);
    });
    return corazones;
}

//NOS DEVUELVE UN ARRAY DE TODAS LAS LLAVES EN PANTALLA
function getLlaves(){
    let llaves = [];
    $(".llave").each((i,val) => {
        let llave = new Objeto($(val));
        llaves.push(llave);
    });
    return llaves;
}

//NOS DEVUELVE UN ARRAY DE TODAS LAS PUERTAS EN PANTALLA
function getPuertas(){
    let puertas = [];
    $("#puertaEspecialNVL0").each((i,val) => {
        let puerta = new Objeto($(val));
        puertas.push(puerta);
    });
    $("#puertaNV0").each((i,val) => {
        let puerta = new Objeto($(val));
        puertas.push(puerta);
    });
    return puertas;
}

//NOS DEVUELVE UN ARRAY DE TODOS LOS MONSTRUOS EN PANTALLA
function getMonstruos(){
    let mounstruos = [];
    $(".mounstruo").each((i,val) => {
        let vida=1;
        if(nivel==3||nivel==4)
            vida =2;
        if(nivel==5)
            vida=5;

        let mounstruo = new Mounstruo($(val),vida);
        mounstruos.push(mounstruo);
    });
    return mounstruos;
}

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

} else { 
    seconds--; 
} 
} 

function crearMobs(){
        console.log("ENTRA EN CREAR MOBS");
        let mounstruos = getMonstruos();
        console.log("ENEMIGOS"+enemigosLVL);
        console.log(mounstruos);
        for(let i=0;i<enemigosLVL;i++)
        {
            if(i==0)
            {
                console.log("CREA MOB 1 :"+JSON.stringify(mounstruos[i]));
                mounstruo1 = mounstruos[i];
                console.log("MOUNSTRUO 1 :"+mounstruo1);
            }
            if(i==1)
            {
                console.log("CREA MOB 2 :"+JSON.stringify(mounstruos[i]));
                mounstruo2 = mounstruos[i];
                console.log("MOUNSTRUO 2 :"+mounstruo2);
            }
        }
    }  

function playMobs(){
            movimientoMobs(mounstruo1);
            if(nivel==1)
            {
            movimientoMobs(mounstruo2);
            }
}

function movimientoMobs(mounstruo){
    var direccion = Math.round(Math.random() * (4 - 1) + 1);
    switch(direccion)
    {
        case 1:
        console.log("colisionaPorArriba:"+mounstruo.colisionaPorArriba());
        if(!mounstruo.colisionaPorArriba())
            mounstruo.moverArriba();
        else
            mounstruo.moverAbajo();
        break;
        case 2:
        console.log("colisionaPorAbajo:"+mounstruo.colisionaPorAbajo());
        if(!mounstruo.colisionaPorAbajo())
            mounstruo.moverAbajo();
        else
            mounstruo.moverArriba();
        break;
        case 3:
        console.log("colisionaPorDerecha:"+mounstruo.colisionaPorDerecha());
        if(!mounstruo.colisionaPorDerecha())
            mounstruo.moverDerecha();
        else
            mounstruo.moverIzquierda();
        break;
        case 4:
        console.log("colisionaPorIzquierda:"+mounstruo.colisionaPorIzquierda());
        if(!mounstruo.colisionaPorIzquierda())
            mounstruo.moverIzquierda();
        else
            mounstruo.moverDerecha();
        break;
    }
}

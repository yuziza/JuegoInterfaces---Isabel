"user strict";
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

//FUNCION QUE DETIENE EL GIF DEL PERSONAJE CUANDO SE SUELTA LA TECLA PULSADA
detiene(){
    switch(ultimaPosicion)
    {
        case "arriba":
        if(sexo==0)
        {
            $('#personaje').css("background-image", "url(images/personaje/chicoArriba.png)");
        }
        else
        {
            $('#personaje').css("background-image", "url(images/personaje/chicaArriba.png)");
        }
        break;
        case "derecha":
        if(sexo==0)
        {
            $('#personaje').css("background-image", "url(images/personaje/chicoDerecha.png)");   
        }
        else
        {
            $('#personaje').css("background-image", "url(images/personaje/chicaDerecha.png)");
        }
        break;
        case "abajo":
        if(sexo==0)
        {
            $('#personaje').css("background-image", "url(images/personaje/chicoAbajo.png)");
        }
        else
        {
            $('#personaje').css("background-image", "url(images/personaje/chicaAbajo.png)");
        }
        break;
        case "izquierda":
        if(sexo==0)
        {
            $('#personaje').css("background-image", "url(images/personaje/chicoIzquierda.png)");
        }
        else
        {
            $('#personaje').css("background-image", "url(images/personaje/chicaIzquierda.png)");
        }
        break;
    }
}

//FUNCIONES DE COLISION CON OBJETOS TERRENO/ARMA/MONSTRUO

colisionaPorAbajo(tipo) {
    let colisiona = false;
    if (tipo == "terreno") {
        let terrenos = getTerrenos();
        terrenos.forEach(val => {
            if (this.abajo + 10 > val.arriba && this.arriba < val.abajo && this.derecha > val.izquierda && this.izquierda < val.derecha) {
                colisiona = true;
            }
        });
    }
    if (tipo == "mounstruo") {
        let mounstruos = getMonstruos();
        mounstruos.forEach(val => {
           if (this.abajo > val.arriba && this.arriba < val.abajo && this.derecha > val.izquierda && this.izquierda < val.derecha) {
            colisiona = true;
        }
    });
    }
    if (tipo == "corazon") {
        let corazones = getCorazones();
        corazones.forEach(val => {
           if (this.abajo > val.arriba && this.arriba < val.abajo && this.derecha > val.izquierda && this.izquierda < val.derecha) {
            colisiona = true;
            if(vida<4)
                val.capa.remove();
        }
    });
    }
    return colisiona;
}
colisionaPorArriba(tipo) {
    let colisiona = false;
    if (tipo == "terreno") {
        let terrenos = getTerrenos();
        terrenos.forEach(val => {
            if (this.abajo > val.arriba && this.arriba - 10 < val.abajo && this.derecha > val.izquierda && this.izquierda < val.derecha) {
                colisiona = true;
            }
        });
    }
    if (tipo == "arma") {
        let armas = getArmas();
        armas.forEach(val => {
            if (this.abajo > val.arriba && this.arriba < val.abajo && this.derecha > val.izquierda && this.izquierda < val.derecha) {
                colisiona = true;
            }
        });
    }
    if (tipo == "llave") {
        let llaves = getLlaves();
        llaves.forEach(val => {
            if (this.abajo > val.arriba && this.arriba < val.abajo && this.derecha > val.izquierda && this.izquierda < val.derecha) {
                colisiona = true;
            }
        });
    }
    if (tipo == "palanca") {
        let palancas = getPalancas();
        palancas.forEach(val => {
            if (this.abajo > val.arriba && this.arriba < val.abajo && this.derecha > val.izquierda && this.izquierda < val.derecha) {
                colisiona = true;
            }
        });
    }
    if (tipo == "mounstruo") {
        let mounstruos = getMonstruos();
        mounstruos.forEach(val => {
            if (this.abajo > val.arriba && this.arriba < val.abajo && this.derecha > val.izquierda && this.izquierda < val.derecha) {
                colisiona = true;
            }
        });
    }
    if (tipo == "corazon") {
        let corazones = getCorazones();
        corazones.forEach(val => {
            if (this.abajo > val.arriba && this.arriba < val.abajo && this.derecha > val.izquierda && this.izquierda < val.derecha) {
                colisiona = true;
                if(vida<4)
                    val.capa.remove();
            }
        });
    }
    if (tipo == "puertaEspecial") {
       let puertas = getPuertas();
       puertas.forEach(val => {
           if (this.abajo > val.arriba && this.arriba - 10 < val.abajo && this.derecha > val.izquierda && this.izquierda < val.derecha) {
               colisiona = true;
               if(llave)
               {
                if(val.capa.attr("class")=="exit")
                {
                    exit = true;
                }
                else
                    if(val.capa.attr("class")=="suelo")
                    val.capa.remove();
            }
        }
    });
   }
   return colisiona;
}
colisionaPorDerecha(tipo) {
    let colisiona = false;
    if (tipo == "terreno") {
        let terrenos = getTerrenos();
        terrenos.forEach(val => {
            if (this.abajo > val.arriba && this.arriba < val.abajo && this.derecha + 10 > val.izquierda && this.izquierda < val.derecha) {
                colisiona = true;
            }
        });
    }
    if (tipo == "mounstruo") {
        let mounstruos = getMonstruos();
        mounstruos.forEach(val => {
            if (this.abajo > val.arriba && this.arriba < val.abajo && this.derecha > val.izquierda && this.izquierda < val.derecha) {
                colisiona = true;
            }
        });
    }
    if (tipo == "corazon") {
        let corazones = getCorazones();
        corazones.forEach(val => {
            if (this.abajo > val.arriba && this.arriba < val.abajo && this.derecha > val.izquierda && this.izquierda < val.derecha) {
                colisiona = true;
                if(vida<4)
                    val.capa.remove();
            }
        });
    }
    return colisiona;
}
colisionaPorIzquierda(tipo) {
    let colisiona = false;
    if (tipo == "terreno") {
        let terrenos = getTerrenos();
        terrenos.forEach(val => {
            if (this.abajo > val.arriba && this.arriba < val.abajo && this.derecha > val.izquierda && this.izquierda - 10 < val.derecha) {
                colisiona = true;
            }
        });
    }
    if (tipo == "mounstruo") {
        let mounstruos = getMonstruos();
        mounstruos.forEach(val => {
            if (this.abajo > val.arriba && this.arriba < val.abajo && this.derecha > val.izquierda && this.izquierda < val.derecha) {
                colisiona = true;
            }
        });
    }
    if (tipo == "corazon") {
        let corazones = getCorazones();
        corazones.forEach(val => {
            if (this.abajo > val.arriba && this.arriba < val.abajo && this.derecha > val.izquierda && this.izquierda < val.derecha) {
                colisiona = true;
                if(vida<4)
                    val.capa.remove();
            }
        });
    }
    if (tipo == "llave") {
        let llaves = getLlaves();
        llaves.forEach(val => {
            if (this.abajo > val.arriba && this.arriba < val.abajo && this.derecha > val.izquierda && this.izquierda < val.derecha) {
                colisiona = true;
            }
        });
    }
    if (tipo == "estrella") {
        let estrellas = getEstrellas();
        estrellas.forEach(val => {
            if (this.abajo > val.arriba && this.arriba < val.abajo && this.derecha > val.izquierda && this.izquierda < val.derecha) {
                colisiona = true;
                val.capa.remove();
            }
        });
    }
    return colisiona;
}

//FUNCIONES PARA QUE EL PERSONAJE PRINCIPAL SE MUEVA Y SE PONGA COMO GIF

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

    if(tipo==1)
    {
        this.capa.animate({ top: this.arriba -= 5 }, { duration: 1, queue: false });
    }
    if(tipo==2)
    {
        this.capa.animate({ top: this.arriba -= 20 }, { duration: 1, queue: false });
    }
    this.actualizaCoordenadas();
}
moverAbajo(tipo) {
    if(sexo==0)
    {
    this.capa.css("background-image", "url(images/personaje/chicoAbajo.gif)");
    this.capa.css("width", "35px");
    this.capa.css("height", "48px");
    }
    else
    {
    this.capa.css("background-image", "url(images/personaje/chicaAbajo.gif)");
    this.capa.css("width", "29px");
    this.capa.css("height", "45px");
    }

    if(tipo==1)
    {
        this.capa.animate({ top: this.arriba += 5}, { duration: 1, queue: false });
    }
    if(tipo==2)
    {
        this.capa.animate({ top: this.arriba += 20}, { duration: 1, queue: false });
    }
    this.actualizaCoordenadas();
}
moverDerecha(tipo) {
    if(sexo==0)
    {
    this.capa.css("background-image", "url(images/personaje/chicoDerecha.gif)");
    this.capa.css("width", "33px");
    this.capa.css("height", "48px");
    }
    else
    {
    this.capa.css("background-image", "url(images/personaje/chicaDerecha.gif)");
    this.capa.css("width", "30px");
    this.capa.css("height", "45px");
    }

    if(tipo==1)
    {
        this.capa.animate({ left: this.izquierda += 5 }, { duration: 1, queue: false });
    }
    if(tipo==2)
    {
        this.capa.animate({ left: this.izquierda += 20 }, { duration: 1, queue: false });
    }
    this.actualizaCoordenadas();
}
moverIzquierda(tipo) {
    if(sexo==0)
    {
    this.capa.css("background-image", "url(images/personaje/chicoIzquierda.gif)");
    this.capa.css("width", "33px");
    this.capa.css("height", "48px");
    }
    else
    {
    this.capa.css("background-image", "url(images/personaje/chicaIzquierda.gif)");
    this.capa.css("width", "30px");
    this.capa.css("height", "45px");
    }
    
    if(tipo==1)
    {
        this.capa.animate({ left: this.izquierda -= 5 }, { duration: 1, queue: false });
    }
    if(tipo==2)
    {
        this.capa.animate({ left: this.izquierda -= 20 }, { duration: 1, queue: false });
    }
    this.actualizaCoordenadas();
}
actualizaCoordenadas(movimiento) {
    this.derecha = this.izquierda + this.anchura;
    this.abajo = this.arriba + this.altura;
}

//FUNCION PARA CREAR EL PROYECTIL DESDE LA POSICION DEL PERSONAJE
crearDisparo(ultimaPosicion,nro){
    switch(ultimaPosicion)
    {
        case "derecha":
        $("#interfaz").append("<div id='disparo"+nro+"' class='disparo' style='top: "+(this.arriba+20)+"px; left: "+this.derecha+"px;'</div>");
        break;
        case "izquierda":
        $("#interfaz").append("<div id='disparo"+nro+"' class='disparo' style='top: "+(this.arriba+20)+"px; left: "+(this.izquierda-20)+"px;'</div>");
        break;
        case "abajo":
        $("#interfaz").append("<div id='disparo"+nro+"' class='disparo' style='top: "+this.abajo+"px; left: "+(this.izquierda+8)+"px;'</div>");
        break;
        case "arriba":
        $("#interfaz").append("<div id='disparo"+nro+"' class='disparo' style='top: "+this.arriba+"px; left: "+(this.izquierda+8)+"px;'</div>");
        break;
    }

}
}


//CLASE TERRENOS -> CAPAS INMOVILES
class Terreno { 
    constructor(capa) {
        this.capa = capa;
        this.izquierda = capa.offset().left;
        this.arriba = capa.offset().top;
        this.altura = capa.outerHeight(true);
        this.anchura = capa.outerWidth(true);
        this.derecha = this.izquierda + this.anchura;
        this.abajo = this.arriba + this.altura;
    }
}

class Objeto { 
    constructor(capa) {
        this.capa = capa;
        this.izquierda = capa.offset().left;
        this.arriba = capa.offset().top;
        this.altura = capa.outerHeight(true);
        this.anchura = capa.outerWidth(true);
        this.derecha = this.izquierda + this.anchura;
        this.abajo = this.arriba + this.altura;
    }
}


//CLASE MONSTRUO -> CUALQUIER MONSTRUO EN PANTALLA
class Mounstruo { 
    constructor(capa, vida) {
        this.capa = capa;
        this.izquierda = capa.offset().left;
        this.arriba = capa.offset().top;
        this.altura = capa.outerHeight(true);
        this.anchura = capa.outerWidth(true);
        this.derecha = this.izquierda + this.anchura;
        this.abajo = this.arriba + this.altura;
        this.vida = vida;
    }

    moverArriba() {
        this.capa.animate({ top: this.arriba -= 10 }, { duration: 10, queue: false });
        this.actualizaCoordenadas();
    }
    moverAbajo() {
        this.capa.animate({ top: this.arriba += 10}, { duration: 10, queue: false });
        this.actualizaCoordenadas();
    }
    moverDerecha() {
        this.capa.animate({ left: this.izquierda += 10 }, { duration: 10, queue: false });
        this.actualizaCoordenadas();
    }
    moverIzquierda() {
        this.capa.animate({ left: this.izquierda -= 10 }, { duration: 10, queue: false });
        this.actualizaCoordenadas();
    }
    actualizaCoordenadas(movimiento) {
        this.derecha = this.izquierda + this.anchura;
        this.abajo = this.arriba + this.altura;
    }

    colisionaPorAbajo() {
        let colisiona = false;
        let objetos = getObjetos();
        objetos.forEach(val => {
           if (this.abajo + 10 > val.arriba && this.arriba < val.abajo && this.derecha > val.izquierda && this.izquierda < val.derecha) {
            colisiona = true;
        }
    });
        return colisiona;
    }
    colisionaPorArriba() {
        let colisiona = false;
        let objetos = getObjetos();
        objetos.forEach(val => {
            if (this.abajo > val.arriba && this.arriba - 10 < val.abajo && this.derecha > val.izquierda && this.izquierda < val.derecha) {
                colisiona = true;
            }
        });
        return colisiona;
    }
    colisionaPorDerecha() {
        let colisiona = false;
        let objetos = getObjetos();
        objetos.forEach(val => {
            if (this.abajo > val.arriba && this.arriba < val.abajo && this.derecha + 10 > val.izquierda && this.izquierda < val.derecha) {
                colisiona = true;
            }
        });
        return colisiona;
    }
    colisionaPorIzquierda() {
        let colisiona = false;
        let objetos = getObjetos();
        objetos.forEach(val => {
            if (this.abajo > val.arriba && this.arriba < val.abajo && this.derecha > val.izquierda && this.izquierda - 10 < val.derecha) {
                colisiona = true;
            }
        });
        return colisiona;
    }
}

//CLASE DISPARO
class Disparo { 
    constructor(capa) {
        this.capa = capa;
        this.izquierda = capa.offset().left;
        this.arriba = capa.offset().top;
        this.altura = capa.outerHeight(true);
        this.anchura = capa.outerWidth(true);
        this.derecha = this.izquierda + this.anchura;
        this.abajo = this.arriba + this.altura;
    }

    //MOVIMIENTO DEL DISPARO
    moverArriba() {
        this.capa.animate({ top: this.arriba -= 10 }, { duration: 300, queue: false });
        this.actualizaCoordenadas();
    }
    moverAbajo() {
        this.capa.animate({ top: this.arriba += 10}, { duration: 300, queue: false });
        this.actualizaCoordenadas();
    }
    moverDerecha() {
        this.capa.animate({ left: this.izquierda += 10 }, { duration: 300, queue: false });
        this.actualizaCoordenadas();
    }
    moverIzquierda() {
        this.capa.animate({ left: this.izquierda -= 10 }, { duration: 300, queue: false });
        this.actualizaCoordenadas();
    }
    actualizaCoordenadas(movimiento) {
        this.derecha = this.izquierda + this.anchura;
        this.abajo = this.arriba + this.altura;
    }

    //COLISIONES DEL DISPARO
    colisionaPorAbajo(tipo) {
        let colisiona = false;
        if (tipo == "terreno") {
            let terrenos = getTerrenos();
            terrenos.forEach(val => {
                if (this.abajo + 10 > val.arriba && this.arriba < val.abajo && this.derecha > val.izquierda && this.izquierda < val.derecha) {
                    colisiona = true;
                }
            });
        }
        if (tipo == "mounstruo") {
            let mounstruos = getMonstruos();
            mounstruos.forEach(val => {
               if (this.abajo + 10 > val.arriba && this.arriba < val.abajo && this.derecha > val.izquierda && this.izquierda < val.derecha) {
                colisiona = true;
                setTimeout(function() {val.capa.remove();}, 300);
            }
        });
        }
        return colisiona;
    }
    colisionaPorArriba(tipo) {
        let colisiona = false;
        if (tipo == "terreno") {
            let terrenos = getTerrenos();
            terrenos.forEach(val => {
                if (this.abajo > val.arriba && this.arriba - 10 < val.abajo && this.derecha > val.izquierda && this.izquierda < val.derecha) {
                    colisiona = true;
                }
            });
        }
        if (tipo == "mounstruo") {
            let mounstruos = getMonstruos();
            mounstruos.forEach(val => {
                if (this.abajo > val.arriba && this.arriba - 10 < val.abajo && this.derecha > val.izquierda && this.izquierda < val.derecha) {
                    colisiona = true;
                    setTimeout(function() {val.capa.remove();}, 300);
                }
            });
        }
        return colisiona;
    }
    colisionaPorDerecha(tipo) {
        let colisiona = false;
        if (tipo == "terreno") {
            let terrenos = getTerrenos();
            terrenos.forEach(val => {
                if (this.abajo > val.arriba && this.arriba < val.abajo && this.derecha + 10 > val.izquierda && this.izquierda < val.derecha) {
                    colisiona = true;
                }
            });
        }
        if (tipo == "mounstruo") {
            let mounstruos = getMonstruos();
            mounstruos.forEach(val => {
                if (this.abajo > val.arriba && this.arriba < val.abajo && this.derecha + 10 > val.izquierda && this.izquierda < val.derecha) {
                    colisiona = true;
                    setTimeout(function() {val.capa.remove();}, 300);
                }
            });
        }
        return colisiona;
    }
    colisionaPorIzquierda(tipo) {
        let colisiona = false;
        if (tipo == "terreno") {
            let terrenos = getTerrenos();
            terrenos.forEach(val => {
                if (this.abajo > val.arriba && this.arriba < val.abajo && this.derecha > val.izquierda && this.izquierda - 10 < val.derecha) {
                    colisiona = true;
                }
            });
        }
        if (tipo == "mounstruo") {
            let mounstruos = getMonstruos();
            mounstruos.forEach(val => {
                if (this.abajo > val.arriba && this.arriba < val.abajo && this.derecha > val.izquierda && this.izquierda - 10 < val.derecha) {
                    colisiona = true;
                    setTimeout(function() {val.capa.remove();}, 300);
                }
            });
        }
        return colisiona;
    }
}
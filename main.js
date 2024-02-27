//------------CARGAMOS LAS PALETAS DEL JUGADOR 1 EN VARIABLES ---------------
//---------------UBICALAS EN UNA POSICION EN X y Y EN PANTALLA--------------
var paddle1 = 15;
var paddle1X = 0;
var paddle1Y;
var paddle2 = 15;
var paddle2X = 585;
//------------CARGAMOS LAS PALETAS DEL JUGADOR 2 EN VARIABLES ---------------
//---------------UBICALAS EN UNA POSICION EN X y Y EN PANTALLA--------------





// ------------------CARGA LOS VALORES DE TAMAÑO DE LAS PALETAS ----------------

var paddle1Height = 80;
var paddle2Height = 80;


//--------------CARGA LOS VALORES DE LOS PUNTOS INICIALES DE CADA JUGADOR---------------
var score1 = 0;
var score2 = 0;




//--------------CARGA LOS VALORES DEL PUNTAJE ACUMULADO DEL J1 Y LA PC------------------
var J1 = 0;
var Pc = 0;




//posición y velocidad x, y de la pelota y su radio

var pelota = {
    x:350/2,
    y:480/2,
    r:20,
    dx:3,
    dy:3
}



//----------------CREA LAS VARIABLES DE LA NARIZ EN X y Y, ADEMÁS EL PUNTAJE DE POSENET--------------
var nariz_X = 0;
var nariz_Y = 0;
var ScoreNariz = 0;




//----------------CRE LA VARIABLE QUE DEFINE EL ESTATUS DEL JUEGO --------------
var Estatus = "";





// -----------COMPLETA LA FUNCION PRELOAD DONDE ESTARAN LOS SONIDOS DEL JUEGO-----------
 function preload() {

    //---------------PRE-CARGA DE SONIDOS DEL JUEGO EN VARIABLES-----------------

     ball_touch_paddel = loadSound("ball_touch_paddel.wav");
     missed = loadSound("missed.wav");

 }

function setup() {
    Lienzo = createCanvas(600, 350);
    Lienzo.parent("Div");
    Lienzo.position(300, 265)
    Video = createCapture(VIDEO);
    Video.size(600, 350);
    Video.hide();
     // -----------CREA LA FUNCION SETUP PARA CARGAR EL LIENZO, LA CAMARA Y POSENET---------------
    Posenet = ml5.poseNet(Video, modelLoad);
    Posenet.on('pose', getPoses);
}
function modelLoad() {
    console.log("sfekuhsfkeuygfvkauhmsejfasef");    
}
function getPoses(Resultados) {
    if (Resultados.length > 0) {
        console.log(Resultados);
        nariz_X = Resultados[0].pose.nose.x;
        nariz_Y = Resultados[0].pose.nose.y;
        ScoreNariz = Resultados[0].pose.keypoints[0].score;
    }
}
function Jugar() {
    Estatus = "JuegoL";
    document.getElementById("EST").innerHTML = "El juego esta iniciando";
}

function draw(){
    if(Estatus == "JuegoL"){
        background(0);
        image(Video, 0, 0, 600, 350);
        //---------CARGA EL VIDEO SOBRE EL LIENZO PARA VER TU CAMARA-----------------------
        //-------RECUERDA QUE EL LIENZO ES UN RECTANGULO, CREALO ----------------------
        fill("green");
        stroke("green");
        rect(585, 0, 15, 350);
        rect(0, 0, 15, 350);
        //-----------CREA LA CONDICION PARA RECONOCER LA NARIZ EN PANTALLA-------------------
        if(ScoreNariz > 0.1){
            fill("green");
            stroke("green");
            circle(nariz_X, nariz_Y, 12);
            //------------ELIGE EL COLOR DEL PUNTO QUE SALDRA SOBRE TU NARIZ----------------
            



            //------------CREA UN CIRCULO PARA EL PUNTO SOBRE TU NARIZ--------------------
           


        }


        //Llamar a la función paddleInCanvas 
        paddleInCanvas();
        
        //-------------ELIGE UN COLOR PARA TU PALETA------------
        paddle1Y = nariz_Y;
        fill("blue");
        stroke("black");
        strokeWeight(0.5);
        rect(paddle1X, paddle1Y, paddle1, paddle1Height, 100);

        //-------------CREA LA PALETA EN FORMA DE RECTANGULO DELGADO DEL LADO IZQUIERDO----------
     




        //--------------ELIGE UN COLOR PARA LA PALETA DE LA COMPUTADORA-------------------
        paddle2Y = pelota.y - paddle2Height / 2;
        fill("red");
        stroke("black");
        strokeWeight(0.5);
        rect(paddle2X, paddle2Y, paddle2, paddle2Height, 100);
        //-------------CREA LA PALETA EN FORMA DE RECTANGULO DELGADO DEL LADO DERECHO----------
        



    
        //Llamar a la función  midline
        midline();
    
        //Llamar a la función drawScore
         drawScore();

        //Llamar a la función models  
        models();

         //Llamar a la función move, la cual es muy importante
        move();

    }

}



//Función reset, para cuando la pelota no entra en contacto con la paleta

function reset()
{
   pelota.x = width/2+100,
   pelota.y = height/2+100;
   pelota.dx =3;
   pelota.dy =3;   
}


//La función midline dibuja una línea en el centro
function midline()
{
    for(i=0;i<480;i+=10) 
    {
        var y = 0;
        fill("white");
        stroke(0);
        rect(width/2,y+i,10,480);
    }
}


//---------------La función drawScore muestra los puntajes en pantalla-------------------------

function drawScore(){

    // ---------------CENTRA EL TEXTO EN LA PANTALLA----------------
    textAlign(CENTER);
    //----------ELIGE EL TAMAÑO DEL TEXTO--------------------
    textSize(20);
    
    //---------------ELIGE EL COLOR DEL TEXTO-------------------
   fill("black");
   stroke("green");
   text("Yo: ", 150, 60);
   text(J1, 150, 80);
   text("Pc: ", 450, 60);
   text(Pc, 450, 80);

    //------------USANDO LA FUNCION TEXT MUESTRA LOS PUNTAJES EN PANTALLA------------
   






}


//Función muy importante para este juego
function move(){
   fill(50,350,0);
   stroke(255,0,0);
   strokeWeight(0.5);
   ellipse(pelota.x,pelota.y,pelota.r,20)
   pelota.x = pelota.x + pelota.dx;
   pelota.y = pelota.y + pelota.dy;

    if(pelota.x + pelota.r > width - pelota.r/2)
    {
       pelota.dx = -pelota.dx - 0.5;       
    }

    if (pelota.x - 2.5 * pelota.r/2 < 0)
    {
        if (pelota.y >= paddle1Y && pelota.y <= paddle1Y + paddle1Height) 
        {
            pelota.dx = -pelota.dx+0.5; 
            ball_touch_paddel.play();
            J1++;
        }

        else
        {
            Pc++;
            missed.play();
            reset();
            navigator.vibrate(100);
        }
    }

    if(Pc ==4){
        fill("#FFA500");
        stroke(0);
        rect(0,0,width,height-1);
        fill("white");
        stroke("white");
        textSize(25);
        text("Perdiste ):", width / 2, height / 2);
        text("Presiona Reiniciar para jugar de nuevo", width/2, height/2 + 40);

        //-------------CREA UN TEXTO EN LA MITAD DE LA PANTALLA INDICANDO QUE EL JUEGO TERMINO---------



        //------------CREA OTRO TEXTO INDICANDO QUE PARA VOLVER A JUGAR DEBE PRESIONAR REINICIAR-----------
       

        noLoop();

        //--------------REINICIA EL PUNTAJE DE LA COMPUTADORA A CERO-------------------
       Pc = 0;
    }
   
    if(pelota.y+pelota.r > height || pelota.y-pelota.r <0)
    {
        pelota.dy =- pelota.dy;
    }   
}


//Ancho, altura y velocidad de la pelota escritos en el canvas
function models()
{
    textSize(18);
    fill("brown");
    noStroke();
    text("Velocidad de la pelota: "+abs(pelota.dx),150,20);

}


//Esta función ayuda a que la pelota no salga del canvas
function paddleInCanvas()
{
  if(mouseY + paddle1Height > height)
  {
    mouseY = height - paddle1Height;
  }

  if(mouseY < 0)
  {
     mouseY =0;
  }
 
  
}



//----------COMPLETA LA FUNCION DE REINICIO-------------------
function Reiniciar(){
    loop()
    //-------------USA EL COMANDO DE BUCLE PARA REINICIAR EL JUEGO------
    Pc = 0;
    J1 = 0;

    //----------------REINICIA LOS PUNTAJES DEL J1 Y LA COMPUTADORA A CERO-------------------
 
 
 

}

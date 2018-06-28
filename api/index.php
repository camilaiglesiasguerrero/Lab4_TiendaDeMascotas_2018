<?php

use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;

require '../composer/vendor/autoload.php';
require_once '/clases/AccesoDatos.php';
require_once '/clases/AutentificadorJWT.php';
require_once '/clases/MWparaCORS.php';
require_once '/clases/MWparaAutentificar.php';
require_once '/clases/persona.php';
require_once '/clases/usuario.php';
require_once '/clases/personaApi.php';
require_once '/clases/mascota.php';
require_once '/clases/turno.php';

$config['displayErrorDetails'] = true;
$config['addContentLengthHeader'] = false;
$config['determineRouteBeforeAppMiddleware'] = true;
/*

¡La primera línea es la más importante! A su vez en el modo de 
desarrollo para obtener información sobre los errores
 (sin él, Slim por lo menos registrar los errores por lo que si está utilizando
  el construido en PHP webserver, entonces usted verá en la salida de la consola 
  que es útil).

  La segunda línea permite al servidor web establecer el encabezado Content-Length, 
  lo que hace que Slim se comporte de manera más predecible.
*/

$app = new \Slim\App(["settings" => $config]);



/*LLAMADA A METODOS DE INSTANCIA DE UNA CLASE*/
$app->post('/ingreso/', function (Request $request, Response $response) {    

	$token="";
  $ArrayDeParametros = $request->getParsedBody();
 
  $email=$ArrayDeParametros['email']; 
  $clave=$ArrayDeParametros['clave'];
  $tipo=$ArrayDeParametros['tipo'];

 //var_dump($usuario);
   if( $email &&  $clave )
   {
      if( usuario::esValido($email,$clave,$tipo))
      {
        $datos=array('email'=>$email,'tipo'=>$tipo);
        $token= AutentificadorJWT::CrearToken($datos);
        //$retorno=array('datos'=> $datos, 'token'=>$token );
        $retorno=array('token'=>$token );
        $newResponse = $response->withJson( $retorno ,200); 
          usuario::GuardaToken($token,$email);
      }
      else
      {
        $retorno=array('error'=> "no es usuario valido" );
        $newResponse = $response->withJson( $retorno ,409); 
      }
      }else
      {
            $retorno=array('error'=> "Faltan los datos del usuario y su clave" );
            $newResponse = $response->withJson( $retorno  ,411); 

      }
 
	
  $newResponse
            ->withHeader('Access-Control-Allow-Origin', '*')
            ->withHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Origin, Authorization')
            ->withHeader('Access-Control-Allow-Methods',  'POST');

  return $newResponse;

});

$app->get('/ingreso/', function (Request $request, Response $response,$arg) {    
    
  $token="";

  $datos=$request->getParam();
  if(isset( $arg['email']) && isset( $arg['clave']) )
  {
      $email=$ArrayDeParametros['email'];
      $clave= $ArrayDeParametros['clave'];

      if(usuario::esValido($email,$clave))
      {
        $datos=array('email'=>$email,'clave'=>$clave);
        $token= AutentificadorJWT::CrearToken($datos);
        $retorno=array('datos'=> $datos, 'token'=>$token );
        $newResponse = $response->withJson( $retorno ,200); 
      }
      else
      {
        $retorno=array('error'=> "no es usuario valido" );
        $newResponse = $response->withJson( $retorno ,409); 
      }
  }else
  {
        $retorno=array('error'=> "Faltan los datos del usuario y su clave" );
        $newResponse = $response->withJson( $datos  ,411); 
  }
 
  return $newResponse;
   });

   $app->post('/Usuario/', function (Request $request, Response $response) {    
  
    $ArrayDeParametros = $request->getParsedBody();
    
    $tipo=$ArrayDeParametros['tipo']; 
    $email=$ArrayDeParametros['email'];
    $clave=$ArrayDeParametros['clave'];
       
    $msj = usuario::CargarUnUsuario($tipo,$email,$clave);
    $retorno=array('mensaje'=>$msj );
    $newResponse = $response->withJson( $retorno ,200); 
    $newResponse
              ->withHeader('Access-Control-Allow-Origin', '*')
              ->withHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Origin, Authorization')
              ->withHeader('Access-Control-Allow-Methods',  'POST');
    
    return $newResponse;
    
    });

    $app->post('/Mascota/', function (Request $request, Response $response) {    
  
      $ArrayDeParametros = $request->getParsedBody();
       
      $nroFicha=$ArrayDeParametros['nroFicha'];
      $raza=$ArrayDeParametros['raza'];
      $color=$ArrayDeParametros['color'];
      $edad=$ArrayDeParametros['edad'];
      $tipo=$ArrayDeParametros['tipo'];
      $owner = $ArrayDeParametros['owner'];

      $msj = mascota::CargarUno($nroFicha,$raza,$color,$edad,$tipo,$owner);
      $retorno=array('mensaje'=>$msj );
      $newResponse = $response->withJson( $retorno ,200); 
      $newResponse
                ->withHeader('Access-Control-Allow-Origin', '*')
                ->withHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Origin, Authorization')
                ->withHeader('Access-Control-Allow-Methods',  'POST');
      
      return $newResponse;
      
      });
    
     $app->get('/Mascotas/', function (Request $request, Response $response) {    
  
        $todos=mascota::TraerTodos();
        $newresponse = $response->withJson($todos, 200);  
        return $newresponse;
      
      });
    
      $app->post('/Turno/', function (Request $request, Response $response) {    
  
        $ArrayDeParametros = $request->getParsedBody();
         
        $nroFicha=$ArrayDeParametros['nroFicha'];
        $fecha=$ArrayDeParametros['fecha'];
        $hora=$ArrayDeParametros['hora'];
        $owner=$ArrayDeParametros['owner'];

        $msj = turno::CargarUno($nroFicha,$fecha,$hora,$owner);
        $retorno=array('mensaje'=>$msj );
        $newResponse = $response->withJson( $retorno ,200); 
        $newResponse
                  ->withHeader('Access-Control-Allow-Origin', '*')
                  ->withHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Origin, Authorization')
                  ->withHeader('Access-Control-Allow-Methods',  'POST');
        
        return $newResponse;
        
        });

        $app->post('/Turno/Modificar/', function (Request $request, Response $response) {    
  
          $ArrayDeParametros = $request->getParsedBody();
           
          $id = $ArrayDeParametros['id'];
          //$nroFicha=$ArrayDeParametros['nroFicha'];
          //$fecha=$ArrayDeParametros['fecha'];
          //$hora=$ArrayDeParametros['hora'];
          //$owner=$ArrayDeParametros['owner'];
          $estado=$ArrayDeParametros['estado'];

          //$msj = turno::ModificarUno($id,$nroFicha,$fecha,$hora,$owner,$estado);
          $msj = turno::ModificarUno($id,$estado);
          $retorno=array('mensaje'=>$msj );
          $newResponse = $response->withJson( $retorno ,200); 
          $newResponse
                    ->withHeader('Access-Control-Allow-Origin', '*')
                    ->withHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Origin, Authorization')
                    ->withHeader('Access-Control-Allow-Methods',  'POST');
          
          return $newResponse;
          
          });

        $app->get('/Turno/', function (Request $request, Response $response) {    
  
          $todos=turno::TraerTodos();
          $newresponse = $response->withJson($todos, 200);  
          return $newresponse;
        
        });

   $app->group('/persona', function () {
    
     $this->get('/', \personaApi::class . ':TraerTodos')->add(\MWparaCORS::class . ':HabilitarCORSTodos');
    
     $this->get('/{id}', \personaApi::class . ':TraerUno')->add(\MWparaCORS::class . ':HabilitarCORSTodos');
   
    // $this->post('/', \personaApi::class . ':ModificarUno')->add(\MWparaCORS::class . ':HabilitarCORSTodos');
      $this->post('/', \personaApi::class . ':BorrarUno')->add(\MWparaCORS::class . ':HabilitarCORSTodos');
     
    $this->delete('/delete', \personaApi::class . ':BorrarUno');
   
     $this->put('/', \personaApi::class . ':ModificarUno');
        
   })->add(\MWparaAutentificar::class . ':VerificarUsuario')->add(\MWparaCORS::class . ':HabilitarCORSTodos');
   

$app->add(function ($req, $res, $next) {
    $response = $next($req, $res);
    return $response
            ->withHeader('Access-Control-Allow-Origin', '*')
            ->withHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Origin, Authorization')
            ->withHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
});
$app->run();
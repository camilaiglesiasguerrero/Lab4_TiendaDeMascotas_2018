<?php
class mascota
{
    public $nroFicha;
	public $raza;
    public $color;
    public $edad;
    public $tipo;
    
    
public static function TraerUna($dato) 
{
    $objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
    $consulta =$objetoAccesoDato->RetornarConsulta("select nroFicha, raza, color, edad, tipo, owner from mascota where nroFicha = '$dato'");
    $consulta->execute();
    $unapersona= $consulta->fetchObject('mascota');
    return $unapersona;				       
}

public static function CargarUno($nroFicha, $raza, $color, $edad, $tipo, $owner)
{
    $objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
    $consulta =$objetoAccesoDato->RetornarConsulta("insert into mascota (nroFicha, raza, color,edad, tipo, owner) values ('$nroFicha','$raza','$color','$edad','$tipo','$owner')");
    $consulta->execute();

    return "éxito";				       
}

public static function TraerTodos()
	{
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
        $consulta =$objetoAccesoDato->RetornarConsulta("select nroFicha, raza, color, edad, tipo, owner from mascota");
        $consulta->execute();			
        return $consulta->fetchAll(PDO::FETCH_CLASS, "mascota");		
	}

}
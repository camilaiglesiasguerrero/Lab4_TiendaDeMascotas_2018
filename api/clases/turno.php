<?php
class turno
{
    public $nroFicha;
	public $fecha;
    public $hora;
    
    
public static function TraerUna($dato) 
{
    $objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
    $consulta =$objetoAccesoDato->RetornarConsulta("select nroFicha, raza, color, edad, tipo, owner from mascota where nroFicha = '$dato'");
    $consulta->execute();
    $unapersona= $consulta->fetchObject('mascota');
    return $unapersona;				       
}

public static function CargarUno($nroFicha, $fecha, $hora, $owner)
{
    $objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
    $consulta =$objetoAccesoDato->RetornarConsulta("insert into turno (nroFicha, fecha, hora,owner,estado) values ('$nroFicha','$fecha','$hora','$owner','pendiente')");
    $consulta->execute();

    return "éxito";				       
}

public static function ModificarUno($id,$estado)
{
    $objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
    $consulta =$objetoAccesoDato->RetornarConsulta("update turno set estado='$estado' where id='$id'");
    $consulta->execute();

    return "éxito";				       
}

public static function TraerTodos()
	{
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
        $consulta =$objetoAccesoDato->RetornarConsulta("select id,nroFicha, fecha, hora, owner, estado
             from turno order by fecha DESC, hora DESC");
        $consulta->execute();			
        return $consulta->fetchAll(PDO::FETCH_CLASS, "turno");		
	}

}
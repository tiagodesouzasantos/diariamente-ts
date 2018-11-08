<?php
namespace App\Repositories\Auth;
use DB;
class RhUsuarioRepository{
    public function findUserByCpf($credentials){
		try{
			$rhUsuario = \DB::connection('vetorhCon')->table('VETORH.R034FUN')
				->join('VETORH.R030EMP', 'R034FUN.numemp', '=', 'R030EMP.numemp')
				->select('R034FUN.numcad AS matricula', 'R034FUN.numcpf AS cpf',
					'R034FUN.nomfun AS nome','R034FUN.apefun AS apelido','R034FUN.tipsex AS sexo',
					'R030EMP.numemp AS id_emp','R030EMP.apeemp AS nm_fantasia_emp', 'R034FUN.tipcol AS tip_col')
				->where('R034FUN.numcpf', '=', $credentials['cpf'])
				->where('R034FUN.sitafa', '=', 1)
				->orderBy('R034FUN.datsal', 'desc')->get();
			$result = count($rhUsuario)>0?$rhUsuario[0]:null;
        	return $result;
		}catch(\Exception $e){
			throw new Exception(array("exception"=>$e->getMessage(),"msg"=>"Problemas ao buscar colaborador no sistema senior"));
		}        
    }
}
?>
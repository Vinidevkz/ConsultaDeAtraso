<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Falta extends Model
{
    use HasFactory;

    // Define a tabela associada ao modelo, se não seguir a convenção padrão
    protected $table = 'faltas';

    // Defina os campos que podem ser preenchidos em massa
    protected $fillable = [
        'idAtraso',
        'dtAtraso',
        'horario',
        'nomeAluno',
        'idPeriodo',
        'idModulo',
        'idCurso',
    ];

    // Se necessário, defina os campos que devem ser tratados como data/hora
    protected $dates = [
        'dtAtraso',
    ];
}

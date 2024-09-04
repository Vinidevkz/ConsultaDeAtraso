<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Falta extends Model
{
    use HasFactory;

    // Define a tabela associada ao modelo, se não seguir a convenção padrão
    protected $table = 'tbfalta';

    // Defina os campos que podem ser preenchidos em massa
    protected $fillable = [
        'idFalta',
        'nomeAluno',
        'horarioFalta',
        'periodoCurso',
        'moduloCurso',
        'nomeCurso',
    ];

    // Se necessário, defina os campos que devem ser tratados como data/hora
    protected $dates = [
        'dtAtraso',
    ];

    public $timestamps = false;
}

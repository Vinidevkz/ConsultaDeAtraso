<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Atraso extends Model
{
    use HasFactory;

    protected $table = 'tbatraso';

    protected $fillable = [
        'nomeAluno',
        'nomeCurso',
        'periodoCurso',
        'moduloCurso',

    ];

    // Se o campo realmente for varchar, remova isso
    // protected $dates = [
    //     'horarioAtraso',
    // ];

    public $timestamps = false;

    public function setHorarioatrasoAttribute($value)
    {
        $this->attributes['horarioatraso'] = date('H:i', strtotime($value));
    }

    public function getHorarioatrasoFormattedAttribute()
    {
        return date('H:i', strtotime($this->horarioatraso));
    }
}

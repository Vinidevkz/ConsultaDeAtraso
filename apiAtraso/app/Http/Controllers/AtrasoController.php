<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Atraso;
use Illuminate\Http\Response;

class AtrasoController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index()
    {
        $atrasos = Atraso::all(); // Corrigido: nome correto da model com inicial maiúscula
        return response()->json($atrasos); // Melhor retorno com JSON
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(Request $request)
    {
        $request->validate([
            'nomeAluno' => 'required|string',
            'nomeCurso' => 'required|string',
            'periodoCurso' => 'required|string',
            'moduloCurso' => 'required|string',
            // Removido 'horarioatraso' da validação
        ]);
    
        $atraso = new Atraso();
        $atraso->nomeAluno = $request->nomeAluno;
        $atraso->nomeCurso = $request->nomeCurso;
        $atraso->periodoCurso = $request->periodoCurso;
        $atraso->moduloCurso = $request->moduloCurso;
    
        // Adiciona o horário atual
        $atraso->horarioAtraso = now()->format('H:i');
    
        $atraso->save();
    
        return response()->json($atraso);
    }
    
    

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\JsonResponse
     */


    public function show($id)
    {
        $atraso = Atraso::find($id);

        if (!$atraso) {
            return response()->json(['error' => 'Atraso não encontrado'], Response::HTTP_NOT_FOUND);
        }

        return response()->json($atraso);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function update(Request $request, $id)
    {
        $atraso = Atraso::find($id);

        if (!$atraso) {
            return response()->json(['error' => 'Atraso não encontrado'], Response::HTTP_NOT_FOUND);
        }

        // Validação dos dados
        $validatedData = $request->validate([
            'nomeAluno' => 'string|max:255',
            'nomeCurso' => 'string|max:255',
            'periodoCurso' => 'string|max:100',
            'moduloCurso' => 'string|max:100',
            'horarioAtraso' => 'date_format:H:i',
        ]);

        $atraso->update($validatedData);

        return response()->json($atraso);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy($id)
    {
        $atraso = Atraso::find($id);

        if (!$atraso) {
            return response()->json(['error' => 'Atraso não encontrado'], Response::HTTP_NOT_FOUND);
        }

        $atraso->delete();

        return response()->json(['message' => 'Atraso removido com sucesso'], Response::HTTP_OK);
    }
}

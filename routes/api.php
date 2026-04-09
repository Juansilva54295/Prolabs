<?php

use App\Http\Controllers\Api\AgendamentoApiController;
use App\Http\Controllers\Api\ProfessorApiController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AlunoController;

Route::get('/professores', [ProfessorApiController::class, 'index']);

Route::get('/agendamentos', [AgendamentoApiController::class, 'index']);
Route::post('/agendamentos', [AgendamentoApiController::class, 'store']);
Route::get('/agendamentos/{agendamento}', [AgendamentoApiController::class, 'show']);
Route::put('/agendamentos/{agendamento}', [AgendamentoApiController::class, 'update']);
Route::delete('/agendamentos/{agendamento}', [AgendamentoApiController::class, 'destroy']);

Route::apiResource('alunos', AlunoController::class);
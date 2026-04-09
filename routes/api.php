<?php

use App\Http\Controllers\Api\AgendamentoApiController;
use App\Http\Controllers\Api\ProfessorApiController;
use Illuminate\Support\Facades\Route;

Route::get('/professores', [ProfessorApiController::class, 'index']);

Route::get('/agendamentos', [AgendamentoApiController::class, 'index']);
Route::post('/agendamentos', [AgendamentoApiController::class, 'store']);
Route::get('/agendamentos/{agendamento}', [AgendamentoApiController::class, 'show']);
Route::put('/agendamentos/{agendamento}', [AgendamentoApiController::class, 'update']);
Route::delete('/agendamentos/{agendamento}', [AgendamentoApiController::class, 'destroy']);
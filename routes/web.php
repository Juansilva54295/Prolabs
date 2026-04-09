<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ProfessorController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AgendamentoController;
use App\Http\Controllers\Auth\GoogleAuthController;
use Illuminate\Http\Request;

Route::get('/', function () {
    return view('welcome');
});

Route::get('/auth/google', [GoogleAuthController::class, 'redirect'])->name('auth.google');
Route::get('/auth/google/callback', [GoogleAuthController::class, 'callback'])->name('auth.google.callback');

Route::get('/dashboard', function () {
    return redirect()->away(env('FRONTEND_URL', 'http://localhost:5174') . '/agendamentos');
})->middleware(['auth'])->name('dashboard');

Route::middleware(['auth'])->group(function () {
    Route::get('/me', function (Request $request) {
        return response()->json([
            'id' => $request->user()->id,
            'name' => $request->user()->name,
            'email' => $request->user()->email,
            'role' => $request->user()->role,
            'google_id' => $request->user()->google_id,
            'profile_photo_path' => $request->user()->profile_photo_path,
        ]);
    });

    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::middleware('role:admin,professor')->group(function () {
        Route::resource('agendamentos', AgendamentoController::class)
            ->except(['show']);
    });

    Route::middleware('role:aluno')->group(function () {
        Route::get('agendamentos', [AgendamentoController::class, 'index'])
            ->name('agendamentos.index');

        Route::get('agendamentos/{agendamento}', [AgendamentoController::class, 'show'])
            ->name('agendamentos.show');
    });

    Route::middleware('role:admin')->group(function () {
        Route::resource('professores', ProfessorController::class)
            ->parameters([
                'professores' => 'professor',
            ]);
    });
});

require __DIR__ . '/auth.php';
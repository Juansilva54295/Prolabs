<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Professor;
use Illuminate\Http\JsonResponse;

class ProfessorApiController extends Controller
{
    public function index(): JsonResponse
    {
        $professores = Professor::query()
            ->orderBy('name')
            ->get(['id', 'name', 'email']);

        return response()->json($professores);
    }
}
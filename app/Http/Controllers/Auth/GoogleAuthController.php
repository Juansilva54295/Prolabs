<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use Laravel\Socialite\Facades\Socialite;

class GoogleAuthController extends Controller
{
    public function redirect(): RedirectResponse
    {
        return Socialite::driver('google')->redirect();
    }

    public function callback(): RedirectResponse
    {
        $googleUser = Socialite::driver('google')->stateless()->user();

        $user = User::where('email', $googleUser->getEmail())->first();

        if ($user) {
            $user->update([
                'google_id' => $googleUser->getId(),
                'profile_photo_path' => $googleUser->getAvatar(),
                'profile_photo_source' => 'google',
                'email_verified_at' => $user->email_verified_at ?? now(),
            ]);
        } else {
            $user = User::create([
                'name' => $googleUser->getName() ?: $googleUser->getNickname() ?: 'Usuário Google',
                'email' => $googleUser->getEmail(),
                'google_id' => $googleUser->getId(),
                'profile_photo_path' => $googleUser->getAvatar(),
                'profile_photo_source' => 'google',
                'password' => Hash::make(Str::random(32)),
                'email_verified_at' => now(),
                'role' => 'aluno',
            ]);
        }

        Auth::login($user);

        return redirect()->away(env('FRONTEND_URL', 'http://localhost:5174') . '/agendamentos');
    }
}
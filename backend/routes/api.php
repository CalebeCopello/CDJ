<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Laravel\Socialite\Facades\Socialite;

Route::get('/', function () {
    return 'Hello World!';
});

// Socialite Routes
Route::get('/auth/github/redirect', function () {
    return Socialite::driver('github')->stateless()->redirect();
});
Route::get('/auth/github/callback', [AuthController::class, 'github']);
Route::get('/auth/google/redirect', function () {
    return Socialite::driver('google')->stateless()->redirect();
});
Route::get('/auth/google/callback', [AuthController::class, 'google']);

// User Routes
Route::post('/signup', [AuthController::class, 'signup']);
Route::post('/signin', [AuthController::class, 'signin']);
Route::middleware('auth:sanctum')->group(function () {
    Route::delete('/signout', [AuthController::class, 'signout']);

    Route::get('/user/signed', [UserController::class, 'signed']);
    Route::get('/user', function (Request $request) {return 'Allowed'.$request->user(); });
});

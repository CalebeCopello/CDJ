<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return 'Hello World!';
});

// User Routes

Route::post('/signup', [AuthController::class, 'signup']);
Route::post('/signin', [AuthController::class, 'signin']);
Route::middleware('auth:sanctum')->group(function () {
    Route::delete('/signout', [AuthController::class, 'signout']);

    Route::get('/user/signed', [UserController::class, 'signed']);
    Route::get('/user', function (Request $request) {return 'Allowed'.$request->user(); });
});

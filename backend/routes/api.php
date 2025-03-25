<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\PostCommentController;
use App\Http\Controllers\PostController;
use App\Http\Controllers\PostLikesController;
use App\Http\Controllers\TagController;
use App\Http\Controllers\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Laravel\Socialite\Facades\Socialite;

// Test Api Route
Route::get('/', function () {
    return 'Hello World!';
});

// User Authentication Routes
Route::post('/signup', [AuthController::class, 'signup']);
Route::post('/signin', [AuthController::class, 'signin']);

// Socialite Routes
// GitHub
Route::get('/auth/github/redirect', function () {
    return Socialite::driver('github')->stateless()->redirect();
});
Route::get('/auth/github/callback', [AuthController::class, 'github']);
// Google
Route::get('/auth/google/redirect', function () {
    return Socialite::driver('google')->stateless()->redirect();
});
Route::get('/auth/google/callback', [AuthController::class, 'google']);

// Posts Routes
Route::get('/post/get-all', [PostController::class, 'getAllPosts']);
Route::get('/post/get/{slug}', [PostController::class, 'getPost']);

// Tags Routes
Route::get('/tags/get-all', [TagController::class, 'getTags']);

// Comments Routes
Route::get('/comment/get-all', [PostCommentController::class, 'getComments']);

//Likes
Route::get('/like/get', [PostLikesController::class, 'getLikeValue']);

//User Routes
Route::get('user/info/{slug}', [UserController::class, 'getInfo']);

// Protected Routes
Route::middleware('auth:sanctum')->group(function () {
    // Users
    Route::delete('/signout', [AuthController::class, 'signout']);
    Route::get('/user/signed', [UserController::class, 'signed']);
    Route::get('/user', function (Request $request) {return 'Allowed'.$request->user(); });
    // Post
    Route::post('/post/add', [PostController::class, 'addPost']);
    Route::post('/post/add-image', [PostController::class, 'uploadImage']);
    
    // Comment
    Route::post('/comment/create', [PostCommentController::class, 'createComments']);

    //Likes
    Route::post('/like/change', [PostLikesController::class, 'changeLikeValue']);
});

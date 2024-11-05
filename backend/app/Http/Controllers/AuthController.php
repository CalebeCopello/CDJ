<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Laravel\Socialite\Facades\Socialite;
use Config;

class AuthController extends Controller
{
    public function signup(Request $request)
    {
        $fields = $request->validate([
            'username' => 'required|unique:users|min:3|max:20|regex:/^[a-zA-Z0-9_-]+$/',
            'email' => 'required|unique:users',
            'password' => 'required|min:4|max:20',
        ], [
            'username.required' => 'The username is required.',
            'username.unique' => 'The Username is already taken. Please choose another one',
            'username.min' => 'The Username must be at lest 3 characters long',
            'username.max' => 'The Username must not be longer than 20 characters long',
            'username.regex' => 'The Username can only contain letters, numbers, hyphens, and underscores',
            'email.required' => 'The Email is required',
            'email.unique' => 'The Email is already taken',
            'password.required' => 'The Password is required',
            'password.min' => 'The Password must be 4 or more characters long',
            'password.max' => 'Password must be at most 20 characters long',
        ]);

        $user = User::create($fields);

        $token = $user->createToken($request->username);

        return [
            'info' => $user,
            'token' => $token,
        ];
    }

    public function signin(Request $request)
    {
        $request->validate(
            [
                'email' => 'required|exists:users,email',
                'password' => 'required',
            ],
            [
                'email.required' => 'The Email is required',
                'email.exists' => 'The Email is not registred',
                'password.required' => 'The Password is required',
            ]
        );
        $user = User::where('email', $request->email)->first();

        if (!$user || !Hash::check($request->password, $user->password)) {
            return response()->json([
                'message' => 'Invalid Email or Password.',
            ], 401);
        }

        $token = $user->createToken($user->username);

        return [
            'info' => $user,
            'token' => $token,
        ];
    }

    public function signout(Request $request)
    {
        $request->user()->tokens()->delete();

        return [
            'message' => 'You have signed out.',
        ];
    }

    //Socialite
    //Github

    public function github()
    {
        $github = Socialite::driver('github')->stateless()->user();

        $user = User::firstOrCreate([
            'email' => $github->getEmail(),
        ],
            [
                'username' => $github->getNickName() . uniqid(),
                'email' => $github->getEmail(),
            ]);
        $token = $user->createToken($user->username)->plainTextToken;
        return redirect()->away(config('variables.client_url'))
        ->cookie('CDJAuth','Bearer ' . $token, time() + (365 * 24 * 60 * 60), null, null, true, false);
    }
}

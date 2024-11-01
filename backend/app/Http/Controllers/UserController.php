<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class UserController extends Controller
{
    public function signed(Request $request)
    {
        return ['message' => $request->user()];
    }
}

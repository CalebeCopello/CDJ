<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class PostCommentController extends Controller
{
    public function getComments(Request $request) {
        return response()->json($request, 200);
    }
    
    public function createComments(Request $request) {
        dd($request->user()->username);
        return response()->json($request, 200);
    }
}

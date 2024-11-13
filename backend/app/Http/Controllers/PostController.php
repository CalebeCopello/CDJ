<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Post;

class PostController extends Controller
{
    public function addPost(Request $request) {
        
        if(!$request->user()->is_admin) {
            return response()->json([
                'message' => 'You are not an Admin'
            ], 403);
        }

        $fields = $request->validate([
            'slug' => 'required|unique:posts,slug',
            'title' => 'required|unique:posts,title',
            'body' => 'required',
            'img' => 'required',
        ], [
            'slug.required' => 'The slug is required.',
            'slug.unique' => 'The slug must be unique.',
            'title.required' => 'The title is required.',
            'title.unique' => 'The title must be unique.',
            'body.required' => 'The body text is required',
            'img.required' => 'An image is required',
        ]);

        $fields = array_merge($fields, [ 'user_id' => $request->user()->id, 'is_published' => false]);

        $post = Post::create($fields);

        return response()->json($post, 201);
    }
}

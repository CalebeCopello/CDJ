<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Post;
use Illuminate\Support\Facades\Storage;

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
            'published_at' => 'required',
        ], [
            'slug.required' => 'The slug is required.',
            'slug.unique' => 'The slug must be unique.',
            'title.required' => 'The title is required.',
            'title.unique' => 'The title must be unique.',
            'body.required' => 'The body text is required',
            'img.required' => 'An image is required',
            'published_at.required' => 'A date is required',
        ]);

        $fields = array_merge($fields, [ 'user_id' => $request->user()->id]);

        $post = Post::create($fields);

        return response()->json($post, 201);
    }

    public function uploadImage(Request $request) {

        if(!$request->user()->is_admin) {
            return response()->json([
                'message' => 'You are not an Admin'
            ], 403);
        }

        $request->validate([
            'img' => 'required|image|mimes:jpeg,jpg,gif,png|max:2048'
        ], [
            'img.required' => 'An image is required',
            'img.mimes' => 'The image must be an .jpeg, .jpg, .gif, or .png',
            'img.max' => 'The image must be at most 2MB',
        ]);

        $path = $request->file('img')->store('posts/images', 'public');

        return response()->json([
            'message' => 'upload image successfully',
            'path' => $path
        ], 200);
    }
}

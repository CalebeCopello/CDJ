<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Post;
use Illuminate\Support\Facades\Storage;

class PostController extends Controller
{
    public function addPost(Request $request, PostTagController $postTagController) {
        
        if(!$request->user()->is_admin) {
            return response()->json([
                'message' => 'You are not an Admin'
            ], 403);
        }

        // dd($request);

        $fields = $request->validate([
            'title' => 'required|unique:posts,title',
            'slug' => 'required|unique:posts,slug',
            'published_at' => 'required',
            'tags' => 'required|array',
            'img' => 'required',
            'body' => 'required',
        ], [
            'title.required' => 'The title is required.',
            'title.unique' => 'The title must be unique.',
            'slug.required' => 'The slug is required.',
            'slug.unique' => 'The slug must be unique.',
            'tags.required' => 'Tag(s) is/are required',
            'img.required' => 'An image is required',
            'published_at.required' => 'A date is required',
            'body.required' => 'The body text is required',
        ]);

        $fields = array_merge($fields, [ 'user_id' => $request->user()->id]);

        $post = Post::create($fields);

        $postTagController->addTagsToPost($request, $post);

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

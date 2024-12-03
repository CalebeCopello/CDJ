<?php

namespace App\Http\Controllers;

use App\Models\Post;
use App\Models\Tag;
use Illuminate\Http\Request;

class PostTagController extends Controller
{
    public function addTagsToPost(Request $request, Post $post) {

        $validate = $request->validate([
            'tags' => 'required|array',
            'tags.*' => 'string',
        ], [
            'tags.required' => 'Tag(s) is/are required'
        ]);
        $tagIds = Tag::whereIn('name', $validate['tags'])->pluck('id')->toArray();

        $post->tags()->syncWithoutDetaching($tagIds);

        return response()->json(['message' => 'Tags added successfully'], 200);
    }
}

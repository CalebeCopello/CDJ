<?php

namespace App\Http\Controllers;

use App\Models\PostComment;
use Illuminate\Http\Request;

class PostCommentController extends Controller
{
    public function getComments(Request $request) {
        return response()->json($request, 200);
    }
    
    public function createComments(Request $request) {

        $fields = $request->validate([
            'comment' => 'required|max:2000',
            'post_id' => 'required',
        ], [
            'comment.requite' => 'The comment is required',
            'comment.max' => 'The maximum comment length is 2000 characters'
        ]);
        $fields = array_merge($fields, ['user_id' => $request->user()->id, 'parent_id' => $request->parent_id?? null]);
        $comment = PostComment::create($fields);
        return response()->json($comment, 200);
    }
}

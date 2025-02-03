<?php

namespace App\Http\Controllers;

use App\Models\PostComment;
use App\Models\User;
use Illuminate\Http\Request;

class PostCommentController extends Controller
{
    public function getComments(Request $request) {
        $request->validate([
            'post_id' => 'required|integer',
        ]);
        $comments = PostComment::where("post_id", $request->post_id)->get()->toArray();
        if (!$comments) {
            return response()->json([
                'message' => 'no comments'
            ], 200);
        }
        $users = User::all()->pluck("username", "id")->toArray();
        $return = [];
        foreach($comments as $value) {
            $value["username"] = $users[$value['user_id']];
            $return[] = $value;
        }
        usort($return, fn($a, $b) => $a['id'] <=> $b['id']);
        return response()->json($return, 200);
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

<?php

namespace App\Http\Controllers;

use App\Models\PostComment;
use App\Models\PostLikes;
use App\Models\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
    public function signed(Request $request) {
        return ['message' => $request->user()];
    }

    public function getInfo(Request $request, string $slug) {
        $getPost = 3;
        $getLikes = 5;
        $userInfo = User::whereLike('username', $slug)->first();
        if (!$userInfo) {
            return response()->json(["message" => 'Username not found'],404);
        }
        $commentsInfo = PostComment::where('user_id', $userInfo['id'])->where('is_visible', true)->orderBy('updated_at', 'desc')->take($getPost)->with('post')->get();
        $likesInfo = PostLikes::where('user_id', $userInfo['id'])->orderBy('updated_at', 'desc')->take($getLikes)->with('comment.user', 'comment.post')->get();
        
        $returnComment = [];
        $returnLikes = [];
        if ($commentsInfo->isEmpty()) {
            $returnComment = null;
        }
        if ($likesInfo->isEmpty()) {
            $returnLikes = null;
        }
        foreach($commentsInfo as $value) {
            $returnComment[] = ['comment' => $value['comment'], 'post' => $value['post']['title'], 'date' => $value['created_at']] ;
        }
        foreach($likesInfo as $value) {
            $returnLikes[] = ['value' => $value['like_value'], 'username' => $value['comment']['user']['username'], 'post' => $value['comment']['post']['title'], 'date' => $value['created_at']];
        }

        return response()->json(['user' => $userInfo, 'comments' => $returnComment, 'likes' => $returnLikes], 200);
    }
}

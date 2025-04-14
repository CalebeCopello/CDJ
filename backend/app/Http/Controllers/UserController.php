<?php

namespace App\Http\Controllers;

use App\Models\PostComment;
use App\Models\PostLikes;
use App\Models\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
    public function signed(Request $request)
    {
        return ['message' => $request->user()];
    }

    public function getInfo(string $slug)
    {
        $getPost = 3;
        $getLikes = 5;
        $userInfo = User::whereLike('username', $slug)->first();
        if (!$userInfo) {
            return response()->json(["message" => 'Username not found'], 404);
        }
        $commentsInfo = PostComment::where('user_id', $userInfo['id'])->where('is_visible', true)->orderBy('updated_at', 'desc')->take($getPost)->with('post')->get();
        $likesInfo = PostLikes::where('user_id', $userInfo['id'])->orderBy('updated_at', 'desc')->take($getLikes)->with('comment.user', 'comment.post')->get();

        $returnComment = NULL;
        $returnLikes = NULL;

        if (!$commentsInfo->isEmpty()) {
            $returnComment = [];
            foreach ($commentsInfo as $value) {
                $returnComment[] = ['comment' => $value['comment'], 'post' => $value['post']['title'], 'slug' => $value['post']['slug'], 'date' => $value['created_at']];
            }
        }
        if (!$likesInfo->isEmpty()) {
            $returnLikes = [];
            foreach ($likesInfo as $value) {
                $returnLikes[] = ['value' => $value['like_value'], 'username' => $value['comment']['user']['username'], 'post' => $value['comment']['post']['title'], 'slug' => $value['comment']['post']['slug'], 'date' => $value['created_at']];
            }
        }
        $userInfo['email'] = NULL;
        return response()->json(['user' => $userInfo, 'comments' => $returnComment, 'likes' => $returnLikes], 200);
    }

    public function getSelfInfo(Request $request)
    {
        $userInfo = $request->user();

        $commentsInfo = PostComment::where('user_id', $userInfo['id'])->where('is_visible', true)->orderBy('updated_at', 'desc')->with('post', 'reply.user', 'post.user')->get();
        $likesInfo = PostLikes::where('user_id', $userInfo['id'])->orderBy('updated_at', 'desc')->with('comment.user', 'comment.post.user')->get();

        $returnComment = [];
        $returnLikes = [];
        $likes = 0;
        $dislikes = 0;

        foreach ($commentsInfo as $value) {
            $returnComment[] = [
                'comment' => ['value' => $value['comment'], 'date' => $value['created_at']],
                'reply' => ['username' => $value['reply']['user']['username'] ?? NULL, 'comment' => $value['reply']['comment'] ?? NULL],
                'post' => ['title' => $value['post']['title'], 'slug' => $value['post']['slug'], 'date' => $value['post']['created_at'], 'username' => $value['post']['user']['username']]
            ];
        }
        foreach ($likesInfo as $value) {
            $returnLikes[] = [
                'like' => ['value' => $value['like_value'], 'date' => $value['created_at']],
                'comment' => ['comment' => $value['comment']['comment'], 'username' => $value['comment']['user']['username']],
                'post' => ['slug' => $value['comment']['post']['slug'], 'title' => $value['comment']['post']['title'], 'username' => $value['comment']['post']['user']['username']]
            ];
        }

        return response()->json(['userInfo' => $userInfo, 'commentsInfo' => $returnComment, 'likesInfo' => $returnLikes], 200);
    }
}

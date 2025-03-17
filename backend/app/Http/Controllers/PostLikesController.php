<?php

namespace App\Http\Controllers;

use App\Models\PostLikes;
use Illuminate\Http\Request;

class PostLikesController extends Controller
{
    public function changeLikeValue (Request $request) {

        $fields = $request->validate([
            'like_value' => 'required|in:1,-1',
            'comment_id' => 'required'
        ],[
            'like_value.required' => 'A like_value is required',
            'like_value.in' => 'The like_value must be an interger between 1 and -1',
            'comment_id.required' => 'A comment id is required',
        ]);
        $fields = array_merge($fields, ["user_id" => $request->user()->id]);
        $like = PostLikes::where('user_id', $fields["user_id"])->where('comment_id', $fields['comment_id'])->value('like_value');
        if($like == $fields["like_value"]) {
            PostLikes::where('user_id',$fields["user_id"])->where('comment_id',$fields['comment_id'])->delete();
            return response()->json(['message' => 'Liked/Disliked Removed', 'code' => '0'], 200);
        }
        PostLikes::updateOrCreate(['user_id' => $fields["user_id"], 'comment_id' => $fields['comment_id']], ['like_value' => $fields['like_value']]);
        return response()->json(['message' => 'Liked/Disliked Created or Updated', 'code' => '1'], 200);
    }
}

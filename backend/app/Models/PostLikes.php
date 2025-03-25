<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PostLikes extends Model
{
    use HasFactory;

    protected $table = 'post_likes';

    protected $fillable = ['user_id', 'comment_id', 'like_value'];

    public function user() {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function comment() {
        return $this->belongsTo(PostComment::class, 'comment_id');
    }
}

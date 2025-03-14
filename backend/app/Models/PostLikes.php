<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PostLikes extends Model
{
    use HasFactory;

    protected $table = 'post_likes';

    protected $fillable = ['user_id', 'post_id', 'like_value'];
}

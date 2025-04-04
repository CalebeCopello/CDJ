<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Post extends Model
{
    use HasFactory;

    protected $table = 'posts';

    protected $fillable = [
        'user_id',
        'slug',
        'title',
        'body',
        'img',
        'published_at',
        'is_published',
    ];

    public function tags() {
        return $this->belongsToMany(Tag::class, 'post_tags');
    }

    public function user() {
        return $this->belongsTo(User::class, 'user_id');
    }
}

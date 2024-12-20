<?php

namespace Database\Factories;

use App\Models\Post;
use App\Models\PostComment;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Model>
 */
class PostCommentFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */

    protected $model = PostComment::class;
    
    public function definition(): array
    {
        $userId = User::inRandomOrder()->value('id');
        $postId = Post::inRandomOrder()->value('id');

        return [
            'user_id' => $userId,
            'post_id' => $postId,
            'parent_id' => fake()->boolean(70) ? PostComment::inRandomOrder()->value('id') : null,
            "comment" => fake()->text(255),
        ];
    }
}

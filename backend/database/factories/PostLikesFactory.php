<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\User;
use App\Models\PostComment;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\PostLikes>
 */
class PostLikesFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $userId = User::inRandomOrder()->value('id');
        $commentId = PostComment::inRandomOrder()->value('id');

        return [
            'user_id' => $userId,
            'comment_id' => $commentId,
            'like_value' => fake()->randomElement(['1','-1'])
        ];
    }
}

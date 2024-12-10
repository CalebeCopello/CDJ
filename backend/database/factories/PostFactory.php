<?php

namespace Database\Factories;

use App\Models\Post;
use App\Models\User;
use App\Models\Tag;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Storage;

class PostFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Post::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition(): array
    {
        $userId = User::inRandomOrder()->value('id');

        return [
            'user_id' => $userId,
            'slug' => $this->faker->unique()->slug(),
            'title' => $this->faker->sentence(),
            'body' => $this->faker->paragraphs(3, true),
            'img' => '/posts/images/placeholder.png',
            'published_at' => $this->faker->date(),
        ];
    }
    public function configure(): static
    {
        return $this->afterCreating(function (Post $post) {
            $tags = Tag::inRandomOrder()->take(rand(1, 6))->get();
            $post->tags()->attach($tags);
        });
    }
}

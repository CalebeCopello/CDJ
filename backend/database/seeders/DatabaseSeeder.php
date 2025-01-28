<?php

namespace Database\Seeders;

use App\Models\Post;
use App\Models\PostComment;
use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        User::factory(100)->create();

        Post::factory(3)->create();

        PostComment::factory(10)->create();

        PostComment::factory(10)->withParent()->create();
        PostComment::factory(20)->withParent()->create();
        PostComment::factory(30)->withParent()->create();
        PostComment::factory(20000)->withParent()->create();

        User::factory()->create([
            'username' => 'Calebe',
            'email' => 'test@example.com',
        ]);
    }
}

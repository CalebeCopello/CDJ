<?php

namespace Database\Seeders;

use App\Models\Post;
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

        Post::factory(30)->create();

        // User::factory()->create([
        //     'username' => 'Test User',
        //     'email' => 'test@example.com',
        // ]);
    }
}

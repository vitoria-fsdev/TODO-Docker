<?php

namespace Tests\Unit;

use Tests\TestCase;
use App\Models\User;

class TaskTest extends TestCase
{
    
    public function test_create_task()
{
    $user = User::factory()->create();
    $response = $this->actingAs($user, 'sanctum')->postJson('/api/tasks', [
        'title' => 'Nova Tarefa',
        'priority' => 'high'
    ]);
    $response->assertStatus(201);
}
}

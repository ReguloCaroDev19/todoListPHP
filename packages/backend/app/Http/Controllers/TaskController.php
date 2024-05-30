<?php

namespace App\Http\Controllers;

use App\Models\Task;
use Illuminate\Http\Request;

class TaskController extends Controller
{
 public function index()
    {
        $tasks = Task::all();
        return response()->json($tasks);
    }

    public function store(Request $request)
    {
        $request->validate([
            'titulo' => 'required|string',
            'completed' => 'required|boolean',
        ]);

        Task::create($request->all());
        return response()->json(['message' => 'Tarea creada con éxito'], 201);
    }

    public function show(Task $task)
    {
        return response()->json($task);
    }

    public function update(Request $request, Task $task)
    {
        $request->validate([
            'completed' => 'required|boolean',
        ]);

        $task->update($request->all());
        return response()->json(['message' => 'Tarea actualizada con éxito']);
    }

    public function destroy(Task $task)
    {
        $task->delete();
        return response()->json(['message' => 'Tarea eliminada con éxito']);
    }
}

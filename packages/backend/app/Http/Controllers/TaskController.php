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
        'titulo' => 'required|string|max:80', 
        'completed' => 'required|boolean',
    	], [
        'titulo.max' => 'El campo título no puede tener más de 80 caracteres.', 
    	]);


        Task::create($request->all());
        return response()->json(['message' => 'Tarea creada con éxito'], 201);
    }

    public function show(Task $task)
    {
        return response()->json($task);
    }
public function updateTitle(Request $request, Task $task)
{
    $request->validate([
        'titulo' => 'required|string|max:80', 
    ], [
        'titulo.max' => 'El campo título no puede tener más de 80 caracteres.', 
    ]);

    $task->update(['titulo' => $request->titulo]);
    return response()->json(['message' => 'Título de tarea actualizado con éxito']);
}

public function updateCompleted(Request $request, Task $task)
{
    $request->validate([
        'completed' => 'required|boolean',
    ]);

    $task->update(['completed' => $request->completed]);
    return response()->json(['message' => 'Estado de tarea actualizado con éxito']);
}
    public function destroy(Task $task)
    {
        $task->delete();
        return response()->json(['message' => 'Tarea eliminada con éxito']);
    }
}

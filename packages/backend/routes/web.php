<?php

use Illuminate\Support\Facades\Route;


Route::get('/', function () {
    return view('welcome');
});

use App\Http\Controllers\TaskController;

Route::resource('tasks', TaskController::class);
Route::put('/tasks/{task}/update-title', [TaskController::class, 'updateTitle'])->name('tasks.updateTitle');
Route::put('/tasks/{task}/update-completed', [TaskController::class, 'updateCompleted'])->name('tasks.updateCompleted');

Route::get('/csrf-token', function () {
    return response()->json(['csrf_token' => csrf_token()]);
});

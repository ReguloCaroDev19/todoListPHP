<?php

use Illuminate\Support\Facades\Route;


Route::get('/', function () {
    return view('welcome');
});

use App\Http\Controllers\TaskController;

Route::resource('tasks', TaskController::class);

Route::get('/csrf-token', function () {
    return response()->json(['csrf_token' => csrf_token()]);
});

<?php

use App\Http\Controllers\EventController;
use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Home', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),

    ]);
})->name("home");



Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::inertia('/dashboard', 'Dashboard')->name('dashboard');

    // Route::inertia('/event-management', 'EventManagement')->name('event-management');
    Route::post('/event-management', [EventController::class, 'store'])->name('event-management.store');
    Route::get('/event-management', [EventController::class, 'index'])->name('event-management.index');
    Route::delete('/event-management/{id}', [EventController::class, 'destroy'])->name('event-management.destroy');
});

require __DIR__.'/auth.php';

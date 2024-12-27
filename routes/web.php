<?php

use App\Http\Controllers\ContingentController;
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
    Route::get('/event-management', [EventController::class, 'index'])->name('event-management.index');
    Route::get('/event-management/{event}', [EventController::class, 'show'])->name('event-managmeent.show');
    Route::post('/event-management', [EventController::class, 'store'])->name('event-management.store');
    Route::delete('/event-management/{id}', [EventController::class, 'destroy'])->name('event-management.destroy');

    Route::post('/contingents', [ContingentController::class, 'store'])->name('contingents.store');
    Route::get('/contingents', [ContingentController::class, 'index'])->name('contingents.index');
    Route::delete('/contingents/{id}', [ContingentController::class, 'destroy'])->name('contingents.destroy');
});

require __DIR__.'/auth.php';

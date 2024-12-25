<?php

namespace App\Http\Controllers;

use App\Models\Event;
use Carbon\Carbon;
use Illuminate\Http\Request;

class EventController extends Controller
{
    public function store(Request $request) {
        $fields = $request->validate([
            'name' => ['required'],
            'date' => ['required', 'date'],
            'location' => ['required'],
            'description' => ['required']
        ]);

        $fields['date'] = Carbon::parse($request->date)->setTimezone(config('app.timezone'))->format('Y-m-d');

        Event::create($fields);

        return redirect()->route('event-management')->with('success', 'Event created successfully!');
    }
}

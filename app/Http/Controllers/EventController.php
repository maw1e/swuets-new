<?php

namespace App\Http\Controllers;

use App\Models\Event;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Inertia\Inertia;

class EventController extends Controller
{
    public function index() {
        $events = Event::latest()->paginate(6);

        return Inertia::render('EventManagement/Index', [
            'events' => $events
        ]);
    }

    public function store(Request $request) {
        $fields = $request->validate([
            'name' => ['required'],
            'date' => ['required', 'date'],
            'location' => ['required'],
            'description' => ['required']
        ]);

        $fields['date'] = Carbon::parse($request->date)->setTimezone(config('app.timezone'))->format('Y-m-d');

        Event::create($fields);

        return redirect()->route('event-management.index')->with('success', 'Event created successfully!');
    }

    public function show(Event $event) {
        $contingents = $event->contingents;
        return Inertia::render('EventManagement/ShowEvent', [
            'events' => $event,
            'contingents' => $contingents
        ]);
    }

    public function destroy(Event $event, Request $request) {
        $event = Event::findorFail($request->id);

        $event->delete();

        return redirect()->route('event-management.index')->with('success', 'Event deleted successfully!');
    }
}

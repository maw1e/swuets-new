<?php

namespace App\Http\Controllers;

use App\Models\Contingent;
use App\Models\Event;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;

class ContingentController extends Controller
{
    public function store(Request $request) {
        try {
            
            $fields = $request->validate([
                'event_id' => ['required', 'exists:events,id'],
                'contingents' => ['required', 'array'],
                'contingents.*.name' => ['required', 'max:255'],
                'contingents.*.age' => ['required', 'min:0', 'integer'],
            ]);

            $event = Event::findOrFail($fields['event_id']);

            foreach ($fields['contingents'] as $contingentData) {
                $event->contingents()->create($contingentData);
            }

            return redirect()->back()->with('success', 'Contingents added successfully!');
            
        } catch (\Exception $e) {
            return back()->withErrors([
                'error' => $e->getMessage()
            ]);
        }
    }
}

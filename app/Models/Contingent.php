<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Contingent extends Model
{
    protected $fillable = ['event_id', 'name', 'age',];

    public function event() {
        return $this->belongsTo(Event::class);
    }
}

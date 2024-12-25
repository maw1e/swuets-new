<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Criterion extends Model
{
    protected $fillable = ['event_id', 'name', 'weight'];

    public function event() {
        return $this->belongsTo(Event::class);
    }
}

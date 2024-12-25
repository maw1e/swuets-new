<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Judge extends Model
{
    protected $fillable = ['event_id', 'name', 'email', 'contact'];

    public function event() {
        return $this->belongsTo(Event::class);
    }
}

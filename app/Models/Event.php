<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Event extends Model
{
    protected $fillable = ['name', 'date', 'location', 'description'];

    public function contingents() {
        return $this->hasMany(Contingent::class);
    }

    public function judges() {
        return $this->hasMany(Judge::class);
    }

    public function criteria() {
        return $this->hasMany(Criterion::class);
    }
}

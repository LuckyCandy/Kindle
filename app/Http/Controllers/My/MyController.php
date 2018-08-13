<?php

namespace App\Http\Controllers\My;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class MyController extends Controller
{
    public function permission()
    {
        return response()->json([
            'code' => 200,
            'message' => '',
            'data' => [
                'name' => 'LC'
            ]
        ]);
    }
}

<?php

namespace App\Helpers;

use Illuminate\Validation\ValidationException;
use Illuminate\Support\Facades\Validator;

function customValidateError(string $type, string $message) {
    $validator = Validator::make([], []);
    $validator->errors()->add($type, $message);
    throw new ValidationException($validator);
}
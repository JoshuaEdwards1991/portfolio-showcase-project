<?php
//all code is owned by Joshua Edwards @ quicksilver web ltd. please email Joshua@quicksilverweb.uk, re-use is prohibited
Abstract Class Registry {
    private function __construct() {}
    abstract protected function get($key);
    abstract protected function set($key, $value);
}

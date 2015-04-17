<?php

namespace Model;

class Location extends Model {
	protected static $table = 'location';

	protected $name;
	protected $street;
	protected $city;
	protected $state;
	protected $zip;
	protected $phone;
}
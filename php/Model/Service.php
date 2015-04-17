<?php

namespace Model;

class Service extends Model {
	protected static $table = 'service';

	public static $relations = array(
		'bike' => 'bikeId',
	);

	protected $date;
	protected $bikeId;
	protected $service;
	protected $technician;
	protected $notes;
}
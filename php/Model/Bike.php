<?php

namespace Model;

class Bike extends Model {
	protected static $table = 'bike';

	public static $relations = array(
		'location' => 'locationId',
	);

	protected $start;
	protected $end;
	protected $locationId;
	protected $name;
	protected $serial;
	protected $make;
	protected $model;
	protected $status;
	protected $description;
	protected $frame;
	protected $wheel;
	protected $notes;
	protected $lastServiceDate;

	public function attributes()
	{
		$attributes = parent::attributes();
		$attributes['lastServiceDate'] = $this->lastServiceDate();
		return $attributes;
	}

	public function lastServiceDate()
	{
		$lastServiceDate = null;

		$services = Service::search(array(
			array('bike' => $this->id),
		));

		foreach ($services as $service) {
			if (
				!$lastServiceDate ||
				$service->date > $lastServiceDate
			) {
				$lastServiceDate = $service->date;
			}
		}

		return $lastServiceDate;
	}
}
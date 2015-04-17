<?php

namespace Model;

class ContactInfo extends Model {
	protected static $table = 'contactInfo';

	protected static $relations = array(
		'contact' => 'contactId',
	);

	protected $contactId;
	protected $type;
	protected $category;
	protected $info;
}
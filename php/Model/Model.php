<?php

namespace Model;

use InvalidArgumentException,
	ReflectionClass,
	ReflectionProperty,
	Data\DB,
	Data\DBException;

class Model {
	protected $id;
	protected $created;
	protected $modified;

	private static $types;

	public function __construct(/* mixed */)
	{
		$args = func_get_args();
		$param = array_shift($args);

		if (is_int($param)) {
			$this->loadFromID($param);
		} else if (is_array($param)) {
			$this->load($param);
		}
	}

	public static function search($queries = array(), $options = array())
	{
		$table = static::$table;

		extract(parse_args($options, array(
			'attributes' => false,
		)));

		list($where, $join, $params) = self::parseQueries($queries);

		$db = new DB;
		$query = "SELECT * FROM $table $join $where";
		array_unshift($params, $query);
		$rows = call_user_func_array(array($db, 'query'), $params);

		$results = array();
		foreach ($rows as $row) {
			$results[] = new static($row);
		}

		if ($attributes) {
			$results = static::modelsAttributes($results);
		}

		return $results;
	}

	public static function parseQueries($queries)
	{
		$wheres = $joins = $params = array();

		foreach ($queries as $key => $value) {
			static::parseQuery($key, $value, $wheres, $joins, $params);
		}

		$join = implode(' ', $joins);
		$where = $wheres ? "WHERE ".implode(" AND ", $wheres) : '';

		return array($where, $join, $params);
	}

	public static function parseQuery($key, $value, &$wheres, &$joins, &$params)
	{
		if (array_key_exists($key, static::$relations)) {
			$attribute = static::$relations[$key];
			$wheres[] = "$attribute = ?";
			$params[] = $value;
		}
	}

	protected function loadFromID($id)
	{
		$db = new DB;
		$this->load($db->get_row("SELECT * FROM ".static::$table." WHERE id = ?", $id));
	}

	protected function load($row)
	{
		if (!$row) return;

		$types = $this->getTypes();
		foreach ($row as $name => $value) {
			switch ($types[$name]) {
				case 'int(11) unsigned':
				case 'tinyint(4)':
					$this->$name = intval($value);
					break;

				case 'tinyint(1)':
					$this->$name = (bool) $value;
					break;

				case 'timestamp':
					$this->$name = strtotime($value);
					break;

				default:
					$this->$name = $value;
			}
		}
	}

	public function __get($name)
	{
		if (!$this->accessible($name)) {
			throw new InvalidArgumentException("Invalid property: $name");
		}

		return $this->$name;
	}

	public function __set($name, $value)
	{
		if (!$this->accessible($name)) {
			throw new InvalidArgumentException("Invalid property: $name");
		}

		$this->$name = $value;
	}

	public function __isset($name)
	{
		if (!$this->accessible($name)) {
			throw new InvalidArgumentException("Invalid property: $name");
		}

		return isset($this->$name);
	}

	protected function accessible($name)
	{
		return property_exists($this, $name) && !self::isPrivate($name);
	}

	protected static function isPrivate($name)
	{
		return substr($name, 0, 1) == '_';
	}

	public function attributes()
	{
		$attributes = array();
		foreach (get_object_vars($this) as $name => $value) {
			if ($this->accessible($name)) {
				$attributes[$name] = $value;
			}
		}
		return $attributes;
	}

	public static function modelsAttributes($models)
	{
		$attributes = array();
		foreach ($models as $model) {
			$attributes[] = $model->attributes();
		}
		return $attributes;
	}

	public function save()
	{
		$db = new DB();
		$fields = $this->getFields();

		$params = array_values($fields);

		$method = $this->id ? 'getUpdateQuery' : 'getInsertQuery';
		$query = call_user_func(array($this, $method), $fields);
		array_unshift($params, $query);

		try {
			call_user_func_array(array($db, 'query'), $params);
		} catch(DBException $e) {
			if (DEV) debug($e->getMessage());
			return false;
		}

		if (!$this->id) {
			$this->id = $db->get_insert_id();
			$this->loadFromID($this->id);
		}

		return true;
	}

	public function delete()
	{
		$db = new DB();
		$db->query("DELETE FROM ".static::$table." WHERE id = ?", $this->id);
	}

	protected function getUpdateQuery($fields)
	{
		$pairs = array();
		foreach ($fields as $name => $value) {
			$pairs[] = "$name = ?";
		}
		$pairs = implode(', ', $pairs);

		return "UPDATE ".static::$table." SET $pairs WHERE id = $this->id";
	}

	protected function getInsertQuery($fields)
	{
		$fieldNames = implode(', ', array_keys($fields));
		$qmarks = implode(', ', array_fill(0, count($fields), '?'));

		return "INSERT INTO ".static::$table." (created, modified, $fieldNames) VALUES(CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, $qmarks)";
	}

	protected function getFields()
	{
		$reflect = new ReflectionClass($this);
		$properties = $reflect->getProperties();

		$fields = array();
		foreach ($properties as $property) {
			if ($property->isStatic()) continue;
			$name = $property->name;
			if ($name[0] == '_') continue;
			if (in_array($name, array('id', 'created', 'modified'))) continue;
			$fields[$name] = $this->$name;
		}

		$types = $this->getTypes();
		foreach ($fields as $name => &$value) {
			if (!isset($types[$name])) continue;
			switch ($types[$name]) {
				case 'timestamp':
					$value = $value ? date('Y-m-d H:i:s', $value) : null;
					break;
			}
		}

		return $fields;
	}

	protected function getTypes()
	{
		if (!isset(self::$types[static::$table])) {
			$db = new DB();
			$fields = $db->query("DESCRIBE ".static::$table);
			self::$types[static::$table] = $fields;

			$types = array();
			foreach ($fields as $field) {
				$types[$field['Field']] = $field['Type'];
			}
			self::$types[static::$table] = $types;
		}

		return self::$types[static::$table];
	}
}
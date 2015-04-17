<?php

namespace Data;

use PDO, PDOException;

class DB {
	protected $affected_rows;
	protected $insert_id;

	protected static $db;

	protected static function getDB()
	{
		if (!self::$db) {
			try {
				self::$db = new PDO(
					'mysql:dbname='.DB_NAME.';host='.DB_HOST,
					DB_USER,
					DB_PASS
				);
			} catch (PDOException $e) {
				throw new DBException('database connection failure');
			}
		}

		return self::$db;
	}

	public function query(/* mixed */)
	{
		$db = self::getDB();

		$params = func_get_args();
		$query = array_shift($params);

		// handle case where params are passed as an array
		if (isset($params[0]) && is_array($params[0])) {
			$params = $params[0];
		}

		try {
			$statement = $db->prepare($query);
		} catch (PDOException $e) {
			$info = $db->errorInfo();
			throw new DBException($info[2]);
		}

		$statement->execute($params);

		$results = array();
		while ($row = $statement->fetch(PDO::FETCH_ASSOC)) {
			$results[] = $row;
		}

		$this->affected_rows = $statement->rowCount();
		$this->insert_id = $db->lastInsertId();

		if (DEBUG_JSON) debug($query, $params, $this->affected_rows, $this->insert_id, $results);

		return $results;
	}

	public function get_insert_id()
	{
		return $this->insert_id;
	}

	public function get_row(/* mixed */)
	{
		$results = call_user_func_array(
			array($this, 'query'),
			func_get_args()
		);

		return $results ? $results[0] : null;
	}

	public function get_value(/* mixed */)
	{
		$params = func_get_args();
		$field = array_shift($params);

		$row = call_user_func_array(
			array($this, 'get_row'),
			$params
		);

		return $row && isset($row[$field]) ? $row[$field] : null;
	}

	public function get_one(/* mixed */)
	{
		$row = call_user_func_array(
			array($this, 'get_row'),
			func_get_args()
		);

		return $row ? array_shift($row) : null;
	}

	public function get_column(/* mixed */)
	{
		$rows = call_user_func_array(
			array($this, 'query'),
			func_get_args()
		);

		if (!$rows || !$rows[0]) return null;

		$column = array();
		foreach ($rows as $row) {
			$values = array_values($row);
			$column[] = $values[0];
		}

		return $column;
	}

	public function qmarks($params)
	{
		$qmarks = array_fill(0, count($params), '?');
		return implode(',', $qmarks);
	}
}
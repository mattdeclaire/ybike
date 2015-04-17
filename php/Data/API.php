<?php

namespace Data;

class API {
	public function outputResponse()
	{
		if (!DEBUG_JSON) {
			header("Cache-Control: no-store, no-cache, must-revalidate, max-age=0");
			header("Cache-Control: post-check=0, pre-check=0", false);
			header("Pragma: no-cache");
			header('content-type: application/json');
		}

		// sleep(2);

		$request = $this->getRequest();
		echo json_encode($this->getResponse($request));
	}

	public function getRequest()
	{
		$request = new APIRequest;

		$request->data = json_decode(file_get_contents('php://input'), true);
		$request->method = $_SERVER['REQUEST_METHOD'];
		$request->query = $_GET;

		$path = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
		$path = explode('/', preg_replace("/\/api\//", '', $path));

		$request->model = array_shift($path);
		$request->id = intval(array_shift($path));
		$request->attribute = array_shift($path);

		return $request;
	}

	public function getResponse($request)
	{
		switch ($request->model) {
			case 'bike': $request->model = 'Bike'; break;
			case 'contact': $request->model = 'Contact'; break;
			case 'contactInfo': $request->model = 'ContactInfo'; break;
			case 'location': $request->model = 'Location'; break;
			case 'service': $request->model = 'Service'; break;
			case 'user': $request->model = 'User'; break;
			default: return array('error' => "unknown model");
		}
		$request->model = "Model\\$request->model";

		switch ($request->method) {
			case 'GET': $response = $this->get($request); break;
			case 'PUT': $response = $this->put($request); break;
			case 'POST': $response = $this->post($request); break;
			case 'DELETE': $response = $this->delete($request); break;
			default: return array('error' => "unknown method");
		}

		return $response;
	}

	protected function get($request)
	{
		if ($request->id) {
			$obj = new $request->model($request->id);
			$response = $obj->attributes();
		} else {
			$func = array($request->model, 'search');
			$args = array(
				$request->query,
				array('attributes' => true)
			);
			$response = call_user_func_array($func, $args);
		}

		return $response;
	}

	protected function put($request)
	{
		$obj = new $request->model($request->id);
		if (!$obj->id) return array('error' => "unknown object");

		$original = $obj->attributes();

		foreach ($request->data as $key => $value) {
			$obj->$key = $value;
			$changed[$key] = $value;
		}

		$obj->save();

		return array_diff_assoc($obj->attributes(), $original);
	}

	protected function post($request)
	{
		$obj = new $request->model();

		foreach ($request->data as $key => $value) {
			$obj->$key = $value;
		}

		$obj->save();

		return $obj->attributes();
	}

	protected function delete($request)
	{
		$obj = new $request->model($request->id);
		if ($obj->id) $obj->delete();
	}
}
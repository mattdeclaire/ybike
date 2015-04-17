<?php

namespace Model;

class User extends Model {
	protected static $table = 'user';

	protected $lastSignin;
	protected $email;
	protected $password;
	protected $name;
	protected $role;
	protected $resetPassword;
}
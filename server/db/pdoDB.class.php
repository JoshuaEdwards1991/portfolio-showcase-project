<?php
//all code is owned by Joshua Edwards @ quicksilver web ltd. please email Joshua@quicksilverweb.uk, re-use is prohibited
require_once '../server/config/setEnv.php';
require_once '../server/class/ApplicationRegistry.class.php';

class pdoDB {
  private static $dbConnection = null;

  private function __construct() {}

  private function __clone() {}

  public static function getConnection() {

    if( !self::$dbConnection ) {
      try {
        $dns = ApplicationRegistry::getDNS();
        $username = ApplicationRegistry::getUsername();
        $password = ApplicationRegistry::getPassword();
        self::$dbConnection = new PDO($dns, $username, $password);
        self::$dbConnection->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

      }
      catch( PDOException $e ) {
        'SQL ERROR: ' . $e->getMessage();
      }
    }

    return self::$dbConnection;
  }
}

?>

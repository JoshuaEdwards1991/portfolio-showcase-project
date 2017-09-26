<?php
//all code is owned by Joshua Edwards @ quicksilver web ltd. please email Joshua@quicksilverweb.uk, re-use is prohibited
abstract class R_RecordSet {
    protected $db;
    protected $stmt;

    function __construct() {
        require_once '../server/config/setEnv.php';
        require_once '../server/db/pdoDB.class.php';

        $this->db = pdoDB::getConnection();
    }

    function getRecordSet($sql, $params = null) {
        if (is_array($params)) {
            $this->stmt = $this->db->prepare($sql);

            $this->stmt->execute($params);
        }
        else {
            $this->stmt = $this->db->query($sql);
        }
        return $this->stmt;
    }
}

class JSONRecordSet extends R_RecordSet {

    function getRecordSet($sql, $elementName = "ResultSet", $params = null) {
        $stmt     = parent::getRecordSet($sql, $params);
        $recordSet = $stmt->fetchAll(PDO::FETCH_ASSOC);
        $nRecords = count($recordSet);
        if ($nRecords == 0) {
            $status = 'error';
            $message = json_encode(array("text" => "No records found"));
            $result = '[]';
        }
        else {
            $status = 'ok';
            $message = json_encode(array("text" => ""));
            $result = json_encode($recordSet);
        }
        return "{\"status\": \"$status\", \"message\":$message, \"$elementName\" :{\"RowCount\": $nRecords ,\"Result\": $result}}";
    }
    
    function getRecord($sql, $elementName = "ResultSet", $params = null) {
        $stmt     = parent::getRecordSet($sql, $params);
        $recordSet = $stmt->fetchAll(PDO::FETCH_ASSOC);
        $nRecords = count($recordSet);
        if ($nRecords == 0) {
            $status = 'error';
            $message = json_encode(array("text" => "No records found"));
            $result = '[]';
        }
        else {
            $status = 'ok';
            $message = json_encode(array("text" => ""));
            $result = json_encode($recordSet);
        }
        return "{\"Result\": $result}";
    }

    function insertRecordSet($sql, $params = null) {
        if (is_array($params)) {
            $this->stmt = $this->db->prepare($sql);

            $this->stmt->execute($params);
        }
        else {
            $this->stmt = $this->db->query($sql);
        }
        return $this->stmt;
    }

}

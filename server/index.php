<?php
//all code is owned by Joshua Edwards @ quicksilver web ltd. please email Joshua@quicksilverweb.uk, re-use is prohibited
require_once '../server/config/setEnv.php';
require_once '../server/db/pdoDB.class.php';
require_once '../server/class/JSON_RecordSet.class.php';

//case vars
$action = isset($_REQUEST['action']) ? $_REQUEST['action'] : null;
$subject = isset($_REQUEST['subject']) ? $_REQUEST['subject'] : null;

//foreach($_REQUEST as $key  => $val){
//  $$key = $val;
//}

//user vars
$userID = isset($_REQUEST['userid']) ? $_REQUEST['userid'] : null;
$email = isset($_REQUEST['email']) ? $_REQUEST['email'] : null;
$password = isset($_REQUEST['password']) ? $_REQUEST['password'] : null;

//customer vars
$name = isset($_REQUEST['name']) ? $_REQUEST['name'] : null;
$number = isset($_REQUEST['number']) ? $_REQUEST['number'] : null;
$businessname = isset($_REQUEST['businessname']) ? $_REQUEST['businessname'] : null;

//contact
$message = isset($_REQUEST['message']) ? $_REQUEST['message'] : null;

//news
$newsID = isset($_REQUEST['newsid']) ? $_REQUEST['newsid'] : null;
$title = isset($_REQUEST['title']) ? $_REQUEST['title'] : null;
$description = isset($_REQUEST['description']) ? $_REQUEST['description'] : null;

//quote
$quote = isset($_REQUEST['quote']) ? $_REQUEST['quote'] : null;
$config = isset($_REQUEST['config']) ? $_REQUEST['config'] : null;


if (empty($action)) {
    if ((($_SERVER['REQUEST_METHOD'] == 'POST') || ($_SERVER['REQUEST_METHOD'] == 'PUT') || ($_SERVER['REQUEST_METHOD'] == 'DELETE')) && (strpos($_SERVER['CONTENT_TYPE'], 'application/json') !== false)) {
        $input = json_decode(file_get_contents('php://input'), true);
        $action = isset($input['action']) ? $input['action'] : null;
        $subject = isset($input['subject']) ? $input['subject'] : null;
        $data = isset($input['data']) ? $input['data'] : null;
    }
}

$route = $action . ucfirst($subject);

$db = ApplicationRegistry::DB();
//var_dump($db);


header("Content-Type: application/json");

switch ($route) {

    case 'loginUser':
        $email = strtolower($email);
        $email = $db->quote($email);

        $hash = hash('sha256', $password);
        $hash = $db->quote($hash);

        $sqlUser = "SELECT * FROM `user` where email = $email and password = $hash";

        $rs = new JSONRecordSet();

        $retval = $rs->getRecordSet($sqlUser);

        $jsonD = json_decode($retval);
        if ($jsonD->ResultSet->RowCount != 0) {
            $_SESSION["user"] = 1;
        }

        echo $retval;

        break;

    //unused functionality
    case 'logoutUser':

        $_SESSION["user"] = 0;
        session_unset();
        session_destroy();
        echo 'User Successfully Logged Out';

        break;


    //Newsletter sign up
    case 'insertCustomer':

        $email = strtolower($email);
        $email = $db->quote($email);
        $name = $db->quote($name);
        $number = $db->quote($number);
        $businessname = $db->quote($businessname);

        $sqlInsertCustomer = "INSERT INTO `customer` (`id`, `email`, `name`, `number`, `businessname`)
                        VALUES (NULL, $email, $name, $number, $businessname);";

        $rs = new JSONRecordSet();

        $retval = $rs->insertRecordSet($sqlInsertCustomer);

        echo 1;

        break;


    //contact form and customer sign up
    case 'insertCustomercontact':

        $email = strtolower($email);
        $email = $db->quote($email);
        $name = $db->quote($name);
        $number = $db->quote($number);
        $businessname = $db->quote($businessname);

        $sqlInsertCustomer = "INSERT INTO `customer` (`id`, `email`, `name`, `number`, `businessname`)
                        VALUES (NULL, $email, $name, $number, $businessname);";

        $rs = new JSONRecordSet();

        $retval = $rs->insertRecordSet($sqlInsertCustomer);

        //richellestocks@sos-stations.co.uk
        $to = "Joshua@QuicksilverWeb.uk";
        $subject = 'Customer Enquiry';
        $message = $message;
        $headers = 'MIME-Version: 1.0' . "\r\n";
        $headers .= 'Content-type: text/html; charset=iso-8859-1' . "\r\n";
        $headers .= "From: System Admin \r\n" . "X-Mailer: php" . "\r\n";
        $from = "-r $email";
        mail($to, $subject, $message, $headers, $from);

        echo 1;

        break;


    case 'listNews':

        $sqlUsers = "SELECT n.id, n.title, n.description, p.picturefilename, p.picturename
                     FROM news n, picture p
                     where n.pictureid = p.id
                     ORDER BY n.id DESC;";

        $rs = new JSONRecordSet();

        $retval = $rs->getRecordSet($sqlUsers);

        echo $retval;

        break;


    case 'deleteNews':

        if ($_SESSION["user"] == 1) {
            $rs = new JSONRecordSet();

            $sqlDeleteNewsPicture = "DELETE FROM picture "
                    . "WHERE id = (select pictureid from news where id = $newsID);";
            $rs->insertRecordSet($sqlDeleteNewsPicture);

            $sqlDeleteNews = "DELETE FROM news WHERE id = $newsID;";
            $rs->insertRecordSet($sqlDeleteNews);

            echo 1;
        }

        break;



    case 'insertNews':

        if ($_SESSION["user"] == 1) {

            if (isset($_FILES['file'])) {
                $rs = new JSONRecordSet();
                $temp = explode(".", $_FILES["file"]["name"]);
                $file_name = round(microtime(true)) . '.' . end($temp);
                $file_tmp = $_FILES['file']['tmp_name'];
                move_uploaded_file($file_tmp, "images/" . $file_name);
                $imageURL = "images/" . $file_name;
                $imageURL = $db->quote($imageURL);
                $file_name = $db->quote($file_name);
                $sqlImage = "INSERT INTO picture (`id`, `picturefilename`, `picturename`) "
                        . "VALUES (NULL, $imageURL, $file_name);";
                $rs->insertRecordSet($sqlImage);
                $imageID = $db->lastInsertId();
                $imageID = $db->quote($imageID);
            }

            $title = $db->quote($title);
            $description = $db->quote($description);
            $sqlInsertUser = "INSERT INTO news (`id`, `title`, `description`, `pictureid`)
                                  VALUES (NULL, $title, $description, $imageID);";

            $rs = new JSONRecordSet();

            $retval = $rs->insertRecordSet($sqlInsertUser);

            echo 1;
        }

        break;

    case 'editNews':

        if ($_SESSION["user"] == 1) {

            $imageID = 0;

            if (isset($_FILES['file'])) {
                $rs = new JSONRecordSet();
                $temp = explode(".", $_FILES["file"]["name"]);
                $file_name = round(microtime(true)) . '.' . end($temp);
                $file_tmp = $_FILES['file']['tmp_name'];
                move_uploaded_file($file_tmp, "images/" . $file_name);
                $imageURL = "images/" . $file_name;
                $imageURL = $db->quote($imageURL);
                $file_name = $db->quote($file_name);
                $sqlImage = "INSERT INTO picture (`id`, `picturefilename`, `picturename`) "
                        . "VALUES (NULL, $imageURL, $file_name);";
                $rs->insertRecordSet($sqlImage);
                $imageID = $db->lastInsertId();
                var_dump($imageID);
            }

            $title = $db->quote($title);
            $description = $db->quote($description);

            if ($imageID != 0) {
                $imageID = $db->quote($imageID);
                $sqlUpdateNews = "UPDATE `news` SET `title` = $title, `description` = $description, `pictureid` = $imageID WHERE `news`.`id` = $newsID;";
                var_dump($sqlUpdateNews);  
            } else {
                $sqlUpdateNews = "UPDATE `news` SET `title` = $title, `description` = $description WHERE `news`.`id` = $newsID;";
                var_dump($sqlUpdateNews);
            }
            
            $rs = new JSONRecordSet();
            $retval = $rs->insertRecordSet($sqlUpdateNews);

            echo 1;
        }

        break;


    //contact form and customer sign up
    case 'insertQuote':

        //add customer to DB
        $emailstl = strtolower($email);
        $emailQ = $db->quote($emailstl);
        $nameQ = $db->quote($name);
        $numberQ = $db->quote($number);
        $businessnameQ = $db->quote($businessname);
        $sqlInsertCustomer = "INSERT INTO `customer` (`id`, `email`, `name`, `number`, `businessname`)
                        VALUES (NULL, $emailQ, $nameQ, $numberQ, $businessnameQ);";
        $rs = new JSONRecordSet();
        $retval = $rs->insertRecordSet($sqlInsertCustomer);

        //email to richelle
        //richellestocks@sos-stations.co.uk
        $to = "Joshua@QuicksilverWeb.uk";
        $subject = 'Customer Enquiry - Custom Quote';
        $message = "$name with email address $email from company $businessname have said $message and are interested in config/colour $config and items $quote";
        $headers = 'MIME-Version: 1.0' . "\r\n";
        $headers .= 'Content-type: text/html; charset=iso-8859-1' . "\r\n";
        $headers .= "From: System Admin \r\n" . "X-Mailer: php" . "\r\n";
        $from = "-r $email";
        mail($to, $subject, $message, $headers, $from);

        echo 1;

        break;


    default:
        echo '{"status":"error", "message":{"text": "default no action taken"}}';
        break;
}

?>

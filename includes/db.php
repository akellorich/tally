   <?php 
    session_start();
    require_once("browser.php");
    $sql='';
    class db{
        private $servername;
        private $username;
        private $password;
        private $dbname;
        private $charset;
        public $userid;
        public $platform;

        public function __construct(){
            $this->userid=!isset($_SESSION['userid'])?1:$_SESSION['userid'];
            $this->platform=json_encode(getBrowserInfo());
        }
              
        public function connect(){

            $this->servername="localhost";
            $this->username="root";
            $this->password="";
            $this->charset="utf8mb4"; 
            $this->dbname='tally';

            // $this->servername="localhost";
            // $this->username="projemic";
            // $this->password="qWl80d1V3:TE";
            // $this->charset="utf8mb4"; 
            // $this->dbname='projemic_tally';

            try{
                $dsn="mysql:host=".$this->servername.";dbname=".$this->dbname.";charset=".$this->charset;
                $pdo=new PDO($dsn,$this->username,$this->password);
                $pdo->setAttribute(PDO::ATTR_ERRMODE,PDO::ERRMODE_EXCEPTION);
                return $pdo;
            }catch(PDOException $e){
                echo "Connection failed: ".$e->getMessage();
            }
        }

        public function mySQLDate($date){
            $date = DateTime::createFromFormat('d-M-Y', $date);
            return $date->format('Y-m-d');
        }

        public function getData($sql){
            return $this->connect()->query($sql);
        }

        public function getJSON($sql){
            $rst=$this->getData($sql);
            return json_encode($rst->fetchAll(PDO::FETCH_ASSOC));
        }

        public function uniqidReal($lenght = 13) {
            // uniqid gives 13 chars, but you could adjust it to your needs.
            if (function_exists("random_bytes")) {
                $bytes = random_bytes(ceil($lenght / 2));
            } elseif (function_exists("openssl_random_pseudo_bytes")) {
                $bytes = openssl_random_pseudo_bytes(ceil($lenght / 2));
            } else {
                throw new Exception("no cryptographically secure random function available");
            }
            return substr(bin2hex($bytes), 0, $lenght);
        }
    }
?>
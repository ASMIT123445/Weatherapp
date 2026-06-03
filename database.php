 <!DOCTYPE html>
 <html lang="en">

 <body>
     <?php

        $db_host = "localhost";
        $db_name = "weather";
        $db_user = "root";
        $db_password = "";

        $conn = mysqli_connect($db_host, $db_user, $db_password, $db_name);
        echo ("printed successfully");
        if (mysqli_connect_error()) {
            echo mysqli_connect_error();
            exit;
        }
        ?>

 </body>

 </html>
<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = $_POST['name'];
    $address = $_POST['address'];
    $size = $_POST['size'];
    $color = $_POST['color'];
    $delivery = $_POST['delivery'];

    // You could email this data, save it to a database, etc.
    echo "Order Received: $name, $address, Size: $size, Color: $color, Delivery: $delivery";
}
?>

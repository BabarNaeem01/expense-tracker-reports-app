<?php
require "db.php";
$sql = "SELECT month_name, total FROM monthly_spending ORDER BY month_number ASC";
$result = $connection->query($sql);
$report = [];
while ($row = $result->fetch_assoc()) {
    $report[] = $row;
}
echo json_encode($report);
?>

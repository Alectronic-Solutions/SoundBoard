<?php
header('Content-Type: application/json');
$files = glob("*.mp3");
echo json_encode($files);
?>

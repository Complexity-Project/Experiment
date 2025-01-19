<?php
  if(isset($_POST["action"]))
  {
    if($_POST["action"] == "fetch")
    {
      $num = count(glob("./data/" . "*"));
      echo $num;
    }
  }
?>
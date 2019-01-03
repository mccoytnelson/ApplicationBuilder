delete from answered WHERE completed_id = $1;
delete from completed where completed_id = $1;

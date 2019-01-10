select SUM(cast(points as int)) as total from answered where completed_id = $1

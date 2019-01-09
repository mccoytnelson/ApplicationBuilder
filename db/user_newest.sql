SELECT *
FROM completed
where account_id = $1
order by timestamp asc
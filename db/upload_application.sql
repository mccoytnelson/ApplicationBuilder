insert into completed
(
     listing_id,account_id
)
values
(
    $1,$2
)
returning *;


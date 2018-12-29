insert into answered
(
     completed_id,question_id,answer,points
)
values
(
    $1,$2,$3,$4
)
returning *;


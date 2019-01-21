delete from answered WHERE question_id IN (select question_id from question where listing_id = $1);
delete from completed where listing_id = $1;
delete from choice where question_id IN (select question_id from question where listing_id = $1);
delete from question where listing_id = $1;
delete from listing where listing_id = $1;
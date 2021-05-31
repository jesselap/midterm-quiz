SELECT quizes.id, title, created_at, categories.type as category, users.id as creator
FROM quizes
JOIN categories ON quizes.category_id = categories.id
JOIN users ON quizes.owner_id = users.id
WHERE users.id = 1;

SELECT *
FROM attempts
WHERE attempts.user_id = 1;

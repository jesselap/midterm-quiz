-- SELECT quizes.id, title, created_at, categories.type as category, score
-- FROM attempts
-- JOIN quizes ON attempts.quiz_id = quizes.id
-- JOIN categories ON quizes.category_id = categories.id
-- WHERE attempts.user_id = 1

-- SELECT quiz_id, AVG(score) as avg_score
-- FROM attempts
-- WHERE quiz_id = 1
-- GROUP BY quiz_id;

-- SELECT quizes.id, title, categories.type as category, AVG(score)
-- FROM quizes
-- JOIN attempts ON quizes.id = quiz_id
-- JOIN categories ON quizes.category_id = categories.id
-- WHERE category_id = 2
-- GROUP BY quizes.id, categories.type;

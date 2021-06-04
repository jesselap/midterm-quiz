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

SELECT ROUND(AVG(score)) as avg_score
FROM attempts
WHERE quiz_id = 1;

-- SELECT user_id, MAX(score), COUNT(score) as total_attempts
-- FROM attempts
-- WHERE quiz_id = 1 AND user_id = 1
-- GROUP BY user_id;

-- SELECT user_id, MAX(score) as highest_score, COUNT(score) as total_attempts, (SELECT ROUND(AVG(score))
-- FROM attempts
-- WHERE quiz_id = 1) as Avg_score_all_users
-- FROM attempts
-- WHERE quiz_id = 1 AND user_id = 1
-- GROUP BY user_id;

-- SELECT quizes.id, categories.type as category, COALESCE((SELECT ROUND(AVG(score))
-- FROM attempts WHERE quiz_id = quizes.id), 0) as avg_score
-- FROM quizes
-- JOIN categories ON quizes.category_id = categories.id
-- WHERE public  = true;

-- SELECT quizes.id, categories.type as category, ROUND(AVG(score))as avg_score
-- FROM quizes
-- LEFT JOIN attempts ON quizes.id = attempts.quiz_id
-- JOIN categories ON quizes.category_id = categories.id
-- WHERE quizes.public = true
-- GROUP BY quizes.id, categories.type
-- ORDER BY avg_score DESC;

-- SELECT quizes.id, questions.question
-- FROM quizes
-- JOIN questions ON quizes.id = quiz_id
-- WHERE quizes.id = 15;
-- SELECT quizes.id, title
-- FROM quizes;

-- SELECT quizes.id, title, image_url, created_at, public, categories.type as category, COALESCE((SELECT ROUND(AVG(score))
-- FROM attempts WHERE quiz_id = quizes.id), 0) as avg_score
-- FROM quizes
-- JOIN categories ON quizes.category_id = categories.id
-- WHERE categories.type LIKE '%Geography%';

-- SELECT quizes.id, title
-- FROM quizes
-- JOIN categories ON categories.id = quizes.category_id
-- WHERE categories.type LIKE '%cience';

-- SELECT quizes.id, title, image_url, created_at, public, categories.type as category, COALESCE((SELECT ROUND(AVG(score))
-- FROM attempts WHERE quiz_id = quizes.id), 0) as avg_score
-- FROM quizes
-- JOIN categories ON quizes.category_id = categories.id
-- WHERE public  = true AND
-- categories.type LIKE '%Science%'


-- SELECT quizes.id, title, created_at, categories.type as category, (SELECT ROUND(AVG(score), COUNT(*))
-- FROM attempts WHERE quiz_id = quizes.id) as avg_score
-- FROM quizes
-- JOIN categories ON quizes.category_id = categories.id
-- WHERE public  = true
-- ORDER BY
-- LIMIT 12;

-- SELECT quizes.id, created_at, categories.type as category, ROUND(AVG(score))as avg_score, COUNT(attempts.*) as total_attempts
-- FROM quizes
-- LEFT JOIN attempts ON quizes.id = attempts.quiz_id
-- JOIN categories ON quizes.category_id = categories.id
-- WHERE quizes.public = true
-- GROUP BY quizes.id, categories.type
-- ORDER BY RANDOM() DESC
-- LIMIT 12;

-- SELECT quizes.id, title, categories.type as category,
-- ROUND(AVG(score))as avg_score, COUNT(attempts.*) as total_attempts,
-- (SELECT COUNT(*) FROM questions WHERE questions.quiz_id = quizes.id) as total_questions
-- FROM quizes
-- LEFT JOIN attempts ON quizes.id = attempts.quiz_id
-- JOIN categories ON quizes.category_id = categories.id
-- JOIN questions ON questions.quiz_id = quizes.id
-- WHERE quizes.public = true
-- GROUP BY quizes.id, categories.type
-- ORDER BY total_attempts DESC
-- LIMIT 12;

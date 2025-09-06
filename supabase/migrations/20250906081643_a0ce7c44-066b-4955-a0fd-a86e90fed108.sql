-- Populate top_stories table with sample data
INSERT INTO top_stories (article_id, source_table, is_breaking, display_order) VALUES
-- Breaking news
(1, 'case_comments', true, 1),
-- Regular top stories
(2, 'legal_updates', false, 2),
(3, 'legal_updates', false, 3),
(2, 'blogs', false, 4),
(3, 'blogs', false, 5),
(2, 'case_comments', false, 6),
(3, 'case_comments', false, 7);
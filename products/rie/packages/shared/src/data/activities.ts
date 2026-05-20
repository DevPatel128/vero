// ─────────────────────────────────────────────────────────
// RIE Activity Catalogs
// Comprehensive activity lists for each domain
// Users pick what they do — no compulsory activities
// ─────────────────────────────────────────────────────────

export interface Activity {
  id: string;
  name: string;
  category: string;
  difficulty: 'easy' | 'medium' | 'hard' | 'extreme';
  minDuration?: number;        // minutes
  proofTypes: string[];        // accepted proof methods
  description: string;
  icon: string;
  popular: boolean;            // top activities highlighted
}

// ── FITNESS ─────────────────────────────────────────────

export const FITNESS_CATEGORIES = [
  'Cardio', 'Strength', 'HIIT', 'Yoga & Flexibility', 'Sports',
  'Martial Arts', 'Swimming', 'Cycling', 'CrossFit', 'Calisthenics',
  'Dance', 'Climbing', 'Rowing', 'Outdoor',
] as const;

export const FITNESS_ACTIVITIES: Activity[] = [
  // ── Cardio ──
  { id: 'running', name: 'Running', category: 'Cardio', difficulty: 'medium', minDuration: 20, proofTypes: ['device', 'api'], description: 'Outdoor or treadmill running', icon: 'running', popular: true },
  { id: 'jogging', name: 'Jogging', category: 'Cardio', difficulty: 'easy', minDuration: 20, proofTypes: ['device', 'api'], description: 'Light-pace running', icon: 'running', popular: true },
  { id: 'sprints', name: 'Sprint Training', category: 'Cardio', difficulty: 'hard', minDuration: 15, proofTypes: ['device', 'api'], description: 'Interval sprint sessions', icon: 'running', popular: false },
  { id: 'trail_running', name: 'Trail Running', category: 'Cardio', difficulty: 'hard', minDuration: 25, proofTypes: ['device', 'api'], description: 'Off-road trail running', icon: 'mountain', popular: false },
  { id: 'walking_brisk', name: 'Brisk Walking', category: 'Cardio', difficulty: 'easy', minDuration: 30, proofTypes: ['device', 'api'], description: 'Power walking at elevated heart rate', icon: 'walking', popular: true },
  { id: 'stair_climbing', name: 'Stair Climbing', category: 'Cardio', difficulty: 'medium', minDuration: 15, proofTypes: ['device', 'video'], description: 'StairMaster or real stairs', icon: 'stairs', popular: false },
  { id: 'jump_rope', name: 'Jump Rope', category: 'Cardio', difficulty: 'medium', minDuration: 15, proofTypes: ['device', 'video'], description: 'Skipping rope workout', icon: 'rope', popular: true },
  { id: 'elliptical', name: 'Elliptical', category: 'Cardio', difficulty: 'easy', minDuration: 20, proofTypes: ['device'], description: 'Elliptical machine training', icon: 'elliptical', popular: false },

  // ── Strength ──
  { id: 'weightlifting', name: 'Weightlifting', category: 'Strength', difficulty: 'medium', minDuration: 20, proofTypes: ['device', 'video', 'image_metadata'], description: 'Free weights and machines', icon: 'dumbbell', popular: true },
  { id: 'powerlifting', name: 'Powerlifting', category: 'Strength', difficulty: 'hard', minDuration: 30, proofTypes: ['device', 'video'], description: 'Squat, bench, deadlift focus', icon: 'barbell', popular: true },
  { id: 'olympic_lifting', name: 'Olympic Lifting', category: 'Strength', difficulty: 'extreme', minDuration: 30, proofTypes: ['device', 'video'], description: 'Snatch and clean & jerk', icon: 'barbell', popular: false },
  { id: 'deadlifts', name: 'Deadlift Session', category: 'Strength', difficulty: 'hard', minDuration: 20, proofTypes: ['device', 'video'], description: 'Deadlift-focused training', icon: 'barbell', popular: true },
  { id: 'bench_press', name: 'Bench Press Session', category: 'Strength', difficulty: 'medium', minDuration: 20, proofTypes: ['device', 'video'], description: 'Chest press training', icon: 'dumbbell', popular: true },
  { id: 'squats', name: 'Squat Session', category: 'Strength', difficulty: 'hard', minDuration: 20, proofTypes: ['device', 'video'], description: 'Squats and leg press', icon: 'barbell', popular: true },
  { id: 'upper_body', name: 'Upper Body', category: 'Strength', difficulty: 'medium', minDuration: 20, proofTypes: ['device', 'video'], description: 'Chest, back, shoulders, arms', icon: 'dumbbell', popular: true },
  { id: 'lower_body', name: 'Lower Body', category: 'Strength', difficulty: 'medium', minDuration: 20, proofTypes: ['device', 'video'], description: 'Quads, hamstrings, glutes, calves', icon: 'dumbbell', popular: true },
  { id: 'back_training', name: 'Back Training', category: 'Strength', difficulty: 'medium', minDuration: 20, proofTypes: ['device', 'video'], description: 'Rows, pull-ups, lat pulldowns', icon: 'dumbbell', popular: false },
  { id: 'shoulder_training', name: 'Shoulder Training', category: 'Strength', difficulty: 'medium', minDuration: 20, proofTypes: ['device', 'video'], description: 'OHP, lateral raises, rear delts', icon: 'dumbbell', popular: false },
  { id: 'arm_training', name: 'Arm Training', category: 'Strength', difficulty: 'easy', minDuration: 15, proofTypes: ['device', 'video'], description: 'Biceps, triceps, forearms', icon: 'dumbbell', popular: false },
  { id: 'core_training', name: 'Core Training', category: 'Strength', difficulty: 'medium', minDuration: 15, proofTypes: ['device', 'video'], description: 'Abs, obliques, lower back', icon: 'dumbbell', popular: true },
  { id: 'kettlebell', name: 'Kettlebell Training', category: 'Strength', difficulty: 'medium', minDuration: 20, proofTypes: ['device', 'video'], description: 'Swings, cleans, presses', icon: 'kettlebell', popular: false },
  { id: 'resistance_bands', name: 'Resistance Bands', category: 'Strength', difficulty: 'easy', minDuration: 20, proofTypes: ['device', 'video'], description: 'Band-based resistance training', icon: 'band', popular: false },

  // ── HIIT & CrossFit ──
  { id: 'hiit', name: 'HIIT', category: 'HIIT', difficulty: 'hard', minDuration: 15, proofTypes: ['device', 'video'], description: 'High intensity interval training', icon: 'fire', popular: true },
  { id: 'tabata', name: 'Tabata', category: 'HIIT', difficulty: 'hard', minDuration: 15, proofTypes: ['device', 'video'], description: '20s work / 10s rest intervals', icon: 'fire', popular: true },
  { id: 'crossfit_wod', name: 'CrossFit WOD', category: 'CrossFit', difficulty: 'extreme', minDuration: 20, proofTypes: ['device', 'video'], description: 'Workout of the day', icon: 'crossfit', popular: true },
  { id: 'circuit_training', name: 'Circuit Training', category: 'HIIT', difficulty: 'medium', minDuration: 20, proofTypes: ['device', 'video'], description: 'Station-based circuit workout', icon: 'circuit', popular: true },
  { id: 'bootcamp', name: 'Bootcamp', category: 'HIIT', difficulty: 'hard', minDuration: 30, proofTypes: ['device', 'video'], description: 'Group bootcamp workout', icon: 'fire', popular: false },

  // ── Calisthenics ──
  { id: 'calisthenics', name: 'Calisthenics', category: 'Calisthenics', difficulty: 'medium', minDuration: 20, proofTypes: ['device', 'video'], description: 'Bodyweight training', icon: 'body', popular: true },
  { id: 'pull_ups', name: 'Pull-up Training', category: 'Calisthenics', difficulty: 'hard', minDuration: 15, proofTypes: ['device', 'video'], description: 'Pull-up progressions', icon: 'pullup', popular: true },
  { id: 'push_ups', name: 'Push-up Training', category: 'Calisthenics', difficulty: 'easy', minDuration: 10, proofTypes: ['device', 'video'], description: 'Push-up variations', icon: 'pushup', popular: true },
  { id: 'handstand', name: 'Handstand Practice', category: 'Calisthenics', difficulty: 'hard', minDuration: 15, proofTypes: ['video'], description: 'Handstand progressions & holds', icon: 'handstand', popular: false },
  { id: 'muscle_up', name: 'Muscle-up Training', category: 'Calisthenics', difficulty: 'extreme', minDuration: 20, proofTypes: ['video'], description: 'Muscle-up progressions', icon: 'pullup', popular: false },
  { id: 'planche', name: 'Planche Training', category: 'Calisthenics', difficulty: 'extreme', minDuration: 20, proofTypes: ['video'], description: 'Planche progressions', icon: 'body', popular: false },

  // ── Yoga & Flexibility ──
  { id: 'yoga_vinyasa', name: 'Vinyasa Yoga', category: 'Yoga & Flexibility', difficulty: 'medium', minDuration: 25, proofTypes: ['device', 'video'], description: 'Flow-based yoga', icon: 'yoga', popular: true },
  { id: 'yoga_hatha', name: 'Hatha Yoga', category: 'Yoga & Flexibility', difficulty: 'easy', minDuration: 25, proofTypes: ['device', 'video'], description: 'Traditional posture-based yoga', icon: 'yoga', popular: true },
  { id: 'yoga_ashtanga', name: 'Ashtanga Yoga', category: 'Yoga & Flexibility', difficulty: 'hard', minDuration: 30, proofTypes: ['device', 'video'], description: 'Power series yoga', icon: 'yoga', popular: false },
  { id: 'yoga_hot', name: 'Hot Yoga / Bikram', category: 'Yoga & Flexibility', difficulty: 'hard', minDuration: 30, proofTypes: ['device', 'video'], description: 'Heated room yoga', icon: 'yoga', popular: true },
  { id: 'yoga_yin', name: 'Yin Yoga', category: 'Yoga & Flexibility', difficulty: 'easy', minDuration: 30, proofTypes: ['device', 'video'], description: 'Deep stretch, long holds', icon: 'yoga', popular: false },
  { id: 'stretching', name: 'Stretching / Mobility', category: 'Yoga & Flexibility', difficulty: 'easy', minDuration: 15, proofTypes: ['device', 'video'], description: 'General flexibility work', icon: 'stretch', popular: true },
  { id: 'pilates', name: 'Pilates', category: 'Yoga & Flexibility', difficulty: 'medium', minDuration: 25, proofTypes: ['device', 'video'], description: 'Core-focused body work', icon: 'pilates', popular: true },
  { id: 'foam_rolling', name: 'Foam Rolling / Recovery', category: 'Yoga & Flexibility', difficulty: 'easy', minDuration: 15, proofTypes: ['device', 'video'], description: 'Myofascial release & recovery', icon: 'roller', popular: false },

  // ── Sports ──
  { id: 'basketball', name: 'Basketball', category: 'Sports', difficulty: 'medium', minDuration: 30, proofTypes: ['device', 'video'], description: 'Pickup or organized basketball', icon: 'basketball', popular: true },
  { id: 'soccer', name: 'Soccer / Football', category: 'Sports', difficulty: 'medium', minDuration: 30, proofTypes: ['device', 'video'], description: 'Match or training session', icon: 'soccer', popular: true },
  { id: 'tennis', name: 'Tennis', category: 'Sports', difficulty: 'medium', minDuration: 30, proofTypes: ['device', 'video'], description: 'Singles or doubles match', icon: 'tennis', popular: true },
  { id: 'badminton', name: 'Badminton', category: 'Sports', difficulty: 'medium', minDuration: 30, proofTypes: ['device', 'video'], description: 'Singles or doubles match', icon: 'badminton', popular: true },
  { id: 'table_tennis', name: 'Table Tennis', category: 'Sports', difficulty: 'easy', minDuration: 20, proofTypes: ['device', 'video'], description: 'Ping pong match or practice', icon: 'tabletennis', popular: false },
  { id: 'volleyball', name: 'Volleyball', category: 'Sports', difficulty: 'medium', minDuration: 30, proofTypes: ['device', 'video'], description: 'Indoor or beach volleyball', icon: 'volleyball', popular: false },
  { id: 'cricket', name: 'Cricket', category: 'Sports', difficulty: 'medium', minDuration: 30, proofTypes: ['device', 'video'], description: 'Match or net practice', icon: 'cricket', popular: true },
  { id: 'baseball', name: 'Baseball / Softball', category: 'Sports', difficulty: 'medium', minDuration: 30, proofTypes: ['device', 'video'], description: 'Game or batting practice', icon: 'baseball', popular: false },
  { id: 'golf', name: 'Golf', category: 'Sports', difficulty: 'easy', minDuration: 45, proofTypes: ['device', 'image_metadata'], description: '9 or 18 holes', icon: 'golf', popular: true },
  { id: 'rugby', name: 'Rugby', category: 'Sports', difficulty: 'hard', minDuration: 30, proofTypes: ['device', 'video'], description: 'Match or training', icon: 'rugby', popular: false },
  { id: 'hockey', name: 'Hockey', category: 'Sports', difficulty: 'hard', minDuration: 30, proofTypes: ['device', 'video'], description: 'Ice or field hockey', icon: 'hockey', popular: false },
  { id: 'boxing', name: 'Boxing', category: 'Martial Arts', difficulty: 'hard', minDuration: 20, proofTypes: ['device', 'video'], description: 'Boxing training or sparring', icon: 'boxing', popular: true },
  { id: 'mma', name: 'MMA', category: 'Martial Arts', difficulty: 'extreme', minDuration: 20, proofTypes: ['device', 'video'], description: 'Mixed martial arts training', icon: 'mma', popular: true },
  { id: 'muay_thai', name: 'Muay Thai', category: 'Martial Arts', difficulty: 'hard', minDuration: 20, proofTypes: ['device', 'video'], description: 'Thai boxing training', icon: 'boxing', popular: true },
  { id: 'jiu_jitsu', name: 'Brazilian Jiu-Jitsu', category: 'Martial Arts', difficulty: 'hard', minDuration: 30, proofTypes: ['device', 'video'], description: 'BJJ rolling & drilling', icon: 'martial', popular: true },
  { id: 'karate', name: 'Karate', category: 'Martial Arts', difficulty: 'medium', minDuration: 25, proofTypes: ['device', 'video'], description: 'Kata and kumite training', icon: 'martial', popular: false },
  { id: 'taekwondo', name: 'Taekwondo', category: 'Martial Arts', difficulty: 'medium', minDuration: 25, proofTypes: ['device', 'video'], description: 'Forms and sparring', icon: 'martial', popular: false },
  { id: 'judo', name: 'Judo', category: 'Martial Arts', difficulty: 'hard', minDuration: 25, proofTypes: ['device', 'video'], description: 'Throws and groundwork training', icon: 'martial', popular: false },
  { id: 'krav_maga', name: 'Krav Maga', category: 'Martial Arts', difficulty: 'hard', minDuration: 25, proofTypes: ['device', 'video'], description: 'Self-defense combat training', icon: 'martial', popular: false },
  { id: 'fencing', name: 'Fencing', category: 'Martial Arts', difficulty: 'medium', minDuration: 25, proofTypes: ['device', 'video'], description: 'Épée, foil, or sabre', icon: 'fencing', popular: false },

  // ── Swimming ──
  { id: 'swimming_laps', name: 'Lap Swimming', category: 'Swimming', difficulty: 'medium', minDuration: 20, proofTypes: ['device', 'api'], description: 'Pool lap swimming', icon: 'swimming', popular: true },
  { id: 'swimming_open', name: 'Open Water Swimming', category: 'Swimming', difficulty: 'hard', minDuration: 25, proofTypes: ['device'], description: 'Lake, river, or ocean swimming', icon: 'swimming', popular: false },
  { id: 'water_polo', name: 'Water Polo', category: 'Swimming', difficulty: 'hard', minDuration: 30, proofTypes: ['device', 'video'], description: 'Water polo match or practice', icon: 'swimming', popular: false },

  // ── Cycling ──
  { id: 'cycling_road', name: 'Road Cycling', category: 'Cycling', difficulty: 'medium', minDuration: 25, proofTypes: ['device', 'api'], description: 'Road bike riding', icon: 'cycling', popular: true },
  { id: 'cycling_mountain', name: 'Mountain Biking', category: 'Cycling', difficulty: 'hard', minDuration: 25, proofTypes: ['device', 'api'], description: 'Off-road mountain biking', icon: 'cycling', popular: true },
  { id: 'cycling_indoor', name: 'Indoor Cycling / Spin', category: 'Cycling', difficulty: 'medium', minDuration: 20, proofTypes: ['device', 'api'], description: 'Spin class or smart trainer', icon: 'cycling', popular: true },

  // ── Climbing ──
  { id: 'rock_climbing', name: 'Rock Climbing', category: 'Climbing', difficulty: 'hard', minDuration: 30, proofTypes: ['device', 'video'], description: 'Indoor or outdoor climbing', icon: 'climbing', popular: true },
  { id: 'bouldering', name: 'Bouldering', category: 'Climbing', difficulty: 'hard', minDuration: 25, proofTypes: ['device', 'video'], description: 'Short-wall climbing without ropes', icon: 'climbing', popular: true },

  // ── Rowing ──
  { id: 'rowing_machine', name: 'Rowing Machine', category: 'Rowing', difficulty: 'medium', minDuration: 15, proofTypes: ['device', 'api'], description: 'Ergometer rowing', icon: 'rowing', popular: true },
  { id: 'rowing_water', name: 'Water Rowing', category: 'Rowing', difficulty: 'hard', minDuration: 30, proofTypes: ['device'], description: 'On-water rowing or sculling', icon: 'rowing', popular: false },

  // ── Outdoor ──
  { id: 'hiking', name: 'Hiking', category: 'Outdoor', difficulty: 'medium', minDuration: 30, proofTypes: ['device', 'api'], description: 'Trail hiking', icon: 'hiking', popular: true },
  { id: 'skiing', name: 'Skiing / Snowboarding', category: 'Outdoor', difficulty: 'hard', minDuration: 30, proofTypes: ['device'], description: 'Downhill or cross-country', icon: 'skiing', popular: false },
  { id: 'surfing', name: 'Surfing', category: 'Outdoor', difficulty: 'hard', minDuration: 30, proofTypes: ['device', 'video'], description: 'Wave surfing or paddleboarding', icon: 'surfing', popular: false },
  { id: 'skateboarding', name: 'Skateboarding', category: 'Outdoor', difficulty: 'medium', minDuration: 20, proofTypes: ['video'], description: 'Skateboarding session', icon: 'skateboard', popular: false },

  // ── Dance ──
  { id: 'dance_general', name: 'Dance Workout', category: 'Dance', difficulty: 'medium', minDuration: 20, proofTypes: ['device', 'video'], description: 'General dance fitness', icon: 'dance', popular: true },
  { id: 'zumba', name: 'Zumba', category: 'Dance', difficulty: 'medium', minDuration: 25, proofTypes: ['device', 'video'], description: 'Zumba dance fitness', icon: 'dance', popular: true },
];

// ── CONTENT CREATION ────────────────────────────────────

export const CONTENT_CATEGORIES = [
  'Video', 'Writing', 'Photography', 'Design', 'Audio',
  'Code', 'Social Media', 'Podcasting', 'Animation', 'Streaming',
] as const;

export const CONTENT_ACTIVITIES: Activity[] = [
  // ── Video ──
  { id: 'youtube_video', name: 'YouTube Video', category: 'Video', difficulty: 'hard', proofTypes: ['api', 'video', 'image_metadata'], description: 'Published YouTube video', icon: 'youtube', popular: true },
  { id: 'short_form_video', name: 'Short-Form Video', category: 'Video', difficulty: 'medium', proofTypes: ['api', 'video'], description: 'TikTok, Reels, or Shorts', icon: 'video', popular: true },
  { id: 'video_editing', name: 'Video Editing', category: 'Video', difficulty: 'hard', proofTypes: ['video', 'image_metadata'], description: 'Editing a video project', icon: 'edit', popular: true },
  { id: 'documentary', name: 'Documentary / Long-Form', category: 'Video', difficulty: 'extreme', proofTypes: ['video'], description: 'Documentary or long-form video', icon: 'film', popular: false },
  { id: 'tutorial_video', name: 'Tutorial / Educational Video', category: 'Video', difficulty: 'hard', proofTypes: ['api', 'video'], description: 'How-to or educational content', icon: 'education', popular: true },
  { id: 'vlog', name: 'Vlog', category: 'Video', difficulty: 'medium', proofTypes: ['api', 'video'], description: 'Daily or weekly vlog', icon: 'camera', popular: true },
  { id: 'music_video', name: 'Music Video', category: 'Video', difficulty: 'extreme', proofTypes: ['video'], description: 'Music video production', icon: 'music', popular: false },

  // ── Writing ──
  { id: 'blog_post', name: 'Blog Post / Article', category: 'Writing', difficulty: 'medium', proofTypes: ['api', 'image_metadata'], description: 'Published blog post (500+ words)', icon: 'article', popular: true },
  { id: 'newsletter', name: 'Newsletter', category: 'Writing', difficulty: 'medium', proofTypes: ['api', 'image_metadata'], description: 'Email newsletter issue', icon: 'email', popular: true },
  { id: 'twitter_thread', name: 'Twitter/X Thread', category: 'Writing', difficulty: 'easy', proofTypes: ['api', 'image_metadata'], description: 'Tweet thread (5+ tweets)', icon: 'twitter', popular: true },
  { id: 'linkedin_post', name: 'LinkedIn Post', category: 'Writing', difficulty: 'easy', proofTypes: ['api', 'image_metadata'], description: 'Professional LinkedIn post', icon: 'linkedin', popular: true },
  { id: 'essay', name: 'Essay / Long-Form Writing', category: 'Writing', difficulty: 'hard', proofTypes: ['image_metadata', 'manual_detailed'], description: 'Essay or long-form piece (2000+ words)', icon: 'article', popular: false },
  { id: 'book_chapter', name: 'Book Chapter', category: 'Writing', difficulty: 'extreme', proofTypes: ['manual_detailed'], description: 'Chapter of a book', icon: 'book', popular: false },
  { id: 'copywriting', name: 'Copywriting', category: 'Writing', difficulty: 'medium', proofTypes: ['image_metadata', 'manual_detailed'], description: 'Sales copy, landing pages, ads', icon: 'article', popular: false },
  { id: 'scriptwriting', name: 'Scriptwriting', category: 'Writing', difficulty: 'hard', proofTypes: ['manual_detailed'], description: 'Video or podcast script', icon: 'script', popular: false },

  // ── Photography ──
  { id: 'photo_shoot', name: 'Photo Shoot', category: 'Photography', difficulty: 'medium', proofTypes: ['image_metadata'], description: 'Planned photography session', icon: 'camera', popular: true },
  { id: 'photo_editing', name: 'Photo Editing / Retouching', category: 'Photography', difficulty: 'medium', proofTypes: ['image_metadata'], description: 'Lightroom or Photoshop editing', icon: 'edit', popular: true },
  { id: 'street_photography', name: 'Street Photography', category: 'Photography', difficulty: 'easy', proofTypes: ['image_metadata'], description: 'Street or candid photography', icon: 'camera', popular: false },
  { id: 'product_photography', name: 'Product Photography', category: 'Photography', difficulty: 'hard', proofTypes: ['image_metadata'], description: 'Commercial product shots', icon: 'camera', popular: false },

  // ── Design ──
  { id: 'graphic_design', name: 'Graphic Design', category: 'Design', difficulty: 'medium', proofTypes: ['image_metadata'], description: 'Posters, banners, social graphics', icon: 'design', popular: true },
  { id: 'ui_ux_design', name: 'UI/UX Design', category: 'Design', difficulty: 'hard', proofTypes: ['image_metadata'], description: 'App or web interface design', icon: 'design', popular: true },
  { id: 'logo_design', name: 'Logo Design', category: 'Design', difficulty: 'hard', proofTypes: ['image_metadata'], description: 'Brand identity / logo creation', icon: 'design', popular: false },
  { id: '3d_modeling', name: '3D Modeling', category: 'Design', difficulty: 'extreme', proofTypes: ['image_metadata', 'video'], description: '3D modeling and rendering', icon: '3d', popular: false },
  { id: 'illustration', name: 'Illustration', category: 'Design', difficulty: 'hard', proofTypes: ['image_metadata'], description: 'Digital or traditional illustration', icon: 'illustration', popular: true },
  { id: 'motion_graphics', name: 'Motion Graphics', category: 'Design', difficulty: 'extreme', proofTypes: ['video'], description: 'Animated graphics and titles', icon: 'animation', popular: false },

  // ── Code ──
  { id: 'code_commit', name: 'Code Commit', category: 'Code', difficulty: 'medium', proofTypes: ['api'], description: 'Meaningful code contribution (GitHub)', icon: 'code', popular: true },
  { id: 'pull_request', name: 'Pull Request', category: 'Code', difficulty: 'hard', proofTypes: ['api'], description: 'Code review and merge', icon: 'code', popular: true },
  { id: 'open_source', name: 'Open Source Contribution', category: 'Code', difficulty: 'hard', proofTypes: ['api'], description: 'Contributing to OSS projects', icon: 'code', popular: true },
  { id: 'project_launch', name: 'Project Launch', category: 'Code', difficulty: 'extreme', proofTypes: ['api', 'image_metadata'], description: 'Shipping a product or feature', icon: 'rocket', popular: false },

  // ── Audio ──
  { id: 'podcast_episode', name: 'Podcast Episode', category: 'Podcasting', difficulty: 'hard', proofTypes: ['api', 'video'], description: 'Recorded and published podcast', icon: 'podcast', popular: true },
  { id: 'music_production', name: 'Music Production', category: 'Audio', difficulty: 'hard', proofTypes: ['video', 'image_metadata'], description: 'Beat making or song production', icon: 'music', popular: true },
  { id: 'voice_over', name: 'Voice-Over Recording', category: 'Audio', difficulty: 'medium', proofTypes: ['video'], description: 'VO recording session', icon: 'microphone', popular: false },

  // ── Streaming ──
  { id: 'live_stream', name: 'Live Stream', category: 'Streaming', difficulty: 'medium', minDuration: 30, proofTypes: ['api', 'video'], description: 'Twitch, YouTube, or IG Live', icon: 'live', popular: true },
];

// ── GAMING ──────────────────────────────────────────────

export const GAMING_CATEGORIES = [
  'FPS', 'MOBA', 'Battle Royale', 'Strategy', 'Fighting',
  'Racing', 'Sports Sim', 'Card Game', 'Chess', 'RPG',
  'Sandbox', 'Rhythm', 'Puzzle', 'Simulation',
] as const;

export const GAMING_ACTIVITIES: Activity[] = [
  // ── FPS ──
  { id: 'cs2', name: 'Counter-Strike 2', category: 'FPS', difficulty: 'hard', proofTypes: ['api'], description: 'Competitive CS2 matches', icon: 'cs2', popular: true },
  { id: 'valorant', name: 'Valorant', category: 'FPS', difficulty: 'hard', proofTypes: ['api'], description: 'Ranked Valorant matches', icon: 'valorant', popular: true },
  { id: 'overwatch2', name: 'Overwatch 2', category: 'FPS', difficulty: 'medium', proofTypes: ['api', 'image_metadata'], description: 'Competitive Overwatch matches', icon: 'overwatch', popular: true },
  { id: 'rainbow_six', name: 'Rainbow Six Siege', category: 'FPS', difficulty: 'hard', proofTypes: ['api', 'image_metadata'], description: 'Ranked Siege matches', icon: 'r6', popular: true },
  { id: 'call_of_duty', name: 'Call of Duty', category: 'FPS', difficulty: 'medium', proofTypes: ['api', 'image_metadata'], description: 'CoD ranked/multiplayer', icon: 'cod', popular: true },
  { id: 'halo', name: 'Halo Infinite', category: 'FPS', difficulty: 'medium', proofTypes: ['api', 'image_metadata'], description: 'Ranked Halo matches', icon: 'halo', popular: false },
  { id: 'apex_legends', name: 'Apex Legends', category: 'Battle Royale', difficulty: 'hard', proofTypes: ['api', 'image_metadata'], description: 'Ranked Apex matches', icon: 'apex', popular: true },
  { id: 'escape_from_tarkov', name: 'Escape from Tarkov', category: 'FPS', difficulty: 'extreme', proofTypes: ['image_metadata'], description: 'Tarkov raids', icon: 'tarkov', popular: true },
  { id: 'hunt_showdown', name: 'Hunt: Showdown', category: 'FPS', difficulty: 'hard', proofTypes: ['api', 'image_metadata'], description: 'Competitive Hunt matches', icon: 'hunt', popular: false },
  { id: 'destiny2', name: 'Destiny 2', category: 'FPS', difficulty: 'medium', proofTypes: ['api'], description: 'Crucible, raids, trials', icon: 'destiny', popular: true },

  // ── MOBA ──
  { id: 'league_of_legends', name: 'League of Legends', category: 'MOBA', difficulty: 'hard', proofTypes: ['api'], description: 'Ranked LoL matches', icon: 'lol', popular: true },
  { id: 'dota2', name: 'Dota 2', category: 'MOBA', difficulty: 'extreme', proofTypes: ['api'], description: 'Ranked Dota matches', icon: 'dota2', popular: true },
  { id: 'smite', name: 'Smite 2', category: 'MOBA', difficulty: 'medium', proofTypes: ['api', 'image_metadata'], description: 'Ranked Smite matches', icon: 'smite', popular: false },

  // ── Battle Royale ──
  { id: 'fortnite', name: 'Fortnite', category: 'Battle Royale', difficulty: 'medium', proofTypes: ['api', 'image_metadata'], description: 'Competitive Fortnite', icon: 'fortnite', popular: true },
  { id: 'pubg', name: 'PUBG', category: 'Battle Royale', difficulty: 'medium', proofTypes: ['api', 'image_metadata'], description: 'PUBG ranked matches', icon: 'pubg', popular: true },
  { id: 'warzone', name: 'Warzone', category: 'Battle Royale', difficulty: 'medium', proofTypes: ['api', 'image_metadata'], description: 'CoD Warzone matches', icon: 'warzone', popular: true },

  // ── Strategy ──
  { id: 'starcraft2', name: 'StarCraft II', category: 'Strategy', difficulty: 'extreme', proofTypes: ['api', 'image_metadata'], description: 'Ranked SC2 matches', icon: 'sc2', popular: true },
  { id: 'age_of_empires', name: 'Age of Empires', category: 'Strategy', difficulty: 'hard', proofTypes: ['api', 'image_metadata'], description: 'Ranked AoE matches', icon: 'aoe', popular: false },
  { id: 'civilization', name: 'Civilization', category: 'Strategy', difficulty: 'medium', proofTypes: ['image_metadata'], description: 'Civ game session', icon: 'civ', popular: true },
  { id: 'total_war', name: 'Total War', category: 'Strategy', difficulty: 'hard', proofTypes: ['image_metadata'], description: 'Campaign or multiplayer', icon: 'totalwar', popular: false },

  // ── Fighting Games ──
  { id: 'street_fighter', name: 'Street Fighter 6', category: 'Fighting', difficulty: 'hard', proofTypes: ['api', 'image_metadata'], description: 'Ranked SF6 matches', icon: 'sf6', popular: true },
  { id: 'tekken', name: 'Tekken 8', category: 'Fighting', difficulty: 'hard', proofTypes: ['api', 'image_metadata'], description: 'Ranked Tekken matches', icon: 'tekken', popular: true },
  { id: 'mortal_kombat', name: 'Mortal Kombat', category: 'Fighting', difficulty: 'medium', proofTypes: ['image_metadata'], description: 'Online MK matches', icon: 'mk', popular: true },
  { id: 'smash_bros', name: 'Super Smash Bros', category: 'Fighting', difficulty: 'hard', proofTypes: ['image_metadata', 'video'], description: 'Competitive Smash', icon: 'smash', popular: true },
  { id: 'guilty_gear', name: 'Guilty Gear Strive', category: 'Fighting', difficulty: 'hard', proofTypes: ['api', 'image_metadata'], description: 'Ranked GG matches', icon: 'gg', popular: false },

  // ── Racing ──
  { id: 'gran_turismo', name: 'Gran Turismo', category: 'Racing', difficulty: 'medium', proofTypes: ['image_metadata'], description: 'Competitive GT races', icon: 'racing', popular: true },
  { id: 'forza', name: 'Forza Motorsport', category: 'Racing', difficulty: 'medium', proofTypes: ['image_metadata'], description: 'Competitive Forza races', icon: 'racing', popular: true },
  { id: 'iracing', name: 'iRacing', category: 'Racing', difficulty: 'extreme', proofTypes: ['api'], description: 'Sim racing on iRacing', icon: 'racing', popular: true },
  { id: 'rocket_league', name: 'Rocket League', category: 'Racing', difficulty: 'hard', proofTypes: ['api', 'image_metadata'], description: 'Ranked Rocket League', icon: 'rocketleague', popular: true },
  { id: 'f1_game', name: 'F1 Game', category: 'Racing', difficulty: 'hard', proofTypes: ['image_metadata'], description: 'F1 online races', icon: 'f1', popular: false },

  // ── Chess ──
  { id: 'chess_rapid', name: 'Chess (Rapid)', category: 'Chess', difficulty: 'medium', proofTypes: ['api'], description: 'Rapid chess games (10-30 min)', icon: 'chess', popular: true },
  { id: 'chess_blitz', name: 'Chess (Blitz)', category: 'Chess', difficulty: 'hard', proofTypes: ['api'], description: 'Blitz chess games (3-5 min)', icon: 'chess', popular: true },
  { id: 'chess_bullet', name: 'Chess (Bullet)', category: 'Chess', difficulty: 'extreme', proofTypes: ['api'], description: 'Bullet chess games (1-2 min)', icon: 'chess', popular: false },
  { id: 'chess_puzzle', name: 'Chess Puzzles', category: 'Chess', difficulty: 'medium', proofTypes: ['api'], description: 'Tactical puzzle training', icon: 'chess', popular: true },

  // ── Card Games ──
  { id: 'hearthstone', name: 'Hearthstone', category: 'Card Game', difficulty: 'medium', proofTypes: ['api', 'image_metadata'], description: 'Ranked Hearthstone', icon: 'hearthstone', popular: true },
  { id: 'mtg_arena', name: 'MTG Arena', category: 'Card Game', difficulty: 'hard', proofTypes: ['image_metadata'], description: 'Magic: The Gathering Arena', icon: 'mtg', popular: true },
  { id: 'tft', name: 'Teamfight Tactics', category: 'Card Game', difficulty: 'medium', proofTypes: ['api'], description: 'Ranked TFT matches', icon: 'tft', popular: true },
  { id: 'legends_of_runeterra', name: 'Legends of Runeterra', category: 'Card Game', difficulty: 'medium', proofTypes: ['api'], description: 'Ranked LoR matches', icon: 'lor', popular: false },
  { id: 'pokemon_tcg', name: 'Pokémon TCG Live', category: 'Card Game', difficulty: 'easy', proofTypes: ['image_metadata'], description: 'Pokémon card battles', icon: 'pokemon', popular: false },

  // ── Sports Sim ──
  { id: 'fifa_fc', name: 'EA FC (FIFA)', category: 'Sports Sim', difficulty: 'medium', proofTypes: ['api', 'image_metadata'], description: 'Online FUT or seasons', icon: 'fifa', popular: true },
  { id: 'nba2k', name: 'NBA 2K', category: 'Sports Sim', difficulty: 'medium', proofTypes: ['image_metadata'], description: 'MyCareer, Park, or Pro-Am', icon: 'nba2k', popular: true },
  { id: 'madden', name: 'Madden NFL', category: 'Sports Sim', difficulty: 'medium', proofTypes: ['image_metadata'], description: 'Online Madden', icon: 'madden', popular: false },

  // ── RPG / Sandbox ──
  { id: 'wow', name: 'World of Warcraft', category: 'RPG', difficulty: 'hard', proofTypes: ['api', 'image_metadata'], description: 'Raids, M+, or PvP', icon: 'wow', popular: true },
  { id: 'ffxiv', name: 'Final Fantasy XIV', category: 'RPG', difficulty: 'hard', proofTypes: ['image_metadata'], description: 'Raids and savage content', icon: 'ffxiv', popular: true },
  { id: 'minecraft', name: 'Minecraft', category: 'Sandbox', difficulty: 'easy', proofTypes: ['image_metadata', 'video'], description: 'Building or survival session', icon: 'minecraft', popular: true },
  { id: 'genshin_impact', name: 'Genshin Impact', category: 'RPG', difficulty: 'medium', proofTypes: ['image_metadata'], description: 'Spiral abyss or daily commissions', icon: 'genshin', popular: true },
];

// ── Catalog Helpers ─────────────────────────────────────

export function getActivitiesByDomain(domain: 'fitness' | 'content' | 'gaming'): Activity[] {
  switch (domain) {
    case 'fitness': return FITNESS_ACTIVITIES;
    case 'content': return CONTENT_ACTIVITIES;
    case 'gaming': return GAMING_ACTIVITIES;
  }
}

export function getPopularActivities(domain: 'fitness' | 'content' | 'gaming'): Activity[] {
  return getActivitiesByDomain(domain).filter(a => a.popular);
}

export function getActivityById(id: string): Activity | undefined {
  return [...FITNESS_ACTIVITIES, ...CONTENT_ACTIVITIES, ...GAMING_ACTIVITIES].find(a => a.id === id);
}

export function getActivitiesByCategory(domain: 'fitness' | 'content' | 'gaming', category: string): Activity[] {
  return getActivitiesByDomain(domain).filter(a => a.category === category);
}

export function getCategoriesByDomain(domain: 'fitness' | 'content' | 'gaming'): readonly string[] {
  switch (domain) {
    case 'fitness': return FITNESS_CATEGORIES;
    case 'content': return CONTENT_CATEGORIES;
    case 'gaming': return GAMING_CATEGORIES;
  }
}

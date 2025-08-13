from flask import Flask, send_from_directory, jsonify, request
import os
import json

app = Flask(__name__, static_folder='.')

# Path for our JSON database file
DB_FILE = 'database.json'

# Function to read data from the database file
def read_db():
    if not os.path.exists(DB_FILE):
        # If the file doesn't exist, create it with default structure
        default_data = {"userProgress": {}}
        with open(DB_FILE, 'w') as f:
            json.dump(default_data, f, indent=4)
        return default_data
    with open(DB_FILE, 'r') as f:
        return json.load(f)

# Function to write data to the database file
def write_db(data):
    with open(DB_FILE, 'w') as f:
        json.dump(data, f, indent=4)

@app.route('/')
def index():
    return send_from_directory('.', 'index.html')

@app.route('/<path:path>')
def static_files(path):
    # This will serve your existing static files like script.js and styles.css
    # We need to make sure we don't accidentally serve app.py or other sensitive files.
    if path != 'app.py' and path != 'requirements.txt' and path != 'database.json':
        return send_from_directory('.', path)
    else:
        return "", 404
def make_week_from(template_week, title_text):
    # Deep-copy-like clone without importing copy to keep it simple here
    return json.loads(json.dumps({**template_week, "title": title_text}))

OFFICIAL_ROADMAP_TEXT = """
Week 1: Foundations - Focus on Basics
•	Monday:
o	Morning (2 hrs): Verbal Ability and Reading Comprehension - Introduction to Reading Comprehension (Chapter: Reading Comprehension Strategies); practice 2-3 basic passages.
o	Night (2 hrs): Quantitative Aptitude - Arithmetic Basics: Percentages and Ratios (Chapter: Percentages, Ratios); solve 20 LOD 1 questions.
•	Tuesday:
o	Morning (2 hrs): Verbal Ability and Reading Comprehension - Vocabulary Building: Root Words (Chapter: Vocabulary Enhancement); learn 20 words with examples.
o	Night (2 hrs): Quantitative Aptitude - Profit, Loss, and Simple Interest (Chapter: Profit/Loss, Interest); practice 20-30 questions.
•	Wednesday:
o	Morning (2 hrs): Data Interpretation - Basics of Data Interpretation: Tables and Charts (Chapter: Tables); understand formats, solve 5 examples.
o	Night (2 hrs): Verbal Ability and Reading Comprehension - Grammar Focus: Sentence Correction (Chapter: Sentence Correction); practice 15 exercises.
•	Thursday:
o	Morning (2 hrs): Quantitative Aptitude - Algebra Basics: Linear Equations (Chapter: Linear Equations); review theory, solve 10 problems.
o	Night (2 hrs): Logical Reasoning - Logical Reasoning Basics: Arrangements (Chapter: Arrangements); solve 5 sets.
•	Friday:
o	Morning (2 hrs): Verbal Ability and Reading Comprehension - Practice Para-Jumbles Basics (Chapter: Para-Jumbles); solve 10 sets.
o	Night (2 hrs): Quantitative Aptitude - Number Systems Basics: Factors and Multiples (Chapter: Number Systems); solve 20 LOD 1 questions.
•	Saturday:
o	Morning (2 hrs): Mixed Review - Revise weak Verbal Ability and Reading Comprehension, Quantitative Aptitude topics; flashcards for 20 words.
o	Night (2 hrs): Logical Reasoning - Basic Puzzles (Chapter: Puzzle Tests); practice 10 questions.
•	Sunday:
o	Full Mock Test (3 hours, from book) + analysis; focus on time management.
Week 2: Foundations - Build Momentum
•	Monday:
o	Morning (2 hrs): Data Interpretation - Bar Graphs and Pie Charts (Chapter: Bar Graphs); study theory, solve 5 examples.
o	Night (2 hrs): Quantitative Aptitude - Geometry Basics: Triangles (Chapter: Triangles); solve 15 LOD 1-2 questions.
•	Tuesday:
o	Morning (2 hrs): Verbal Ability and Reading Comprehension - Practice Inference Questions in Reading Comprehension (Chapter: Inference-Based RC); solve 3 passages.
o	Night (2 hrs): Logical Reasoning - Logical Reasoning Sequencing Problems (Chapter: Logical Sequences); solve 5-7 sets.
•	Wednesday:
o	Morning (2 hrs): Quantitative Aptitude - Time, Speed, and Distance (Chapter: Time/Speed/Distance); review formulas, solve 20 problems.
o	Night (2 hrs): Verbal Ability and Reading Comprehension - Critical Reasoning: Assumptions (Chapter: Critical Reasoning); practice 15 questions.
•	Thursday:
o	Morning (2 hrs): Data Interpretation - Mixed Data Interpretation Sets (Chapter: Mixed DI); practice 4 timed sets.
o	Night (2 hrs): Quantitative Aptitude - Algebra: Quadratic Equations (Chapter: Quadratic Equations); solve 15 LOD 1 questions.
•	Friday:
o	Morning (2 hrs): Verbal Ability and Reading Comprehension - Vocabulary: Synonyms and Antonyms (Chapter: Vocabulary Enhancement); learn 20 words.
o	Night (2 hrs): Logical Reasoning - Logical Puzzles: Blood Relations (Chapter: Blood Relations); solve 10 sets.
•	Saturday:
o	Morning (2 hrs): Quantitative Aptitude Review - Revise Arithmetic weaknesses (e.g., Percentages); solve 20 mixed questions.
o	Night (2 hrs): Verbal Ability and Reading Comprehension - Para Summaries Practice (Chapter: Para-Summaries); solve 10 sets.
•	Sunday:
o	Full Mock Test (3 hours) + analysis; evaluate section scores.
Week 3: Foundations - Integrate Basics
•	Monday:
o	Morning (2 hrs): Verbal Ability and Reading Comprehension - Reading Comprehension: Tone and Style Questions (Chapter: Tone/Style in RC); solve 3-4 passages.
o	Night (2 hrs): Data Interpretation - Data Interpretation: Line Graphs (Chapter: Line Graphs); practice 5 timed examples.
•	Tuesday:
o	Morning (2 hrs): Quantitative Aptitude - Modern Math Basics: Permutations (Chapter: Permutations); review concepts, solve 10 problems.
o	Night (2 hrs): Verbal Ability and Reading Comprehension - Odd Sentence Out Practice (Chapter: Odd Sentence Out); solve 15 exercises.
•	Wednesday:
o	Morning (2 hrs): Logical Reasoning - Logical Reasoning: Syllogisms (Chapter: Syllogisms); study rules, solve 10 questions.
o	Night (2 hrs): Quantitative Aptitude - Geometry: Circles (Chapter: Circles); solve 15 LOD 2 questions.
•	Thursday:
o	Morning (2 hrs): Verbal Ability and Reading Comprehension - Advanced Grammar Review (Chapter: Grammar Rules); correct 15 sentences.
o	Night (2 hrs): Data Interpretation - Caselets in Data Interpretation (Chapter: Caselets); solve 5 mixed sets.
•	Friday:
o	Morning (2 hrs): Quantitative Aptitude - Number Systems: Advanced Factors (Chapter: Number Systems); solve 20 questions.
o	Night (2 hrs): Verbal Ability and Reading Comprehension - Vocabulary Application in Sentences (Chapter: Vocabulary Usage); practice 20 words.
•	Saturday:
o	Morning (2 hrs): Mixed Basics Review - All sections; solve 10 quick questions each.
o	Night (2 hrs): Logical Reasoning - Puzzle Sets (Chapter: Puzzle Tests); solve 7-10.
•	Sunday:
o	Full Mock Test (3 hours) + analysis; identify weak areas.
Week 4: Advanced - Ramp Up Difficulty
•	Monday:
o	Morning (2 hrs): Quantitative Aptitude - Arithmetic: Mixtures and Alligations (Chapter: Mixtures/Alligations); solve 15 LOD 2-3 questions.
o	Night (2 hrs): Verbal Ability and Reading Comprehension - Complex Reading Comprehension Passages (Chapter: Advanced RC); solve 4 timed.
•	Tuesday:
o	Morning (2 hrs): Data Interpretation - Advanced Data Interpretation Charts (Chapter: Pie Charts/Bar Graphs); practice 5 sets.
o	Night (2 hrs): Quantitative Aptitude - Algebra: Inequalities (Chapter: Inequalities); solve 20-25 questions.
•	Wednesday:
o	Morning (2 hrs): Verbal Ability and Reading Comprehension - Advanced Para-Jumbles (Chapter: Para-Jumbles); solve 15 sets.
o	Night (2 hrs): Logical Reasoning - Logical Reasoning: Grouping Problems (Chapter: Team Formation); solve 5 timed sets.
•	Thursday:
o	Morning (2 hrs): Quantitative Aptitude - Geometry: Mensuration (Chapter: Mensuration); solve 15 LOD 3 questions.
o	Night (2 hrs): Verbal Ability and Reading Comprehension - Critical Reasoning: Strengthen and Weaken Arguments (Chapter: Critical Reasoning); practice 15.
•	Friday:
o	Morning (2 hrs): Data Interpretation - Mixed Data Interpretation and Logical Reasoning (Chapter: Logical DI); solve 5 full sets.
o	Night (2 hrs): Quantitative Aptitude - Time and Work (Chapter: Time/Work); solve 20 advanced problems.
•	Saturday:
o	Morning (2 hrs): Verbal Ability and Reading Comprehension Review - Vocabulary quiz (50 words) + RC errors (Chapter: Vocabulary).
o	Night (2 hrs): Quantitative Aptitude - Modern Math: Combinations (Chapter: Combinations); solve 15 questions.
•	Sunday:
o	Full Mock Test (3 hours) + analysis; improve timing.
Week 5: Advanced - Mixed Practice
•	Monday:
o	Morning (2 hrs): Data Interpretation - Data Interpretation: Data Sufficiency (Chapter: Data Sufficiency); review theory, solve 10 examples.
o	Night (2 hrs): Quantitative Aptitude - Number Systems: Remainders (Chapter: Number Systems); solve 20 LOD 3 questions.
•	Tuesday:
o	Morning (2 hrs): Verbal Ability and Reading Comprehension - Multi-Paragraph Reading Comprehension (Chapter: Advanced RC); solve 4 passages.
o	Night (2 hrs): Logical Reasoning - Advanced Logical Reasoning Puzzles (Chapter: Puzzle Tests); solve 7 sets.
•	Wednesday:
o	Morning (2 hrs): Quantitative Aptitude - Algebra: Functions (Chapter: Functions); solve 15 questions.
o	Night (2 hrs): Verbal Ability and Reading Comprehension - Sentence Completion (Chapter: Sentence Completion); solve 20 questions.
•	Thursday:
o	Morning (2 hrs): Data Interpretation - Caselet-Based Data Interpretation (Chapter: Caselets); solve 5 timed sets.
o	Night (2 hrs): Quantitative Aptitude - Geometry: Coordinate Geometry (Chapter: Coordinate Geometry); solve 15 LOD 2-3 questions.
•	Friday:
o	Morning (2 hrs): Verbal Ability and Reading Comprehension - Vocabulary: Idioms (Chapter: Vocabulary Enhancement); learn 20 with examples.
o	Night (2 hrs): Logical Reasoning - Logical Deduction Problems (Chapter: Logical Deduction); solve 10 questions.
•	Saturday:
o	Morning (2 hrs): Quantitative Aptitude Review - Solve 20 mixed sets from weak areas.
o	Night (2 hrs): Verbal Ability and Reading Comprehension - Para-Completion Practice (Chapter: Para-Completion); solve 15 sets.
•	Sunday:
o	Full Mock Test (3 hours) + analysis; focus on accuracy.
Week 6: Advanced - Sectional Integration
•	Monday:
o	Morning (2 hrs): Quantitative Aptitude - Modern Math: Probability (Chapter: Probability); solve 15 advanced questions.
o	Night (2 hrs): Verbal Ability and Reading Comprehension - Inference-Heavy Reading Comprehension (Chapter: Inference-Based RC); solve 4 passages.
•	Tuesday:
o	Morning (2 hrs): Data Interpretation - Data Interpretation: Growth Rates (Chapter: Quantitative DI on Percentages); practice 5 sets.
o	Night (2 hrs): Quantitative Aptitude - Arithmetic: Averages (Chapter: Averages); solve 20 LOD 3 questions.
•	Wednesday:
o	Morning (2 hrs): Verbal Ability and Reading Comprehension - Mixed Critical Reasoning (Chapter: Critical Reasoning); solve 20 questions.
o	Night (2 hrs): Logical Reasoning - Logical Reasoning: Networks and Paths (Chapter: Network Diagrams); solve 5 sets.
•	Thursday:
o	Morning (2 hrs): Quantitative Aptitude - Algebra: Series and Progressions (Chapter: Series); solve 15 questions.
o	Night (2 hrs): Verbal Ability and Reading Comprehension - Full Grammar Review (Chapter: Grammar Rules) + error correction.
•	Friday:
o	Morning (2 hrs): Data Interpretation - Full Sectional Test (Chapter: Mock Tests); solve 5 mixed sets.
o	Night (2 hrs): Quantitative Aptitude - Geometry Review (Chapter: Geometry); solve 20 mixed questions.
•	Saturday:
o	Morning (2 hrs): Mixed Advanced Practice - 10 questions each from all sections.
o	Night (2 hrs): Verbal Ability and Reading Comprehension - Vocabulary Consolidation (Chapter: Vocabulary) quiz 50 words.
•	Sunday:
o	Full Mock Test (3 hours) + analysis; simulate exam pressure.
Week 7: Revision - Consolidate and Test
•	Monday:
o	Morning (2 hrs): Verbal Ability and Reading Comprehension - Full Revision of Key Chapters (e.g., RC Strategies).
o	Night (2 hrs): Quantitative Aptitude - Timed Sets from Weak Topics (20 questions).
•	Tuesday:
o	Morning (2 hrs): Data Interpretation - Revise Data Interpretation Types (e.g., Tables, Graphs); practice 5 sets.
o	Night (2 hrs): Verbal Ability and Reading Comprehension - Reading Comprehension Mocks (solve 4 passages).
•	Wednesday:
o	Morning (2 hrs): Quantitative Aptitude - Full Revision: Formulas and LOD 3 Questions (20 total).
o	Night (2 hrs): Logical Reasoning - Logical Reasoning Mocks (solve 7 sets).
•	Thursday:
o	Morning (2 hrs): Verbal Ability and Reading Comprehension - Vocabulary and Grammar Quiz (50 items).
o	Night (2 hrs): Quantitative Aptitude - Mixed Sectional Practice (20 questions).
•	Friday:
o	Morning (2 hrs): Data Interpretation - Full Revision of Key Concepts (e.g., Caselets).
o	Night (2 hrs): Verbal Ability and Reading Comprehension - Error Analysis from Past Practices.
•	Saturday:
o	Morning (2 hrs): All Sections - Quick Formula and Vocabulary Review.
o	Night (2 hrs): Mixed Practice Sets (10 per section).
•	Sunday:
o	2 Full Mock Tests (morning + night) + analysis.
Week 8: Intensive Mocks and Final Polish
•	Monday:
o	Morning (2 hrs): Verbal Ability and Reading Comprehension - Sectional Mock.
o	Night (2 hrs): Quantitative Aptitude - Error Review (20 questions).
•	Tuesday:
o	Morning (2 hrs): Data Interpretation - Sectional Mock.
o	Night (2 hrs): Verbal Ability and Reading Comprehension - Final Reading Comprehension Practice (4 passages).
•	Wednesday:
o	Morning (2 hrs): Quantitative Aptitude - Sectional Mock.
o	Night (2 hrs): Logical Reasoning - Error Review.
•	Thursday:
o	Morning (2 hrs): Mixed Sectional (Verbal Ability and Reading Comprehension + Quantitative Aptitude).
o	Night (2 hrs): Full Revision Notes (key formulas, tips).
•	Friday:
o	Morning (2 hrs): Mixed Sectional (Data Interpretation + Logical Reasoning + Verbal Ability and Reading Comprehension).
o	Night (2 hrs): Quantitative Aptitude - Final Tweaks (15 questions).
•	Saturday:
o	Morning (2 hrs): Light Review - All Weak Areas.
o	Night (2 hrs): Exam Strategy Notes.
•	Sunday:
o	2 Full Mock Tests + analysis; focus on mindset.
"""

def parse_official_data_text(text: str):
    lines = [ln.strip() for ln in text.splitlines() if ln.strip()]

    weeks = {}
    current_week_key = None
    current_day_key = None
    days_map = {
        'monday': 'monday',
        'tuesday': 'tuesday',
        'wednesday': 'wednesday',
        'thursday': 'thursday',
        'friday': 'friday',
        'saturday': 'saturday',
        'sunday': 'sunday',
    }

    def ensure_day(week_dict, day_key):
        if day_key not in week_dict:
            week_dict[day_key] = {
                'morning': { 'title': '', 'description': '' },
                'night': { 'title': '', 'description': '' }
            }

    for ln in lines:
        # Week line
        if ln.lower().startswith('week '):
            current_week_key = ln
            weeks[current_week_key] = { 'title': ln.split(':', 1)[-1].strip() }
            current_day_key = None
            continue

        # Day bullet like "• Monday:" (may include special bullet char)
        if ln[0] in {'•', '*', '-'} and ':' in ln:
            day_name = ln.split(':', 1)[0].lstrip('•*-').strip().lower()
            if day_name in days_map:
                current_day_key = days_map[day_name]
                ensure_day(weeks[current_week_key], current_day_key)
                continue

        # Session lines starting with 'o '
        if ln.startswith('o'):
            content = ln.lstrip('o').strip()
            lowered = content.lower()
            session = None
            if lowered.startswith('morning'):
                session = 'morning'
                rest = content.split(':', 1)[-1].strip() if ':' in content else content
            elif lowered.startswith('night'):
                session = 'night'
                rest = content.split(':', 1)[-1].strip() if ':' in content else content
            else:
                # No explicit session; assign to both morning and night
                session = 'both'
                rest = content

            # Split title and description on ' - '
            if ' - ' in rest:
                title_part, desc_part = rest.split(' - ', 1)
                title = title_part.strip()
                description = desc_part.strip()
            else:
                title = rest.strip()
                description = ''

            if current_week_key is not None and current_day_key is not None:
                ensure_day(weeks[current_week_key], current_day_key)
                if session == 'both':
                    weeks[current_week_key][current_day_key]['morning'] = { 'title': title, 'description': description }
                    weeks[current_week_key][current_day_key]['night'] = { 'title': title, 'description': description }
                else:
                    weeks[current_week_key][current_day_key][session] = { 'title': title, 'description': description }

    return weeks

# Build roadmap from embedded official data (no external file dependency)
roadmap_data = parse_official_data_text(OFFICIAL_ROADMAP_TEXT)
if not roadmap_data:
    # Fallback minimal structure
    roadmap_data = { 'Week 1: Foundations - Focus on Basics': { 'monday': { 'morning': { 'title': 'Start', 'description': '' }, 'night': { 'title': 'Continue', 'description': '' } } } }

@app.route('/api/roadmap')
def get_roadmap():
    return jsonify(roadmap_data)

@app.route('/api/progress', methods=['GET'])
def get_progress():
    db_data = read_db()
    return jsonify(db_data.get('userProgress', {}))

@app.route('/api/progress', methods=['POST'])
def save_progress():
    user_progress = request.json
    if user_progress is not None:
        db_data = read_db()
        # Simple merge, for more complex data you might want a deeper merge
        db_data['userProgress'].update(user_progress)
        write_db(db_data)
        return jsonify({"message": "Progress saved successfully!"})
    return jsonify({"message": "No data provided"}), 400

if __name__ == '__main__':
    app.run(debug=True, port=8000)
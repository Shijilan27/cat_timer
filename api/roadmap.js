export const config = { runtime: 'nodejs' };

import { head, put } from '@vercel/blob';

const ROADMAP_PATH = 'small-data/roadmap.json';
// Embed the official roadmap text to avoid relying on a separate file
const OFFICIAL_ROADMAP_TEXT = `
${`Week 1: Foundations - Focus on Basics
•\tMonday:
o\tMorning (2 hrs): Verbal Ability and Reading Comprehension - Introduction to Reading Comprehension (Chapter: Reading Comprehension Strategies); practice 2-3 basic passages.
o\tNight (2 hrs): Quantitative Aptitude - Arithmetic Basics: Percentages and Ratios (Chapter: Percentages, Ratios); solve 20 LOD 1 questions.
•\tTuesday:
o\tMorning (2 hrs): Verbal Ability and Reading Comprehension - Vocabulary Building: Root Words (Chapter: Vocabulary Enhancement); learn 20 words with examples.
o\tNight (2 hrs): Quantitative Aptitude - Profit, Loss, and Simple Interest (Chapter: Profit/Loss, Interest); practice 20-30 questions.
•\tWednesday:
o\tMorning (2 hrs): Data Interpretation - Basics of Data Interpretation: Tables and Charts (Chapter: Tables); understand formats, solve 5 examples.
o\tNight (2 hrs): Verbal Ability and Reading Comprehension - Grammar Focus: Sentence Correction (Chapter: Sentence Correction); practice 15 exercises.
•\tThursday:
o\tMorning (2 hrs): Quantitative Aptitude - Algebra Basics: Linear Equations (Chapter: Linear Equations); review theory, solve 10 problems.
o\tNight (2 hrs): Logical Reasoning - Logical Reasoning Basics: Arrangements (Chapter: Arrangements); solve 5 sets.
•\tFriday:
o\tMorning (2 hrs): Verbal Ability and Reading Comprehension - Practice Para-Jumbles Basics (Chapter: Para-Jumbles); solve 10 sets.
o\tNight (2 hrs): Quantitative Aptitude - Number Systems Basics: Factors and Multiples (Chapter: Number Systems); solve 20 LOD 1 questions.
•\tSaturday:
o\tMorning (2 hrs): Mixed Review - Revise weak Verbal Ability and Reading Comprehension, Quantitative Aptitude topics; flashcards for 20 words.
o\tNight (2 hrs): Logical Reasoning - Basic Puzzles (Chapter: Puzzle Tests); practice 10 questions.
•\tSunday:
o\tFull Mock Test (3 hours, from book) + analysis; focus on time management.
Week 2: Foundations - Build Momentum
•\tMonday:
o\tMorning (2 hrs): Data Interpretation - Bar Graphs and Pie Charts (Chapter: Bar Graphs); study theory, solve 5 examples.
o\tNight (2 hrs): Quantitative Aptitude - Geometry Basics: Triangles (Chapter: Triangles); solve 15 LOD 1-2 questions.
•\tTuesday:
o\tMorning (2 hrs): Verbal Ability and Reading Comprehension - Practice Inference Questions in Reading Comprehension (Chapter: Inference-Based RC); solve 3 passages.
o\tNight (2 hrs): Logical Reasoning - Logical Reasoning Sequencing Problems (Chapter: Logical Sequences); solve 5-7 sets.
•\tWednesday:
o\tMorning (2 hrs): Quantitative Aptitude - Time, Speed, and Distance (Chapter: Time/Speed/Distance); review formulas, solve 20 problems.
o\tNight (2 hrs): Verbal Ability and Reading Comprehension - Critical Reasoning: Assumptions (Chapter: Critical Reasoning); practice 15 questions.
•\tThursday:
o\tMorning (2 hrs): Data Interpretation - Mixed Data Interpretation Sets (Chapter: Mixed DI); practice 4 timed sets.
o\tNight (2 hrs): Quantitative Aptitude - Algebra: Quadratic Equations (Chapter: Quadratic Equations); solve 15 LOD 1 questions.
•\tFriday:
o\tMorning (2 hrs): Verbal Ability and Reading Comprehension - Vocabulary: Synonyms and Antonyms (Chapter: Vocabulary Enhancement); learn 20 words.
o\tNight (2 hrs): Logical Reasoning - Logical Puzzles: Blood Relations (Chapter: Blood Relations); solve 10 sets.
•\tSaturday:
o\tMorning (2 hrs): Quantitative Aptitude Review - Revise Arithmetic weaknesses (e.g., Percentages); solve 20 mixed questions.
o\tNight (2 hrs): Verbal Ability and Reading Comprehension - Para Summaries Practice (Chapter: Para-Summaries); solve 10 sets.
•\tSunday:
o\tFull Mock Test (3 hours) + analysis; evaluate section scores.
Week 3: Foundations - Integrate Basics
•\tMonday:
o\tMorning (2 hrs): Verbal Ability and Reading Comprehension - Reading Comprehension: Tone and Style Questions (Chapter: Tone/Style in RC); solve 3-4 passages.
o\tNight (2 hrs): Data Interpretation - Data Interpretation: Line Graphs (Chapter: Line Graphs); practice 5 timed examples.
•\tTuesday:
o\tMorning (2 hrs): Quantitative Aptitude - Modern Math Basics: Permutations (Chapter: Permutations); review concepts, solve 10 problems.
o\tNight (2 hrs): Verbal Ability and Reading Comprehension - Odd Sentence Out Practice (Chapter: Odd Sentence Out); solve 15 exercises.
•\tWednesday:
o\tMorning (2 hrs): Logical Reasoning - Logical Reasoning: Syllogisms (Chapter: Syllogisms); study rules, solve 10 questions.
o\tNight (2 hrs): Quantitative Aptitude - Geometry: Circles (Chapter: Circles); solve 15 LOD 2 questions.
•\tThursday:
o\tMorning (2 hrs): Verbal Ability and Reading Comprehension - Advanced Grammar Review (Chapter: Grammar Rules); correct 15 sentences.
o\tNight (2 hrs): Data Interpretation - Caselets in Data Interpretation (Chapter: Caselets); solve 5 mixed sets.
•\tFriday:
o\tMorning (2 hrs): Quantitative Aptitude - Number Systems: Advanced Factors (Chapter: Number Systems); solve 20 questions.
o\tNight (2 hrs): Verbal Ability and Reading Comprehension - Vocabulary Application in Sentences (Chapter: Vocabulary Usage); practice 20 words.
•\tSaturday:
o\tMorning (2 hrs): Mixed Basics Review - All sections; solve 10 quick questions each.
o\tNight (2 hrs): Logical Reasoning - Puzzle Sets (Chapter: Puzzle Tests); solve 7-10.
•\tSunday:
o\tFull Mock Test (3 hours) + analysis; identify weak areas.
Week 4: Advanced - Ramp Up Difficulty
•\tMonday:
o\tMorning (2 hrs): Quantitative Aptitude - Arithmetic: Mixtures and Alligations (Chapter: Mixtures/Alligations); solve 15 LOD 2-3 questions.
o\tNight (2 hrs): Verbal Ability and Reading Comprehension - Complex Reading Comprehension Passages (Chapter: Advanced RC); solve 4 timed.
•\tTuesday:
o\tMorning (2 hrs): Data Interpretation - Advanced Data Interpretation Charts (Chapter: Pie Charts/Bar Graphs); practice 5 sets.
o\tNight (2 hrs): Quantitative Aptitude - Algebra: Inequalities (Chapter: Inequalities); solve 20-25 questions.
•\tWednesday:
o\tMorning (2 hrs): Verbal Ability and Reading Comprehension - Advanced Para-Jumbles (Chapter: Para-Jumbles); solve 15 sets.
o\tNight (2 hrs): Logical Reasoning - Logical Reasoning: Grouping Problems (Chapter: Team Formation); solve 5 timed sets.
•\tThursday:
o\tMorning (2 hrs): Quantitative Aptitude - Geometry: Mensuration (Chapter: Mensuration); solve 15 LOD 3 questions.
o\tNight (2 hrs): Verbal Ability and Reading Comprehension - Critical Reasoning: Strengthen and Weaken Arguments (Chapter: Critical Reasoning); practice 15.
•\tFriday:
o\tMorning (2 hrs): Data Interpretation - Mixed Data Interpretation and Logical Reasoning (Chapter: Logical DI); solve 5 full sets.
o\tNight (2 hrs): Quantitative Aptitude - Time and Work (Chapter: Time/Work); solve 20 advanced problems.
•\tSaturday:
o\tMorning (2 hrs): Verbal Ability and Reading Comprehension Review - Vocabulary quiz (50 words) + RC errors (Chapter: Vocabulary).
o\tNight (2 hrs): Quantitative Aptitude - Modern Math: Combinations (Chapter: Combinations); solve 15 questions.
•\tSunday:
o\tFull Mock Test (3 hours) + analysis; improve timing.
Week 5: Advanced - Mixed Practice
•\tMonday:
o\tMorning (2 hrs): Data Interpretation - Data Interpretation: Data Sufficiency (Chapter: Data Sufficiency); review theory, solve 10 examples.
o\tNight (2 hrs): Quantitative Aptitude - Number Systems: Remainders (Chapter: Number Systems); solve 20 LOD 3 questions.
•\tTuesday:
o\tMorning (2 hrs): Verbal Ability and Reading Comprehension - Multi-Paragraph Reading Comprehension (Chapter: Advanced RC); solve 4 passages.
o\tNight (2 hrs): Logical Reasoning - Advanced Logical Reasoning Puzzles (Chapter: Puzzle Tests); solve 7 sets.
•\tWednesday:
o\tMorning (2 hrs): Quantitative Aptitude - Algebra: Functions (Chapter: Functions); solve 15 questions.
o\tNight (2 hrs): Verbal Ability and Reading Comprehension - Sentence Completion (Chapter: Sentence Completion); solve 20 questions.
•\tThursday:
o\tMorning (2 hrs): Data Interpretation - Caselet-Based Data Interpretation (Chapter: Caselets); solve 5 timed sets.
o\tNight (2 hrs): Quantitative Aptitude - Geometry: Coordinate Geometry (Chapter: Coordinate Geometry); solve 15 LOD 2-3 questions.
•\tFriday:
o\tMorning (2 hrs): Verbal Ability and Reading Comprehension - Vocabulary: Idioms (Chapter: Vocabulary Enhancement); learn 20 with examples.
o\tNight (2 hrs): Logical Reasoning - Logical Deduction Problems (Chapter: Logical Deduction); solve 10 questions.
•\tSaturday:
o\tMorning (2 hrs): Quantitative Aptitude Review - Solve 20 mixed sets from weak areas.
o\tNight (2 hrs): Verbal Ability and Reading Comprehension - Para-Completion Practice (Chapter: Para-Completion); solve 15 sets.
•\tSunday:
o\tFull Mock Test (3 hours) + analysis; focus on accuracy.
Week 6: Advanced - Sectional Integration
•\tMonday:
o\tMorning (2 hrs): Quantitative Aptitude - Modern Math: Probability (Chapter: Probability); solve 15 advanced questions.
o\tNight (2 hrs): Verbal Ability and Reading Comprehension - Inference-Heavy Reading Comprehension (Chapter: Inference-Based RC); solve 4 passages.
•\tTuesday:
o\tMorning (2 hrs): Data Interpretation - Data Interpretation: Growth Rates (Chapter: Quantitative DI on Percentages); practice 5 sets.
o\tNight (2 hrs): Quantitative Aptitude - Arithmetic: Averages (Chapter: Averages); solve 20 LOD 3 questions.
•\tWednesday:
o\tMorning (2 hrs): Verbal Ability and Reading Comprehension - Mixed Critical Reasoning (Chapter: Critical Reasoning); solve 20 questions.
o\tNight (2 hrs): Logical Reasoning - Logical Reasoning: Networks and Paths (Chapter: Network Diagrams); solve 5 sets.
•\tThursday:
o\tMorning (2 hrs): Quantitative Aptitude - Algebra: Series and Progressions (Chapter: Series); solve 15 questions.
o\tNight (2 hrs): Verbal Ability and Reading Comprehension - Full Grammar Review (Chapter: Grammar Rules) + error correction.
•\tFriday:
o\tMorning (2 hrs): Data Interpretation - Full Sectional Test (Chapter: Mock Tests); solve 5 mixed sets.
o\tNight (2 hrs): Quantitative Aptitude - Geometry Review (Chapter: Geometry); solve 20 mixed questions.
•\tSaturday:
o\tMorning (2 hrs): Mixed Advanced Practice - 10 questions each from all sections.
o\tNight (2 hrs): Verbal Ability and Reading Comprehension - Vocabulary Consolidation (Chapter: Vocabulary) quiz 50 words.
•\tSunday:
o\tFull Mock Test (3 hours) + analysis; simulate exam pressure.
Week 7: Revision - Consolidate and Test
•\tMonday:
o\tMorning (2 hrs): Verbal Ability and Reading Comprehension - Full Revision of Key Chapters (e.g., RC Strategies).
o\tNight (2 hrs): Quantitative Aptitude - Timed Sets from Weak Topics (20 questions).
•\tTuesday:
o\tMorning (2 hrs): Data Interpretation - Revise Data Interpretation Types (e.g., Tables, Graphs); practice 5 sets.
o\tNight (2 hrs): Verbal Ability and Reading Comprehension - Reading Comprehension Mocks (solve 4 passages).
•\tWednesday:
o\tMorning (2 hrs): Quantitative Aptitude - Full Revision: Formulas and LOD 3 Questions (20 total).
o\tNight (2 hrs): Logical Reasoning - Logical Reasoning Mocks (solve 7 sets).
•\tThursday:
o\tMorning (2 hrs): Verbal Ability and Reading Comprehension - Vocabulary and Grammar Quiz (50 items).
o\tNight (2 hrs): Quantitative Aptitude - Mixed Sectional Practice (20 questions).
•\tFriday:
o\tMorning (2 hrs): Data Interpretation - Full Revision of Key Concepts (e.g., Caselets).
o\tNight (2 hrs): Verbal Ability and Reading Comprehension - Error Analysis from Past Practices.
•\tSaturday:
o\tMorning (2 hrs): All Sections - Quick Formula and Vocabulary Review.
o\tNight (2 hrs): Mixed Practice Sets (10 per section).
•\tSunday:
o\t2 Full Mock Tests (morning + night) + analysis.
Week 8: Intensive Mocks and Final Polish
•\tMonday:
o\tMorning (2 hrs): Verbal Ability and Reading Comprehension - Sectional Mock.
o\tNight (2 hrs): Quantitative Aptitude - Error Review (20 questions).
•\tTuesday:
o\tMorning (2 hrs): Data Interpretation - Sectional Mock.
o\tNight (2 hrs): Verbal Ability and Reading Comprehension - Final Reading Comprehension Practice (4 passages).
•\tWednesday:
o\tMorning (2 hrs): Quantitative Aptitude - Sectional Mock.
o\tNight (2 hrs): Logical Reasoning - Error Review.
•\tThursday:
o\tMorning (2 hrs): Mixed Sectional (Verbal Ability and Reading Comprehension + Quantitative Aptitude).
o\tNight (2 hrs): Full Revision Notes (key formulas, tips).
•\tFriday:
o\tMorning (2 hrs): Mixed Sectional (Data Interpretation + Logical Reasoning + Verbal Ability and Reading Comprehension).
o\tNight (2 hrs): Quantitative Aptitude - Final Tweaks (15 questions).
•\tSaturday:
o\tMorning (2 hrs): Light Review - All Weak Areas.
o\tNight (2 hrs): Exam Strategy Notes.
•\tSunday:
o\t2 Full Mock Tests + analysis; focus on mindset.`}
`;

function parseDataTxt(text) {
  const lines = text.split(/\r?\n/).map(l => l.trim()).filter(Boolean);
  const weeks = {};
  const daysSet = new Set(['monday','tuesday','wednesday','thursday','friday','saturday','sunday']);
  let currentWeek = null;
  let currentDay = null;

  function ensureDay(week, day) {
    if (!week[day]) week[day] = { morning: { title: '', description: '' }, night: { title: '', description: '' } };
  }

  for (const ln of lines) {
    if (ln.toLowerCase().startsWith('week ')) {
      currentWeek = ln;
      weeks[currentWeek] = { title: ln.split(':', 1)[1]?.trim() || '' };
      currentDay = null;
      continue;
    }
    if ((ln.startsWith('•') || ln.startsWith('*') || ln.startsWith('-')) && ln.includes(':')) {
      const dayName = ln.split(':',1)[0].replace(/[•*-]/g,'').trim().toLowerCase();
      if (daysSet.has(dayName)) {
        currentDay = dayName;
        ensureDay(weeks[currentWeek], currentDay);
      }
      continue;
    }
    if (ln.startsWith('o')) {
      let content = ln.replace(/^o\s*/, '');
      const lower = content.toLowerCase();
      let session = null;
      if (lower.startsWith('morning')) session = 'morning';
      if (lower.startsWith('night')) session = session ? session : 'night';
      const rest = content.includes(':') ? content.split(':',1)[1].trim() : content;
      let title = rest, description = '';
      if (rest.includes(' - ')) {
        const parts = rest.split(' - ');
        title = parts[0].trim();
        description = parts.slice(1).join(' - ').trim();
      }
      if (currentWeek && currentDay) {
        ensureDay(weeks[currentWeek], currentDay);
        if (!session) {
          weeks[currentWeek][currentDay].morning = { title, description };
          weeks[currentWeek][currentDay].night = { title, description };
        } else {
          weeks[currentWeek][currentDay][session] = { title, description };
        }
      }
    }
  }
  return weeks;
}

async function readJsonBody(req) {
  try {
    const chunks = [];
    for await (const chunk of req) chunks.push(chunk);
    const raw = Buffer.concat(chunks).toString('utf8');
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export default async function handler(req, res) {
  const { method } = req;

  try {
    if (method === 'GET') {
      const meta = await head(ROADMAP_PATH).catch(() => null);
      if (!meta) {
        // Seed blob with roadmap parsed from embedded official text
        let defaultRoadmap = parseDataTxt(OFFICIAL_ROADMAP_TEXT);
        if (!defaultRoadmap || Object.keys(defaultRoadmap).length === 0) defaultRoadmap = {};

        await put(ROADMAP_PATH, JSON.stringify(defaultRoadmap), {
          access: 'public',
          contentType: 'application/json',
          addRandomSuffix: false
        });
        return res.status(200).setHeader('cache-control', 'no-store').json(defaultRoadmap);
      }

      const download = await fetch(meta.url, { cache: 'no-store' });
      if (!download.ok) {
        return res.status(500).json({ error: 'Failed to download roadmap blob' });
      }
      const data = await download.json();
      return res.status(200).setHeader('cache-control', 'no-store').json(data);
    }

    if (method === 'POST' || method === 'PUT') {
      const payload = await readJsonBody(req);
      await put(ROADMAP_PATH, JSON.stringify(payload), {
        access: 'public',
        contentType: 'application/json',
        addRandomSuffix: false
      });
      return res.status(200).json({ ok: true });
    }

    return res.status(405).send('Method Not Allowed');
  } catch (error) {
    return res.status(500).json({ error: 'Roadmap handler error', details: String(error) });
  }
}


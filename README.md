# Kerala HSE Digital Campus

An integrated, configurable digital learning world for Kerala Higher Secondary students (Plus One and Plus Two) across the Science, Commerce and Humanities streams.

**Tagline:** Learn • Practice • Experience • Create Your Future

The whole platform is a static site: HTML, CSS and plain JavaScript modules on a `window.HSE` global. It needs no build step, no server and no external packages. Accounts, curriculum edits and student progress are stored in the browser (`localStorage`, key `kerala-hse-v1`).

## Run it

Open `index.html` directly in a browser, or serve the folder:

```bash
python3 -m http.server 8000
# then open http://localhost:8000
```

## Demo profiles

No passwords. Pick a profile on the sign-in page.

| Profile | Role | Notes |
| --- | --- | --- |
| Dr. Anil Kumar | School administrator | Curriculum and school settings |
| Meera Nair | Teacher | Physics, Chemistry, Mathematics, English |
| Suresh Menon | Teacher | Accountancy, Business Studies, Economics |
| Latha Pillai | Teacher | History, Political Science, Geography, Sociology, Psychology, Malayalam |
| Aiswarya R. | Student | Science, Plus One, with sample progress |
| Rahul K. | Student | Commerce, Plus Two, with sample progress |
| Fatima S. | Student | Humanities, Plus One |
| Anjali M. | Student | Created during testing |

Students can also create a profile from **Join as student**, choosing stream, class, language subjects and core subjects.

## What students get

- **Stream and class onboarding** — Science, Commerce or Humanities; Plus One or Plus Two; subject combination and language options.
- **Dashboard** — coverage, test average, practicals, pending work, recent results.
- **A digital classroom per subject** — chapter-wise materials, interactive lessons, practical classes, assignments, projects, teacher-published assessments, chapter tests and full chapter examinations.
- **Chapter lessons** — topic-by-topic notes, stream-specific framing, key ideas, worked examples and a chapter test.
- **Progress tracking** — per-subject syllabus coverage, attempts, scores and practical completions.
- **Practical classes** — one catalog for every subject and class, with filters for Plus One or Plus Two, subject and completion status. Each subject shows its completed and remaining practicals, and every class opens directly in the browser. There are 56 simulations in total; every subject opens with its own dedicated simulation, then links to the shared stream labs, for example:
  - Science: motion, titration, cell biology, circuits, coding, hardware, statistics, perceptron, research survey.
  - Commerce: journal and ledger, financial statements, banking, inventory, break-even, marketing, partnership, business project.
  - Humanities: historical evidence, parliament, public administration, policy budget, map work, newsroom, debate, psychology, philosophy, journalism.
  - Languages: vocabulary, script and skill matching for each configured language.
- **Languages** — English, Malayalam, Hindi, Arabic, Sanskrit and Urdu, each with reading, writing, grammar, communication and assessment activities.

## What teachers get

The teacher console has tabs for **Overview, Materials, Practicals, Assignments, Projects, Assessments, Evaluate and Students**.

- Publish chapter materials to a subject, class and chapter.
- Create practical activities linked to a simulation.
- Assign homework and projects with due dates and maximum marks.
- Add multiple-choice questions to chapter examinations (one question per line: `question | option A | option B | option C | option D | correctIndex | explanation`).
- Grade submitted assignments and projects with a score and feedback.
- Monitor students in their own subjects.

## Curriculum administration

The **Curriculum admin** console lets a school:

- Edit the school profile (name, academic year, school code).
- Toggle which subjects each stream offers for the selected academic year.
- Enable or disable language subjects.
- Export the full curriculum as JSON and import a revised curriculum.
- Restore the DHSE seed curriculum (student accounts and progress are kept).

The curriculum is data, not code. Subject combinations can differ by school and academic year, and future DHSE syllabus updates can be imported without rebuilding the application.

## Project structure

```
index.html                     app shell and script order
assets/css/app.css             design system, layout and responsive rules
assets/js/
  data-curriculum-core.js      meta, school, streams, languages, parser, build/export
  data-subjects-science.js     Science subjects and practicals
  data-subjects-commerce.js    Commerce subjects and practicals
  data-subjects-humanities.js  Humanities subjects and practicals
  data-languages.js            Language subjects generated from language settings
  data-questions-*.js          Question banks per stream
  questions.js                 question resolution for tests and exams
  store.js                     localStorage store, seed data, selectors, mutations
  ui.js                        escaping, dates, toasts, modals, SVG rings
  app.js                       hash router, shell, header/footer, boot
  views-auth.js                landing, login, join
  views-student.js             dashboard, classrooms, chapters, progress
  views-practice.js            chapter tests and examinations
  views-teacher.js             teacher console and grading
  views-admin.js               curriculum administration and JSON import/export
  labs.js                      shared practical engine
  labs-science.js              science simulations
  labs-commerce.js             commerce simulations
  labs-humanities.js           humanities and language simulations
  labs-subjects-science.js     per-subject science simulations
  labs-subjects-commerce.js    per-subject commerce simulations
  labs-subjects-humanities.js  per-subject humanities simulations
  labs-languages-subjects.js   generated per-language simulations
```

## Data notes

- Everything is local to the browser. Clearing site data resets the campus.
- Demo accounts have no passwords; add real authentication and a backend before using this with real student data.
- Chapter text is compact seed content (`Title :: topic | topic`), intended to be replaced or extended by teachers and curriculum administrators.
- The curriculum seed follows the DHSE Kerala Plus One / Plus Two subject structure, with 21 core subjects and 6 configurable language subjects.
- Every subject's first practical uses the dedicated `sim-sub-<subject>` simulation. Language simulations are generated from the configurable language list, so a language added by an administrator gets a lab automatically. Curriculum saved by an earlier version is upgraded on load.

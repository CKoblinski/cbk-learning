/* ========================================
   AILA Fall 2026 — Pre-survey data
   ----------------------------------------
   To add a response: copy the last object, bump the id, fill it in.
   Then update LAST_UPDATED. Nothing else needs to change.

   Names and email addresses are deliberately NOT in this file.
   "who" is role + who they serve. Free text is verbatim from the
   survey, typos included — that is the point of the raw tab.
   ======================================== */

const REGISTERED = 18;                 // people signed up for the academy
const LAST_UPDATED = 'August 6, 2026'; // date of the most recent response below

const HOURS_BANDS = ['Under 10', '10-50', '51-150', '151-500', '500+'];
const CONF_BANDS = ['1 = not yet', '2-3 = experimented, nothing stuck', '4 = a few reliable uses', '5-6 = confident where it fits', '7 = it is core to how I work'];
const UDL_BANDS = ['1 = new to UDL', '2-3 = a few supports when time allows', '4-5 = I design with UDL from the start'];

/* ----------------------------------------
   Registration roster — all REGISTERED people, whether or not they
   filled in the pre-survey. Separate population from RESPONSES below.
   Fields are verbatim from the registration sheet, including spelling
   variants in organization names. Blank membership = left blank.
   ---------------------------------------- */
/* Entries typed differently at registration that name the same organization.
   Add a line here if another variant turns up. */
const ORG_ALIASES = {
  'Paso Robles Join Unified School District': 'Paso Robles Joint Unified School District',
  'Lifelong Learning Corp': 'Lifelong Learning Administration Corporation',
  'AUSD': 'Alisal Union School District'
};

const ROSTER = [
  { membership: 'CALIE Member', grade: 'High School (9–12)', org: 'Paso Robles Joint Unified School District', roleGroup: 'Instructional Support & Coaching', title: 'Instructional Coach', subject: 'Literacy' },
  { membership: 'CALIE Member', grade: 'High School (9–12)', org: 'Kern High School District', roleGroup: 'Instructional Support & Coaching', title: 'TOSA New Teacher Support', subject: 'Science' },
  { membership: 'CALIE Member', grade: 'K–12', org: 'Paso Robles Join Unified School District', roleGroup: 'Instructional Support & Coaching', title: 'Ed Tech TOSA', subject: 'Tech' },
  { membership: 'CALIE Member', grade: 'N/A', org: 'San Diego County Office of Education', roleGroup: 'School, District or County Administrator', title: 'Coordinator Educational Technology', subject: 'Educational Technology' },
  { membership: 'CALIE Member', grade: 'Elementary (K–5)', org: 'Alisal Union School District', roleGroup: 'School, District or County Administrator', title: 'Director of Innovation Design and Learning', subject: 'All' },
  { membership: 'CALIE Member', grade: 'High School (9–12)', org: 'Kern High School District', roleGroup: 'Instructional Support & Coaching', title: 'Induction Coordinator', subject: 'Induction' },
  { membership: 'CALIE Member', grade: 'High School (9–12)', org: 'Banning Unified', roleGroup: 'Classroom Educator', title: 'SAI Teacher', subject: 'Special Education' },
  { membership: 'CALIE Member', grade: 'Elementary (K–5)', org: 'AUSD', roleGroup: 'Classroom Educator', title: 'VAPA TOSA', subject: 'Visual & performing Arts' },
  { membership: '', grade: 'K–12', org: 'Lifelong Learning Administration Corporation', roleGroup: 'Instructional Support & Coaching', title: 'Director, Education - Professional Learning and Program Implementation', subject: 'National Educational Services' },
  { membership: '', grade: 'High School (9–12)', org: 'Lifelong Learning Corp', roleGroup: 'School, District or County Administrator', title: 'Vice President, Educational Services', subject: 'All subjects' },
  { membership: '', grade: 'K–12', org: 'Lifelong Learning Administration Corporation', roleGroup: 'Instructional Support & Coaching', title: 'Director, Education - Program Strategy and Development', subject: 'Curriculum Instruction' },
  { membership: 'CALIE Member', grade: 'K–12', org: 'Edison Township Public Schools', roleGroup: 'School, District or County Administrator', title: 'Coordinator of Access & Engagement', subject: 'K-12' },
  { membership: '', grade: 'Middle School (6–8)', org: 'San Carlos School District', roleGroup: 'Classroom Educator', title: 'Math and Computer Science teacher', subject: 'Math/CS' },
  { membership: '', grade: 'Middle School (6–8)', org: 'Sand Creek International School', roleGroup: 'Instructional Support & Coaching', title: 'IB Coordinator/AI Coordinator', subject: 'IB/AI Coordinator' },
  { membership: 'CALIE Member', grade: 'Elementary (K–5)', org: 'Alisal Union School District', roleGroup: 'Instructional Support & Coaching', title: 'Teacher On Special Assignment - Technology Trainer', subject: 'Educational Technology' },
  { membership: 'CALIE Member', grade: 'Elementary (K–5)', org: 'Alisal Union School District', roleGroup: 'Instructional Support & Coaching', title: 'TOSA - Technology Trainer', subject: 'Educational Technology' },
  { membership: 'CALIE Member', grade: 'K–12', org: 'San Mateo County Office of Education', roleGroup: 'School, District or County Administrator', title: 'Coordinator, Instructional Technology and Artificial Intelligence', subject: 'Instructional Technology and Artificial Intelligence' },
  { membership: 'CALIE Member', grade: 'Elementary (K–5)', org: 'Santa Paula USD', roleGroup: 'School, District or County Administrator', title: 'School Principal', subject: 'Elementary School' }
];

const RESPONSES = [
  {
    id: 1, role: 'District admin/office', grade: 'Adults (PD, staff)', years: '10-19',
    influence: 'Beyond my district', hours: '51-150', conf: '4', archetype: 'Tinkerer',
    tried: ['ChatGPT', 'Microsoft Copilot', 'NotebookLM', 'Gamma'],
    kept: ['ChatGPT', 'Microsoft Copilot', 'NotebookLM', 'Gamma'],
    practice: 'Use in emails, presentations, debriefs',
    learn: 'What is up and coming and how this affects education as a whole',
    concerns: ['Academic integrity', 'Student overreliance', 'Environmental impact', 'Misinformation/deepfakes', 'Cost/vendor trust'],
    worse: 'Academic integrity and cheating', integrity: 'Regular occurrence',
    hear: 'The ethical implications', wish: 'How to talk to students about AI',
    oneUse: 'AI as a learning tool for students to use', wantTool: 'Claude',
    udl: '4-5', udlSupports: ['Translation tools', 'Summaries/chunked text']
  },
  {
    id: 2, role: 'District admin/office', grade: 'Grades 9-12', years: '20+',
    influence: 'My school / district', hours: '51-150', conf: '5-6', archetype: 'Tinkerer',
    tried: ['ChatGPT', 'Claude', 'Gemini', 'Microsoft Copilot', 'NotebookLM', 'Canva AI', 'Gamma'],
    kept: ['Claude', 'Microsoft Copilot', 'NotebookLM', 'Canva AI', 'Gamma'],
    practice: 'Content building, analyzing data, research, creating reports',
    learn: 'How to create more automations and workflows to build capacity in myself and my team',
    concerns: ['Data privacy', 'Bias/representation', 'Misinformation/deepfakes'],
    worse: 'Academic integrity', integrity: 'Never',
    hear: 'Students only use it to cheat', wish: 'How to teach students the proper use of AI',
    oneUse: 'Ways to add engaging content to their lessons', wantTool: 'More education-related AI tools and automations',
    udl: '4-5', udlSupports: ['Translation tools', 'Visual aids', 'Summaries/chunked text', 'Text-to-speech/captions', 'Graphic organizers', 'Sentence frames', 'Flexible pacing']
  },
  {
    id: 3, role: 'School administrator', grade: 'Grades 3-5', years: '10-19',
    influence: 'My school / district', hours: 'Under 10', conf: '4', archetype: 'One prompt and done',
    tried: ['ChatGPT', 'MagicSchool', 'Gamma'],
    kept: ['ChatGPT'],
    practice: 'Generate ideas for staff meetings, approaching difficult conversations, scheduling',
    learn: 'How best to support teachers with making practice more efficient and more valuable for planning and assessment',
    concerns: ['Academic integrity', 'Student overreliance', 'Misinformation/deepfakes'],
    worse: 'Cyberbullying using deep fakes', integrity: 'Once or twice',
    hear: 'Academic integrity', wish: 'How to use it to improve practice',
    oneUse: 'A critical thought partner to improve quality of existing materials/assessments', wantTool: 'None in particular',
    udl: '4-5', udlSupports: ['Translation tools', 'Visual aids', 'Summaries/chunked text', 'Text-to-speech/captions', 'Graphic organizers', 'Sentence frames']
  },
  {
    id: 4, role: 'County office AI coordinator', grade: 'Adults (PD, staff)', years: '20+',
    influence: 'Beyond my district', hours: '151-500', conf: '5-6', archetype: 'Tinkerer',
    tried: ['ChatGPT', 'Claude', 'Gemini', 'Microsoft Copilot', 'NotebookLM', 'Canva AI', 'Suno', 'Image generators', 'Custom GPTs/bots', 'Grok', 'Local LLMs'],
    kept: ['Claude', 'Gemini', 'Image generators'],
    practice: 'Designed a chatbot to support makers; Claude automations searching district sites; voice chat to think out loud before a big meeting',
    learn: 'How leaders like you and CALIE speak to educators about AI, and which ideas matter most',
    concerns: ['Student overreliance', 'Misinformation/deepfakes', 'Losing human connection'],
    worse: 'AI-generated homework responses that take less cognition than the old workarounds', integrity: 'Never',
    hear: 'Taking jobs; taking away thinking; overreliance; fun use cases', wish: 'Engaging students in the conversation; self-restraint and skill development',
    oneUse: 'AI as constructive feedback in iteration of work', wantTool: '',
    udl: '4-5', udlSupports: ['Translation tools', 'Visual aids', 'Summaries/chunked text', 'Graphic organizers', 'Sentence frames', 'Choice boards/formats']
  },
  {
    id: 5, role: 'District admin/office', grade: 'Adults (PD, staff)', years: '20+',
    influence: 'My school / district', hours: '151-500', conf: '4', archetype: 'Tinkerer',
    tried: ['ChatGPT', 'Gemini', 'NotebookLM', 'Canva AI', 'Gamma', 'Suno'],
    kept: ['ChatGPT', 'Gemini', 'NotebookLM', 'Canva AI', 'Gamma', 'Suno'],
    practice: 'ChatGPT daily as a thought partner; Canva for presentations, graphics and translation; NotebookLM to unpack doctorate reading',
    learn: 'Everything I can',
    concerns: ['Student overreliance', 'Data privacy', 'Misinformation/deepfakes'],
    worse: 'Getting the higher-ups on board with educating youth about AI, safely', integrity: 'Never',
    hear: 'Fake images or videos on social media, ChatGPT', wish: 'The benefits of using it as a tool',
    oneUse: 'How to make lessons more engaging and integrated', wantTool: 'Google Suite (district is all Google)',
    udl: '4-5', udlSupports: ['Translation tools', 'Visual aids', 'Text-to-speech/captions', 'Graphic organizers', 'Sentence frames', 'Choice boards/formats']
  },
  {
    id: 6, role: 'Instructional coach', grade: 'Grades 9-12', years: '10-19',
    influence: 'My school / district', hours: '51-150', conf: '4', archetype: 'Tinkerer',
    tried: ['ChatGPT', 'Gemini', 'NotebookLM', 'MagicSchool'],
    kept: ['ChatGPT', 'Gemini', 'NotebookLM'],
    practice: 'Thought partner turning district priorities into practical classroom support; a tool that reads a lesson through the strategic plan, UDL and vocabulary lenses — with professional judgment on top',
    learn: 'Take the next step to be indispensable to my district; EdD with an AI focus ahead',
    concerns: ['Student overreliance', 'Misinformation/deepfakes', 'Losing human connection'],
    worse: 'Academic integrity. Students losing skills.', integrity: 'Regular occurrence',
    hear: 'The fear of the future in many different regards', wish: 'The potential positive impacts AI could have',
    oneUse: 'It will save you time, our most valuable asset', wantTool: 'Claude / Canva / Adobe',
    udl: '4-5', udlSupports: ['Translation tools', 'Visual aids', 'Summaries/chunked text', 'Text-to-speech/captions', 'Graphic organizers', 'Sentence frames', 'Choice boards/formats']
  },
  {
    id: 7, role: 'Instructional coach', grade: 'Grades 9-12', years: '10-19',
    influence: 'My school / district', hours: '51-150', conf: '5-6', archetype: 'Tinkerer',
    tried: ['ChatGPT', 'Claude', 'Gemini', 'NotebookLM', 'Canva AI', 'MagicSchool', 'Brisk'],
    kept: ['Microsoft Copilot', 'NotebookLM', 'Canva AI'],
    practice: 'Edit the Ed Services newsletter; learning how to better help our teachers',
    learn: 'How to roll it out to teachers and students safely; how to reach the skeptics',
    concerns: ['Academic integrity', 'Environmental impact', 'Misinformation/deepfakes'],
    worse: 'Cheating with students', integrity: 'Once or twice',
    hear: 'Environmental impacts, students cheating and not learning anymore', wish: 'Its ability as a brainstorm partner; freeing time from menial tasks',
    oneUse: 'Time saving', wantTool: 'Gemini + Calendar integration; Google AI Studio',
    udl: '2-3', udlSupports: ['Translation tools', 'Visual aids', 'Summaries/chunked text', 'Text-to-speech/captions', 'Graphic organizers', 'Sentence frames', 'Choice boards/formats', 'Flexible pacing']
  },
  {
    id: 8, role: 'Classroom teacher', grade: 'Grades 6-8', years: '10-19',
    influence: 'My own classroom', hours: '51-150', conf: '4', archetype: 'Tinkerer',
    tried: ['ChatGPT', 'Gemini', 'NotebookLM', 'MagicSchool', 'SchoolAI'],
    kept: ['ChatGPT', 'Gemini', 'MagicSchool'],
    practice: 'Teaches AI literacy (Day of AI curriculum); MagicSchool research assistant in debate class',
    learn: 'How to use Claude and SchoolAI',
    concerns: ['Academic integrity', 'Student overreliance', 'Effects on jobs'],
    worse: 'Debate students using AI to write full cases', integrity: 'Once or twice',
    hear: 'A conflict over whether AI will hurt or enhance education', wish: "Students' AI use at home; students who don't know how to prompt",
    oneUse: "MagicSchool's Jeopardy review game for any concept", wantTool: 'Claude; AI grading tools',
    udl: '2-3', udlSupports: ['Graphic organizers', 'Sentence frames']
  },
  {
    id: 9, role: 'TOSA (new teacher support)', grade: 'Grades 9-12', years: '20+',
    influence: 'My school / district', hours: '51-150', conf: '4', archetype: 'Tinkerer',
    tried: ['ChatGPT', 'Gemini', 'Microsoft Copilot', 'NotebookLM', 'Canva AI', 'MagicSchool'],
    kept: ['ChatGPT', 'Gemini', 'NotebookLM', 'Canva AI'],
    practice: 'Analyze program data; create program resources and handouts',
    learn: 'Write better prompts; create more effectively; the right tool for the right job',
    concerns: ['Data privacy', 'Bias/representation', 'Environmental impact'],
    worse: 'Students cheating and just copying and pasting', integrity: 'Once or twice',
    hear: 'That it will be the end of thinking; students only cheat with it', wish: 'Opening possibilities for students; changing assessments to be more complex',
    oneUse: 'Workflow help; a great time-saving tool', wantTool: 'GEMs (from CALIE last year) — how to create them',
    udl: '2-3', udlSupports: ['Translation tools', 'Text-to-speech/captions', 'Graphic organizers']
  },
  {
    id: 10, role: 'Instructional coach', grade: 'Grades 3-5', years: '10-19',
    influence: 'My school / district', hours: '51-150', conf: '5-6', archetype: 'Tinkerer',
    tried: ['ChatGPT', 'Gemini', 'NotebookLM', 'Canva AI', 'MagicSchool', 'Brisk', 'SchoolAI', 'Curipod', 'Suno'],
    kept: ['ChatGPT', 'Gemini', 'NotebookLM'],
    practice: 'Gemini as thought partner for ideas, emails',
    learn: 'Custom chatbots; developing AI policies and procedures for classroom use',
    concerns: ['Environmental impact', 'Misinformation/deepfakes', 'Losing human connection'],
    worse: 'Unsure', integrity: 'Never',
    hear: 'Data privacy and ethical use', wish: 'How to use AI in a meaningful way',
    oneUse: 'Thought partner for developing engaging lessons', wantTool: 'Gemini Gems',
    udl: '4-5', udlSupports: ['Translation tools', 'Visual aids', 'Summaries/chunked text', 'Text-to-speech/captions', 'Graphic organizers', 'Sentence frames', 'Choice boards/formats', 'Flexible pacing']
  },
  {
    id: 11, role: 'TOSA (technology)', grade: 'Early ed-Grade 2', years: '20+',
    influence: 'My school / district', hours: '10-50', conf: '2-3', archetype: 'Tinkerer',
    tried: ['ChatGPT', 'Gemini', 'NotebookLM', 'Canva AI', 'MagicSchool', 'Brisk', 'SchoolAI', 'Suno'],
    kept: ['Gemini'],
    practice: 'AI to help write emails',
    learn: 'How to use AI to create engaging lessons for elementary students',
    concerns: ['Bias/representation', 'Environmental impact', 'Effects on jobs', 'Losing human connection'],
    worse: "Teachers using a variety of AI tools that affect our district's privacy concerns", integrity: 'Never',
    hear: 'That it is fake news', wish: 'How to use it successfully in the classroom',
    oneUse: 'How to write a prompt', wantTool: 'Gemini and NotebookLM',
    udl: '2-3', udlSupports: ['Translation tools', 'Visual aids', 'Summaries/chunked text', 'Graphic organizers', 'Sentence frames', 'Choice boards/formats']
  },
  {
    id: 12, role: 'TOSA (new teacher support)', grade: 'Grades 9-12', years: '20+',
    influence: 'My school / district', hours: '51-150', conf: '4', archetype: 'Tinkerer',
    tried: ['ChatGPT', 'Gemini', 'Microsoft Copilot', 'NotebookLM', 'Canva AI', 'Brisk', 'SchoolAI'],
    kept: ['ChatGPT', 'Gemini', 'NotebookLM', 'Canva AI'],
    practice: 'AI-created visual resource tools in our induction program',
    learn: 'Build a customized AI (Gems etc.) to support mentors working with new teachers',
    concerns: ['Academic integrity', 'Student overreliance', 'Losing human connection'],
    worse: 'We have no district guidance', integrity: 'Regular occurrence',
    hear: "Many of our veteran teachers fear its use as replacement for students' thinking", wish: 'AI as assistive, not replacement, intelligence',
    oneUse: 'NotebookLM to create customized supports for struggling learners', wantTool: 'Gems',
    udl: '4-5', udlSupports: ['Translation tools', 'Visual aids', 'Summaries/chunked text', 'Text-to-speech/captions', 'Graphic organizers', 'Sentence frames', 'Choice boards/formats']
  },
  {
    id: 13, role: 'TOSA (VAPA)', grade: 'Grades 3-5', years: '4-9',
    influence: 'My school / district', hours: '10-50', conf: '5-6', archetype: 'One prompt and done',
    tried: ['ChatGPT', 'Gemini', 'Canva AI', 'MagicSchool', 'Adobe Express'],
    kept: ['ChatGPT', 'MagicSchool', 'Adobe Express'],
    practice: 'Edit, brainstorm, and create; mostly a supportive and editing tool',
    learn: 'More about AI, its usage, and its impact',
    concerns: ['Data privacy', 'Bias/representation', 'Environmental impact'],
    worse: 'Guidelines for AI usage', integrity: 'Never',
    hear: 'Either a lot of fear or a lot of comfort using the platforms', wish: 'The environmental impacts and data privacy',
    oneUse: 'Lesson planning and integrating subjects with the help of AI', wantTool: 'Tools catered to student usage, and how secure they are',
    udl: '4-5', udlSupports: ['Translation tools', 'Visual aids', 'Graphic organizers', 'Sentence frames', 'Choice boards/formats', 'Flexible pacing']
  },
  {
    id: 14, role: 'Classroom teacher', grade: 'Grades 9-12', years: '4-9',
    influence: 'My team or PLC', hours: '51-150', conf: '2-3', archetype: 'Tinkerer',
    tried: ['Microsoft Copilot', 'NotebookLM', 'MagicSchool', 'Brisk'],
    kept: ['NotebookLM', 'MagicSchool', 'Brisk'],
    practice: 'Guided notes, PowerPoint presentations',
    learn: 'How to scaffold general education curriculum towards my special education student needs',
    concerns: ['Academic integrity', 'Environmental impact', 'Misinformation/deepfakes'],
    worse: 'Mis and no information', integrity: 'Once or twice',
    hear: 'That people will abuse it', wish: 'How to make it useful and how to operate it',
    oneUse: 'How to write a prompt', wantTool: 'A breakdown of which AI service is best for which task, and how to best write prompts',
    udl: '2-3', udlSupports: ['Translation tools', 'Summaries/chunked text', 'Graphic organizers', 'Sentence frames']
  }
];

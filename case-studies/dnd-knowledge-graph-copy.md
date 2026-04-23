# D&D Knowledge Graph — Case Study Copy

All written text from the case study, organized by section. Edit this file directly. When you're done, I'll port your changes back into the HTML.

Conventions:
- `[hero-title]`, `[section-title]`, etc. are the slot names
- Paragraphs are separated by blank lines
- `[[ ... ]]` means render this as a special element (pull quote, takeaway box, etc.)
- `<cs-link>text → /case-studies/dnd-pipeline.html</cs-link>` means hyperlink to that path

---

## SECTION 1 — HERO

### [hero-kicker]
Case Study · The Wildemount Knowledge Graph

### [hero-title]
Most AI tools forget everything. This one remembers four years of a complex game.

### [hero-question]
"Walk me through the main villain's story across four years of play."

### [hero-answer]
**Session 47:** First name-drop by a dying NPC. Alyxian. No context.

**Session 63:** Discovered as a prisoner in the Netherdeep. Originally a hero. Fractured into three psychological aspects after a divine bargain with Asmodeus.

**Session 102:** Calli kills Alyxian's archdevil avatar in combat. The Jewel of Three Prayers exalts into its final form.

**Session 114:** Alyxian's true self finally breaks free behind one of the Demon Doors. Bixie and Calli sit at his planning table alongside Melora.

*Pulled from 17 events, 24 nodes, 9 sessions. ~2,800 tokens of subgraph context.*

### [hero-graph-label]
Subgraph for this question · 17 nodes · 9 sessions · ~2,800 tokens

### [hero-stats-strip]
**1,067** entities · **3,051** relationships · **115** sessions · **~10M** tokens of raw transcript, compressed to **3K** per query

### [hero-context]
This graph is four years of labor and love. Me and my friends, every Wednesday night, telling one story over 115 sessions. Over a hundred characters. Twenty-five locations. Every relationship, every betrayal, every promise kept and broken.

I built it as a shortcut for myself. The story is my responsibility as the Game Master amongst all of us. I have to remember which NPC mentored the party in session 47, which villain's name got whispered in session 90, and which promise the party made in session 106. Three references to the same storyline, spread over two and a half years of play. A human brain is bad at this. A markdown file of the whole campaign would run past a hundred pages and still miss the connective tissue.

I also made it so other projects could query the graph and get meaningful knowledge out of it. It helps generate consistent images for the campaign. It helps me build <cs-link>animated recaps of each session → /case-studies/dnd-pipeline.html</cs-link>. And it gives any AI tool a way to answer questions about the full campaign using three thousand tokens of relevant subgraph instead of trying to swallow millions. That's the part that matters for businesses too.

---

## SECTION 2 — THE PROBLEM

### [section-kicker]
The Problem

### [section-title]
Everyone wants an AI that knows everything about them. Nobody has figured out how to give it that.

### [problem-body]
Everybody wants a ChatGPT that remembers every decision their team has made. Sales teams want one that knows the last 18 months of customer history. You probably want one that's read all your Slack messages, every email thread, every meeting transcript, every strategy doc.

The pitch writes itself. The implementation does not.

My version of this problem is worse than yours. 120 sessions of Dungeons & Dragons across four years, in Zoom transcripts, side chats, DM notes, and a shared Google Doc. Each session is two to three hours. Dozens of open plot threads at any given moment.

If I wanted an AI to answer a real question about my campaign, I'd need to feed it all of that. Even with ten sub-agents sweeping in parallel, they still couldn't traverse enough context to tell me what an NPC first said about the main villain in session 47 and then cross-reference it with what the party learned in session 103. Compressed into a markdown file, the campaign runs past a hundred pages. Every query would burn through hundreds of thousands of tokens.

[[punchline]]
So I built a graph instead. Three thousand tokens of relevant subgraph answers the question. The same pattern works for anything a business wants to remember.
[[/punchline]]

---

## SECTION 3 — PLAY WITH IT

### [section-title]
Play with it.

### [section-subtitle]
The actual graph. Live. Click any node. Ask it questions.

### [demo-note]
Runs on a free-tier Cloudflare Worker with rate limits. If the AI button is slow, it's probably Haiku warming up. Try things like:

- *"What are the biggest turning points in this campaign?"*
- *"Who has the party saved from death the most?"*
- *"How has the main villain's story unfolded?"*

### [demo-fallback]
Can't see the embed? Open the full-screen version.

---

## SECTION 4 — HOW IT WORKS

### [section-title]
How it works

### [section-subtitle]
Five stages, turning raw transcript into queryable memory. Click any phase to expand.

---

### PHASE 01 — Normalize the names

**Subtitle:** Speech-to-text mangles every proper noun. Fix that before anything else.

**Cost:** $0.00

**Preview table:**

| Canonical | What Zoom transcription actually wrote |
|-----------|----------------------------------------|
| Hojbejrg | Hodge · Hoge · Hoiberg · Hoybjerg · Hodgeberg · Haj · Hoy · Hoyt |
| Bixie | Pixie · Dixie · Fixie · Big C · Mixie · Bitsy · Bix |
| Bazzoxan | Bazozan · Bazoxan · Bazoan · Bazohan · Bazo Xan |
| Ank'Harel | Ankharel · Ankarel · An Carrel · Anchor El · Ancarol |
| Alyxian the Apotheon | Alexian · Alixian · Alyx · Apathyan · Apothon · Apothion |

**Detail cards:**

**Why this goes first** — If you skip name normalization, your graph ends up with ten different nodes for the same character. The AI confidently extracts relationships between "Hojbejrg" and "Hodge" as if they are two people. Every downstream query is corrupted.

**The table is half the work** — I built the correction table by hand from four years of listening to my friends butcher fantasy names. Each entry gets injected into the extraction prompt as ground truth. When the AI sees "Anchor El" in a transcript, it knows that means Ank'Harel.

**Business parallel** — Every company has a version of this. Product names. Customer names. Internal acronyms. Slack handles. If you want useful AI over your data, you need a canonical dictionary. Unglamorous. Also the whole game.

---

### PHASE 02 — Work backward through the sessions

**Subtitle:** The DM recap at the start of each session tells you what mattered in the last one. Use that.

**Cost:** $0.00

**Explainer paragraphs:**

Every D&D session starts the same way. The DM says "last week, you..." and spends two or three minutes summarizing what happened. That recap is the DM's own judgment about what actually mattered in the last session. It's a free, high-quality summary, embedded in the next session's transcript.

So when I'm extracting structured data from session 80, I don't process it blind. I first process session 81, save its recap as a small summary, and then when the extractor runs on session 80, I inject session 81's recap as priority guidance: *focus on these moments. The DM thought they mattered.*

This means the pipeline works backward. Newest session first. Each session's extraction is primed with what came after.

**Diagram labels:**
- Process newest → oldest
- Session 115 / extract fresh
- Session 114 / primed with 115's recap
- Session 113 / primed with 114's recap
- Every extraction sees what the DM already decided was important.

**Detail cards:**

**Why I didn't think of this at first** — I processed sessions in natural order. Oldest first. It felt right. Each extraction came out clean but missed the DM's own priority judgment. Flipping the order gave me higher-confidence extractions and fewer invented plot points, without changing the extractor at all.

**How the priming works in code** — After each extraction, the session's `dm_recap_summary` field is stored on the graph's session node. When the prompt for the previous session is built, the pipeline looks up the next session, pulls that summary, and injects it as priority guidance. Events that appear in the recap get a confidence bump.

**Business parallel** — Meeting notes have the same shape. Next week's kickoff starts with "last week we decided X." That's a free, pre-existing, high-quality summary of what mattered. Most meeting-intelligence tools don't use it because they process chronologically. Reverse the order.

---

### PHASE 03 — Extract the subgraph

**Subtitle:** Turn ~8,000 lines of transcript into structured entities, relationships, and events.

**Cost:** ~$0.04

**Before/after demo:**

*Raw transcript:*
```
01:12:45 Sammi (Calli): He's bleeding out. Kristin, how many hit points is that?
01:12:49 Kristin (Bixie): He's at zero. First failed save.
01:12:52 Wilson (Hodim): I'm using my last 4th level slot. Cure Wounds on Hoj.
01:13:04 Connor (DM): He stabilizes. Jordan, you owe him.
01:13:08 Jordan (Hoj): Yeah. I owe him.
```

*Structured output:*
```json
{
  "event": "Hodim saves Hoj from death",
  "subtype": "save",
  "participants": ["char_hodim", "char_hoj"],
  "emotional_tone": "relief",
  "animation_potential": 8,
  "evidence": "He stabilizes. You owe him.",
  "confidence": 0.9,
  "session": 103,
  "new_edges": [
    {"source": "char_hoj", "target": "char_hodim",
     "relationship": "RESCUED_BY"}
  ]
}
```

**Detail cards:**

**Parallel sub-agents** — Five Claude Sonnet sub-agents run at the same time, each on one session. Each session takes three to four minutes. Twenty sessions process in under twenty minutes instead of a couple hours.

**Schema with provenance** — Every entity and edge carries a confidence score, a source quote, and a session number. Without provenance you can't verify anything the AI produced. You also can't tell what the AI was sure about from what it guessed.

**Anti-hallucination rules** — The extraction prompt has one explicit rule: if a name doesn't appear in the transcript, use a descriptive ID like "char_unnamed_tech_elf." Don't invent proper nouns. That single rule catches more hallucinations than the QC layer ever did.

---

### PHASE 04 — Repair, validate, merge

**Subtitle:** Three cheap checks before anything touches the graph.

**Cost:** $0.00

**Three-step stack:**

**01 Repair** — Auto-fix schema drift. Missing fields get defaults. Misspelled relationship types get corrected (TRUSTED_BY → TRUSTS). Zero cost. Rule-based.

**02 Validate** — Flag enemy characters marked as ALLIED_WITH the party. Flag entity names containing known speech-to-text mispronunciations. Flag edges pointing to nodes that don't exist. Zero cost. Rule-based.

**03 Merge** — Fuzzy-match new entities against existing nodes. Detect first meetings. Deduplicate edges. Chain provenance from multiple extractions pointing at the same edge. Zero cost. Rule-based.

**Real catch example (session 114):**

```
[ERROR] char_grumpy_mushroom_demon_door marked ALLIED_WITH char_bixie.
Enemies are not allies of the party — likely extraction error.
```

The validator caught the AI confidently inventing an alliance with a literal demonic door. Edge removed before merge.

**Detail cards:**

**Why no AI in the QC layer** — Every rule that can be a rule should be a rule. Rules are free, fast, deterministic, and explainable. I only use AI where I can't write the rule. For ninety percent of graph QC, I can write the rule.

**First-meeting detection** — Merge tracks which session each entity first appears in. When you click a node, the detail panel shows "First seen in Session 83." This metadata powers spoiler filtering when you want a player-safe version of the graph.

**Business parallel** — Your CRM has duplicate contact records. Your knowledge base has the same article written four times by four different people. Entity resolution is cheap to automate and worth every hour you spend on it. Nothing downstream works without it.

---

### PHASE 05 — Query the graph

**Subtitle:** Natural language in. Relevant subgraph out. Answer rendered with clickable evidence.

**Cost:** ~$0.001

**Flow steps:**

**User asks:** "Who would Calli trust to protect her family?"

**Client extracts subgraph (local, free):** Finds Calli node. Walks TRUSTS, PROTECTS, FAMILY_OF edges two hops out. Returns 18 nodes, 23 edges. About 2,000 tokens.

**Cloudflare Worker receives, adds server-side API key, forwards to Haiku:** System prompt + subgraph + question. Max 1,024 output tokens. About $0.001 per call.

**Haiku responds with answer + relevant node IDs:** "Elathar (MENTOR, TRUSTS 0.9) or Hodim (PROTECTS since Session 82, RESCUED_BY in Session 93). Elathar has broader magical capability. Hodim has direct combat stake. RELEVANT_NODES: char_elathar, char_hodim, char_calli"

**The graph highlights the cited nodes:** Camera zooms to fit. Edges between cited nodes get emphasis. You click any node to drill into the underlying evidence.

**Detail cards:**

**Why subgraph extraction matters** — Sending the full 1,067-node graph to the AI on every query would cost twenty times more per call and give you worse answers. Focused context beats bulk context. Extract the one percent of the graph that matters, send that.

**The Worker isn't optional** — GitHub Pages is static hosting. It can't hold an API key. Without a proxy, the Anthropic key would be in the page source for anyone to grab. A Cloudflare Worker holds the key server-side, enforces rate limits (5/min, 50/day per IP, 500/day global), and locks CORS to this case study's domain.

**Cost discipline** — Haiku, 1,024 max output tokens, daily request caps in KV storage. Worst case for a viral moment: about $15 per month. Normal case: pennies. The API key itself has a monthly spend cap set in the Anthropic console as final insurance.

---

## SECTION 5 — PHILOSOPHIES

### [section-title]
Philosophies

### [section-subtitle]
How I think about building AI systems that have memory

---

### Philosophy 01

**Title:** The future of context engineering, applied to my favorite thing to do.

Context engineering is the part of AI work that doesn't make the demo video but decides whether the product is usable. You're not prompting. You're deciding what the model gets to see, in what order, at what fidelity, before the model even starts thinking.

D&D is my sandbox for it. I have absurd amounts of relational data with no business consequences if I get it wrong. Every mistake teaches me something I can apply to a client's real data problem next week. The failure modes are the same. The fixes transfer.

Companies that figure out their own context engineering will outcompete companies that don't. It's that simple.

[[takeaway]]
Context is not a prompt trick. It's a data layer you build once and query forever.
[[/takeaway]]

---

### Philosophy 02

**Title:** Structured data compounds. Summaries don't.

"Tell me about Hoj" gives you a paragraph. A structured entity with 17 fields and 45 edges gives you something you can filter, cross-reference, aggregate, and re-query.

Summaries are terminal. Once you write one, the rest of the information is compressed away. A graph is generative. You can always ask it a new question because the underlying entities still have structure.

Rule I follow: if a piece of information might be relevant to more than one future question, store it structurally. Not as a summary.

[[takeaway]]
A summary is a frozen answer to yesterday's question. A graph is a system that answers tomorrow's.
[[/takeaway]]

---

### Philosophy 03

**Title:** Confidence, not certainty.

Every extraction has a confidence score. Every edge has a source quote. Every quote is tied to a session number. Click an edge in the graph and you see where it came from.

This is how you make AI output trustworthy. Not by making the AI better. By making it show its work.

If you can't audit the AI's reasoning trail, you can never safely act on its output. For anything that matters, provenance is more valuable than accuracy.

[[takeaway]]
Build provenance into your data from day one. Retrofitting it later is almost impossible.
[[/takeaway]]

---

### Philosophy 04

**Title:** Graph-query AI costs roughly ten thousand times less than context-dump AI. Same answers. Often better.

Most AI apps try to cram context into every prompt. Send the whole document. Send the whole conversation history. Send every possibly-relevant file. It's expensive, slow, and the model still loses track of what matters.

The alternative is to put context in a graph. At query time, extract the small subgraph that actually matters for the specific question. Pass only that.

One of my queries uses about 3,000 tokens of context instead of the ten million that a full transcript dump would need. That's roughly four orders of magnitude cheaper per call. Compounded across a company's daily AI usage, it's the difference between an AI tool you can afford to use and one you can't.

[[takeaway]]
Cheap AI lives on top of expensive data work. Not the other way around.
[[/takeaway]]

---

## SECTION 6 — LESSONS LEARNED

### [section-title]
Lessons Learned

### [section-subtitle]
Things I'd do differently, and why they matter for any AI pipeline you build

---

### Lesson 01

**Title:** Clever context engineering beats ten-xing the tokens every time.

I processed sessions in natural order at first. Oldest to newest. Every extraction was blind to what came next. The extractions came out fine.

Then I realized: every session starts with a recap. That recap is the DM's summary of what mattered in the last session. If I process session 81 first, I can use its recap as priority guidance when I extract session 80.

Flipping the order gave me higher-confidence extractions and fewer invented plot points. I didn't upgrade the model. I didn't lengthen the prompt. I re-sequenced the work so the information I already had was available at the right time.

**Inline diagram labels:**
- Session 81 extraction / produces recap summary
- "Focus on these moments, the DM thought they were important"
- Session 80 extraction / primed with 81's recap

[[takeaway]]
Before you upgrade your model or expand your context window, check whether you're feeding the model the right context in the right order.
[[/takeaway]]

---

### Lesson 02

**Title:** Clean data doesn't stop being important when you use AI.

The extractor will confidently mark hostile NPCs as ALLIED_WITH the party about five percent of the time. Once I noticed the pattern, I wrote a six-line validator that flags any edge where an entity with `subtype: enemy` or `subtype: creature` has an ALLIED_WITH relationship with a PC. Catches it every time.

The lesson isn't that AI is bad at this. The lesson is that AI pipelines need monitoring like any other data pipeline. You can predict the specific ways yours will fail. You can write deterministic checks for those specific failures. Do it once. It saves you every time.

Teams that skip this step end up with dashboards full of confident nonsense. Teams that bake it in get trustable systems that get better, not worse, as they grow.

[[takeaway]]
Name the failure modes. Write the rules. Don't rely on the AI to catch itself.
[[/takeaway]]

---

### Lesson 03

**Title:** Rooting your data in provenance earns trust and unlocks AI judgment.

My early extractions had no source quotes. Everything looked clean until I tried to verify a specific edge and realized I had no way to check if it was real. Retrofitting provenance meant re-running every extraction. Expensive. Painful. Avoidable.

Now every field carries a source quote, session number, and confidence score. When the AI says "Eas has romantic tension with Bixie," I click the edge and see the quote that produced it. Five seconds to verify instead of five minutes of re-reading the transcript.

The bigger win: an AI querying this graph can make its own judgment calls about what to trust and what to hedge on, because it can see the evidence behind every claim. Accuracy is not the goal. Verifiability is.

[[takeaway]]
If AI output will ever inform a decision, build the audit trail before you need it.
[[/takeaway]]

---

### Lesson 04

**Title:** Parallel where it's safe. Serial where it isn't.

Five sub-agents extracting in parallel finish five sessions in the time it would take one agent to do one.

But merging has to be serial. Two extractions trying to write to the graph file at the same time produces corruption I spent a day debugging before I figured it out.

Concurrency where the work is independent. Discipline where shared state changes. Knowing the difference is most of the job.

[[takeaway]]
Parallelism is a sharp tool. Use it where independent work happens. Don't use it where shared state changes.
[[/takeaway]]

---

## SECTION 7 — HOW THIS CONNECTS TO BUSINESS APPLICATIONS

### [section-title]
How this connects to business applications

### [business-intro]
*D&D is my favorite hobby to try out my latest AI experiments. But this one is a powerful application that could save your business a lot of pain and suffering when it comes to AI.*

---

### Business Card 01 — Institutional Memory

**Tag:** Institutional Memory

**Headline:** Your company's last four years are in Slack. Your AI cannot see any of it.

Every decision your team has made is documented somewhere. The strategy doc from Q3 last year. The Slack thread where you decided to cut that feature. The customer call that made you pivot.

When a new hire asks "why do we do it this way," they get a shrug. When your AI assistant gets the same question, it makes something up.

**Same pattern as D&D:** extract decisions, participants, and outcomes into a graph. Ask it "why did we choose vendor X" and get a grounded answer with links to the actual thread.

---

### Business Card 02 — Customer Intelligence

**Tag:** Customer Intelligence

**Headline:** Your sales team's AI writes outreach emails like it just met the customer.

You've been selling to this company for eighteen months. Three account managers have talked to them. There's a folder of call recordings, a thread of email replies, a pile of Loom videos.

Your AI tool sees none of that. It writes a generic email.

**Same pattern as D&D:** a customer call is a transcript, same shape as a D&D session. Extract the relationship graph. Next time someone writes outreach to that customer, the AI has actual context to work from.

---

### Business Card 03 — Learning & Development

**Tag:** Learning & Development

**Headline:** Your instructors are designing next semester without access to last semester's lessons.

This is my world. A training team runs forty-plus learning experiences a year. They record debriefs, write retros, capture feedback. Six months later, that knowledge lives in someone's head. If that person leaves, it's gone.

A knowledge graph over training artifacts lets instructors ask "what do we know about how software engineers respond to case-study format" and get grounded answers across years of prior work. Not summaries. Evidence.

**Same pattern as D&D:** session transcripts are training artifacts. Learner behavior is character behavior. The graph remembers what each cohort did so next cohort's design is smarter.

---

### [business-cta]
If this case study made you think "we have that data and can't use it," that's the conversation I want to have.

**Button:** Book a free consult → https://calendly.com/ckoblinski/gtky

---

## SECTION 8 — ABOUT

### [section-title]
About this project

### [about-body]
I'm Connor Koblinski. I'm an educator, AI trainer, and professional Dungeon Master. I've built curriculum for Ramp, Snapchat, Niantic, and Solana. I teach people to use AI for things they couldn't do before, not to automate things they already know how to do.

This case study is the companion to the <cs-link>D&D to animated film pipeline → /case-studies/dnd-pipeline.html</cs-link>. That one is about turning transcripts into video. This one is about turning transcripts into memory.

They share the same source data. They solve different problems. Together, they're my argument that AI is most valuable when you give it structure to work with.

### [about-footer]
Built April 2026.

**Links:**
- CBK Learning → https://cbklearning.com
- LinkedIn → https://linkedin.com/in/connor-koblinski
- YouTube → https://youtube.com/@cbklearning
- Shorts Pipeline Case Study → /case-studies/dnd-pipeline.html

# How AI is different in 2026 — for the Center for Supportive Schools

> **Editing notes**
> This is the editable source copy for `/css/index.html`. After making changes here, paste them into the matching block in `index.html`.
> - `**bold**` and `*italic*` map to `<strong>` and `<em>` in the page.
> - Each `## Section` corresponds to one `<section class="css-section">` block.
> - Each `> Pullquote` is rendered as a large blockquote.
> - Each `[caption: ...]` line goes under the slide image that precedes it.
> - Each `[image: slide-XX.png — alt text]` marks where a slide image lives.

---

## Hero

**Kicker:** For the Center for Supportive Schools
**Title:** How AI is different in 2026.

A place to revisit what we covered on May 19 -

**Session 1** · May 19, 2026
**Session 2** · June 1, 9:30 AM

---

## Slides + action buttons

[Embedded Google Slides deck]

- Open in Google Slides 
- Exit survey
- NYCPS AI Traffic Light game

*Note:* If the deck doesn't load, make sure it's published to web in Google Slides (File → Share → Publish to web).

---

## How AI actually works — the Plinko model.

**Kicker:** The shape of the thing

A traditional program is deterministic. Same input, same output, every time. If the rules and the data don't match, you get an error. Think of Excel throwing a red error cell, or that scene from *Big* where Tom Hanks has to type the line exactly right or the game just dies.

Generative AI doesn't work like that. It's probabilistic. Your prompt drops in the top of the machine like a ball at the top of a Family Feud Plinko board. It bounces through billions of weighted pegs and lands somewhere on the bottom — usually in the middle, sometimes way off to one side. There's no "error." It always gives you *something.*

[image: slide-12.png — Plinko board photo with bullets explaining the model]
[caption: The Plinko model — your prompt drops in, bounces through billions of weighted pegs, lands somewhere on the output distribution.]

[image: slide-13.png — Normal distribution diagram next to a Gemini chat showing one of several "Hi there" responses]
[caption: Same prompt, ten different responses. Most cluster in the middle of the distribution; a few land in the 2% tails.]

> Hallucinations aren't a bug. They are the feature. The same mechanism that lets it be creative is the mechanism that lets it be wrong.
> — Connor, on probabilistic systems

That's the whole game. When you say "professional tone" or "use a sonnet structure," you're not programming the system — you're nudging the ball toward a specific part of the board. Sometimes it lands where you want. Sometimes it doesn't. Treat every response as a draw from a distribution, not as *the* answer.

---

## Three things are new in 2026.

**Kicker:** What changed

**1. Omni models.** The same model handles text, images, audio, and video. You can paste a screenshot, hum a melody, drop in a PDF — and it works on all of it together.

**2. Reasoning models.** Linear models answer immediately, in one pass through the Plinko board. Reasoning models (Opus 4.7, GPT-5 thinking, Gemini Pro thinking) take many passes — they brainstorm, backtrack, evaluate their own work, and sometimes do web searches in the middle of thinking. The output is slower, more grounded, and 25–50× more expensive to run. You saw the Animal Farm study guide example: the reasoning model went out, pulled real source documents, and came back with cited claims instead of confident vagueness.

[image: slide-30.png — ChatGPT 5 model picker showing GPT-5 flagship vs GPT-5 Thinking, next to a definition of linear and reasoning models]
[caption: In ChatGPT, Claude, and Gemini, the model picker is where you choose between linear ("fast answers") and reasoning ("more brain power"). Pick the right tool for the question.]

**3. Agents.** Models now pick up tools. They search the web, write code to do math, read files they can't parse directly, and on some platforms (Gemini, Claude Computer Use) they reach out and act on your software — creating slides, filling forms, running scripts. The line between "chatbot" and "thing that does work" has mostly dissolved.

[image: slide-22.png — Agent diagram: Memory, Tools, Goals feed into Agent, which produces Actions on an Environment, which the Agent observes]
[caption: Anatomy of an agent. The model has memory, picks up tools, holds a goal, takes actions in an environment, and observes the result — looping until it decides the work is ready for review.]

> Some tasks AI is now superhuman at. Right next to those, it can't move a PowerPoint slide so the title aligns. The edge between capable and useless is jagged, not smooth.
> — On the limits of these tools

---

## The jagged edge — and your zone of code intelligence.

**Kicker:** Why one person's green is another's red

The stoplight diagram is a helpful simplification: green tasks AI handles well, yellow tasks need oversight, red tasks waste your time. But the real edge isn't a clean line. Tasks that sit next to each other in difficulty can sit on opposite sides of the edge.

[image: slide-35.png — Concentric stoplight: green center, yellow middle, red outer]
[caption: The clean version of the stoplight. Reality is messier.]

And — this is the part educators recognize instantly — there's no single edge for everyone. You have your own **zone of code intelligence:** the band where your judgment, context, and skill let you get useful work out of AI without getting burned. Someone else's band is somewhere else entirely. A teacher who knows *Animal Farm* backwards can tell when the model invents a chapter. A novice can't.

[image: slide-40.png — Two jagged starburst shapes with green/yellow/red regions in different patterns]
[caption: Two people, two completely different zones of competence with the same tools. Your job is to learn the shape of yours.]

Your job isn't to memorize a list of green tasks. It's to learn the shape of your own edge by trying things — and to notice the moments where you've crossed it.

---

## The two questions: expertise and attention.

**Kicker:** Where to actually start

When you're picking a task to hand to AI, ask two questions: **How much do I know about this?** and **How much attention am I willing to give the output?** The honest answers put you in one of four quadrants.

[image: slide-42.png — 2x2 matrix: AI Implementation: Expertise vs. Attention. STARTER ZONE top-right, DANGER ZONE bottom-left.]
[caption: The Starter Zone is where you're the expert *and* you're paying attention. Start there. Expand into the other quadrants once you've calibrated your trust in the tool.]

*The Danger Zone is mostly where people get scared by AI — because they're using it there. Don't.*

---

## Narrow offloading, not broad offloading.

**Kicker:** What gets offloaded matters

Research on factory automation going back to the 80s is unambiguous: when workers **broadly offload** — press a button, the task gets done — their skills decline within about three months. They lose the ability to do the work they used to do.

**Narrow offloading** is different. You hand off a slice of the task — formatting, transcription, a first draft — and keep the thinking. Some of the best automation in factories was designed not to be maximally simple but to keep humans cognitively present, because that turned out to reduce injuries and preserve expertise.

> Bench press, forklift, dolly. The bench press builds you. The forklift replaces you. The dolly does the heavy part while you steer.
> — Three ways of relating to a tool

[image: slide-44.png — Three photos: person bench-pressing, worker pushing boxes on a dolly, yellow forklift]
[caption: Three tools, three relationships. The bench press builds capacity. The dolly extends your reach. The forklift replaces the lift entirely. None is "right" — but they do very different things to you over time.]

Educators already have language for this. **Germane difficulty** — sometimes called desirable difficulty or productive struggle — is the friction that builds skill. **Extraneous difficulty** is the friction that burns cognitive energy without building anything: formatting, hunting for information, fighting your tools. AI should be eating your extraneous difficulty. It should not be eating your germane difficulty.

> I don't put anything into AI unless I'm willing to read the entire response.

---

## The Achilles heel: it answers anyway.

**Kicker:** The single most important habit

Ask a model to do something it cannot do — because it lacks the data, the permission, or the capability — and most of the time it will **answer anyway, with confidence.** Guardrails are better than they used to be. They are not enough.

The Strait of Hormuz example from the session is the clearest version of this I have. Major news outlets reported "no ships are moving" for over a week because every system pulled from the same GPS data feed, and every ship was spoofing its location. Two journalists with binoculars on a beach got a more accurate picture than the international AI-augmented monitoring networks did.

[image: slide-65.png — Satellite images of the Strait of Hormuz with ship tracks veering onto land]
[caption: Same data feed, same answer everywhere. Ships "on land" because every analytics tool trusted the same spoofed GPS.]

[image: slide-67.png — "Achilles Heel of AI" with equation: same (bad) data + same algorithm = same (bad) results]
[caption: The structural risk in a single line. When everyone runs the same model on the same data, everyone gets the same wrong answer at the same time.]

Your expertise, in your context, is your only real edge. Bring it.

**Before you trust the output, ask:**
1. Is this a problem AI can actually solve?
2. Does the model have enough good data to solve it?
3. How close is this output to the real world I live in?

---

## The problems with AI.

**Kicker:** Where the work is

A few of the concerns that came up in the chat — the ick, the ethics, the energy use, the slop — are real and well-founded. A few are less about AI than about problems we already had, that AI is now amplifying. Both lists matter, but it's worth telling them apart.

[image: slide-51.png — Venn diagram with "AI problems" and "Existing problems" circles, with arrow at overlap labeled "The really tricky part"]
[caption: Some problems are squarely AI's. Some are old problems amplified. The overlap is where most of the heat is — and where it's hardest to think clearly.]

### Six concerns (card grid)

**Bias in outputs.** The doctor/nurse image test still fails. Models reflect the bias of their training data, and the more complex the request, the more bias slips in. There's also active political pressure on companies to tilt outputs.

**Deepfakes & the liar's dividend.** A $20/month tool was enough to forge an audio clip framing a principal. And once fakes are plausible, real things get dismissed as fakes too. The misinformation cost compounds in both directions.

**Labor & IP.** Workers in lower-wage countries annotate the data. Every major AI company is being sued by someone whose work was scraped without consent. The supply chain for these models is not clean.

**Environment — short-term.** The Titan data center outside Memphis is running on natural-gas trailers designed for FEMA emergencies. These are concentrated in low-income communities. This is happening now, not in some hypothetical future.

**Environment — long-term (Jevons paradox).** Models get more efficient, but total usage grows faster. The structural impact is from corporate and government use, not from any one person's prompts. Individual abstinence won't move the needle here — policy will.

**Attention crisis, amplified.** We were already losing the fight for focus. Now we have infinitely responsive companions and infinite generated content. The cost isn't measured in any one interaction — it's measured in habits.

[image: slide-49.png — Aerial photo of a sprawling data center surrounded by natural-gas turbine trailers]
[caption: The Titan data center outside Memphis, running on natural-gas turbine trailers normally reserved for FEMA emergencies. Concentrated in low-income communities.]

[image: slide-48.png — "Outsourced Filipino AI workers exploited in digital sweatshops" + copyright lawsuit clippings]
[caption: The supply chain for these models is not clean. Underpaid annotation labor on one side, IP lawsuits from creators on the other.]

### CTA: The AI Problems Index

**Kicker:** Keep digging
**Title:** The AI Problems Index →
**Description:** An ongoing index that sorts real AI problems from overstated ones, with sources. Good place to research a specific concern before raising it in a meeting.
**Link:** https://ai-problems-index.vercel.app/

---

## Don't opt out — at least not entirely.

**Kicker:** A request

[image: slide-53.png — "I invite you to not opt out."]

I respect the manual-holdout posture. There are tasks I keep manual on purpose. But fully opting out — never touching the tools, never building intuition — has costs that compound:

**You lose your immune system.** If you've never used a generative model, you can't recognize generated content. You're more likely to trust the spammy site, fall for the deepfake, miss the AI-drafted email pretending to be from a colleague.

**You lose your voice in the conversation.** "This feels icky" is real, but it's easy to dismiss. "This is a bad use of AI because it broadly offloads the entire task, and the user has no expertise to catch the errors" — that lands. Informed critique works. Tepid concern doesn't.

**You leave gains on the floor.** The work you do is too important to skip the multipliers. If a tool can make your reach larger or your friction smaller, that matters — even if you don't love every part of how the tool got here.

**You become a positive role model.** Shame doesn't change behavior. Watching a thoughtful person use a tool thoughtfully — that does.

---

## Resources & homework.

**Kicker:** Take with you

A short list — what to play with, where to keep learning, and what to send back to me before Session 2.

### Resource cards

**NYCPS AI Traffic Light game** *(Interactive · 5 minutes)*
Sort 18 real classroom and school-leader AI uses into Red, Yellow, or Green based on official NYCPS guidance. Good for a faculty meeting warm-up.
→ `nyc-ai-traffic-light.html`

**Session 1 exit survey** *(Homework · 3 minutes)*
Tell me what landed, what didn't, and what you want Session 2 to focus on. Clarice's question about how to coach teachers and students will probably anchor part of it.
→ Google Form link

**Set your custom instructions** *(One-time setup · 5 minutes)*
The single highest-leverage change you can make. Tell the model to be research-backed, to push back, to not act human. Every chat after that gets better. Set it once on whichever tool you actually use.
→ ChatGPT guide / Claude guide / Gemini guide (three buttons)

**My ongoing writing on AI in learning** *(More writing)*
More long-form pieces on how I think about these tools in education and learning design. Some of this is one or two layers deeper than today's session went.
→ `/ideas.html`

---

## Closer

**Title:** Thank you for having me.

If anything in the presentation sparked a question — or a concern about how AI is showing up in your school or your work — I'd genuinely like to hear it. The group questions tend to be better than the ones I prepare for, so send them.

I'd rather answer them for everyone in Session 2 than have them sit unanswered. See you June 1.

**Contact:** connor@cbklearning.com · LinkedIn

**Disclosure (small italic, under a thin rule):**
This page was co-written with AI, working from the deck, the transcript of our session, and my own writing on these tools. I made the calls about what to cut, what to keep, and how it reads — the AI did a lot of the typing. Felt fair to tell you, given what we talked about.

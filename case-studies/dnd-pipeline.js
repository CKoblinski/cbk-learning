/* ============================================
   DND SHORT FACTORY — CASE STUDY
   Interactivity, animations, scroll triggers
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  // ── Scroll-triggered stat counter animation ──
  const statCards = document.querySelectorAll('.stat-card');
  const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const card = entry.target;
        const delay = parseInt(card.dataset.delay) || 0;
        setTimeout(() => {
          card.classList.add('visible');
          const numEl = card.querySelector('.stat-number');
          if (numEl) animateNumber(numEl);
        }, delay);
        statsObserver.unobserve(card);
      }
    });
  }, { threshold: 0.3 });
  statCards.forEach(card => statsObserver.observe(card));

  function animateNumber(el) {
    const target = parseFloat(el.dataset.target);
    const isDecimal = target % 1 !== 0;
    const duration = 1200;
    const start = performance.now();

    function tick(now) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
      const current = target * eased;

      if (isDecimal) {
        el.textContent = current.toFixed(2);
      } else if (target >= 1000) {
        el.textContent = Math.round(current).toLocaleString();
      } else {
        el.textContent = Math.round(current);
      }

      if (progress < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }

  // ── Phase expand/collapse ──
  const phaseHeaders = document.querySelectorAll('.phase-header');
  phaseHeaders.forEach(header => {
    header.addEventListener('click', () => {
      const phase = header.closest('.phase');
      const wasOpen = phase.classList.contains('open');

      // Toggle
      phase.classList.toggle('open');

      // Check depth mode
      const isDeepMode = document.querySelector('.depth-btn[data-depth="technical"]').classList.contains('active');
      if (isDeepMode && !wasOpen) {
        phase.classList.add('deep');
      } else if (wasOpen) {
        phase.classList.remove('deep');
      }

      // Animate rubric bars when QC phase opens
      if (phase.id === 'phase-qc' && !wasOpen) {
        setTimeout(animateRubricBars, 300);
      }
    });
  });

  // ── Depth toggle ──
  const depthBtns = document.querySelectorAll('.depth-btn');
  depthBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      depthBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const isDeep = btn.dataset.depth === 'technical';
      document.querySelectorAll('.phase.open').forEach(phase => {
        if (isDeep) {
          phase.classList.add('deep');
        } else {
          phase.classList.remove('deep');
        }
      });
    });
  });

  // ── QC layer expand/collapse ──
  document.querySelectorAll('.qc-layer-header').forEach(header => {
    header.addEventListener('click', (e) => {
      e.stopPropagation();
      const layer = header.closest('.qc-layer');
      layer.classList.toggle('open');
    });
  });

  // ── Philosophy expand/collapse ──
  document.querySelectorAll('.philosophy-header').forEach(header => {
    header.addEventListener('click', () => {
      header.closest('.philosophy').classList.toggle('open');
    });
  });

  // ── Lesson expand/collapse ──
  document.querySelectorAll('.lesson-header').forEach(header => {
    header.addEventListener('click', () => {
      header.closest('.lesson').classList.toggle('open');
    });
  });

  // ── Storyboard sequence click ──
  const seqBlocks = document.querySelectorAll('.seq-block');
  const seqDetailPanel = document.getElementById('seqDetailPanel');
  const seqDetails = {
    1: {
      type: 'Dialogue - Bixie',
      concept: '"I think you\'re great. I like you a lot. I respect you, I love a woman in charge. But I would like to understand how this city has a fucking dragon?" Bixie opens with charm before the pivot. Her portrait shows a diplomatic smile that\'s already edging toward disbelief.',
      duration: '18 seconds',
      assets: '1 portrait (3 mouth variants), 1 background (chancellor\'s chamber)',
      cost: '$0.24'
    },
    2: {
      type: 'Dialogue - Bixie',
      concept: '"We\'re not calling that as an ally? We have a dragon?" Bixie\'s incredulity escalates. The portrait shifts from diplomatic to genuinely baffled. Background: formal government chamber with maps and scrolls.',
      duration: '14 seconds',
      assets: '1 portrait variant, 1 background (reused)',
      cost: '$0.24'
    },
    3: {
      type: 'Dialogue - Grand Maven',
      concept: '"Our most powerful chess piece. This city has been protected by Jamun-Saar for centuries." The Grand Maven explains the political reality. Her portrait: patient authority, calm under Bixie\'s pressure.',
      duration: '16 seconds',
      assets: '1 portrait (3 mouth variants), 1 background (reused)',
      cost: '$0.24'
    },
    4: {
      type: 'DM Narration',
      concept: 'Context beat for viewers: the camera pulls back to show the city of Ank\'Harel, its golden walls shimmering in desert heat, then up to the towering brass dragon perched on the central spire. Establishes scale - this is a city-sized problem.',
      duration: '8 seconds',
      assets: '1 background (unique), 3 action frames',
      cost: '$0.32'
    },
    5: {
      type: 'Dialogue - Bixie',
      concept: '"He\'s just sitting on his throne, feet crossed? I want to talk to this dragon while he\'s not fighting for his people." The peak of the moment. Bixie\'s portrait shows righteous indignation. She\'s not wrong - she\'s just the only one brave enough to say it.',
      duration: '22 seconds',
      assets: '1 portrait variant, 1 background (reused)',
      cost: '$0.24'
    },
    6: {
      type: 'Action Frames',
      concept: 'Brief comedic illustration: a massive brass dragon lounging imperiously on an ornate throne, one leg crossed over the other. Scale mismatch between the 60-foot dragon and a tiny throne plays for laughs. Visual punchline for Bixie\'s description.',
      duration: '6 seconds',
      assets: '4 unique action frames',
      cost: '$0.32'
    },
    7: {
      type: 'Dialogue - Bixie',
      concept: '"All this bureaucracy, I\'m not testifying. Let\'s just get the guy to come fight with us." Bixie cuts through every layer of protocol. Portrait: arms crossed, done with politics.',
      duration: '20 seconds',
      assets: '1 portrait variant, 1 background (reused)',
      cost: '$0.24'
    },
    8: {
      type: 'Dialogue - Grand Maven',
      concept: '"She rolls a 19. I can have you meet with him tomorrow morning at 8 AM." The payoff beat. The Grand Maven\'s portrait shifts from patient authority to a slight impressed smile. The bureaucracy crumbles.',
      duration: '14 seconds',
      assets: '1 portrait variant, 1 background (reused)',
      cost: '$0.24'
    },
    9: {
      type: 'Dialogue - Bixie',
      concept: '"I\'m available." Two words. Perfect comedic button. Bixie\'s portrait: satisfied shrug, sly confident smirk. The delivery is everything - pure character in a single line.',
      duration: '8 seconds',
      assets: '1 portrait variant, 1 background (reused)',
      cost: '$0.24'
    },
    10: {
      type: 'Dialogue - Eas + Bixie',
      concept: '"I\'ll be your muscle." / "Sure. I love dragons. Why is everyone weirdly nervous all the time?" The denouement. Eas offers backup, Bixie genuinely doesn\'t understand why anyone would be nervous about talking to a dragon.',
      duration: '18 seconds',
      assets: '2 portraits, 1 background (reused)',
      cost: '$0.24'
    }
  };

  seqBlocks.forEach(block => {
    block.addEventListener('click', () => {
      const seqNum = parseInt(block.dataset.seq);
      const detail = seqDetails[seqNum];
      if (!detail) return;

      seqBlocks.forEach(b => b.classList.remove('active'));
      block.classList.add('active');

      seqDetailPanel.innerHTML = `
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px;">
          <div>
            <div style="font-family: var(--font-mono); font-size: 11px; color: var(--text-muted); margin-bottom: 4px;">SEQUENCE ${seqNum}</div>
            <div style="font-family: var(--font-head); font-size: 14px; color: #fff; margin-bottom: 8px;">${detail.type}</div>
            <div style="font-size: 13px; color: var(--text-dim); line-height: 1.6;">${detail.concept}</div>
          </div>
          <div>
            <div style="display: flex; flex-direction: column; gap: 8px;">
              <div style="font-family: var(--font-mono); font-size: 12px;">
                <span style="color: var(--text-muted);">Duration:</span>
                <span style="color: #fff;">${detail.duration}</span>
              </div>
              <div style="font-family: var(--font-mono); font-size: 12px;">
                <span style="color: var(--text-muted);">Assets:</span>
                <span style="color: var(--cyan);">${detail.assets}</span>
              </div>
              <div style="font-family: var(--font-mono); font-size: 12px;">
                <span style="color: var(--text-muted);">Cost:</span>
                <span style="color: var(--green);">${detail.cost}</span>
              </div>
            </div>
          </div>
        </div>
      `;
    });
  });

  // ── Generate waveform visualization ──
  const waveformEl = document.getElementById('waveform');
  if (waveformEl) {
    const barCount = 200;
    const spikePositions = [
      { pos: 0.22, type: 'spike', label: 'Nat 20 Reaction' },
      { pos: 0.35, type: 'laughter', label: 'Table Laughter' },
      { pos: 0.52, type: 'spike', label: '"That\'s just economics"' },
      { pos: 0.58, type: 'laughter', label: 'Group Laugh' },
      { pos: 0.75, type: 'spike', label: '"I like my odds"' },
      { pos: 0.85, type: 'spike', label: 'Boss Reveal' },
    ];
    const silencePositions = [
      { pos: 0.20, label: 'Silence before roll' },
      { pos: 0.73, label: 'Dramatic pause' },
    ];

    for (let i = 0; i < barCount; i++) {
      const bar = document.createElement('div');
      bar.className = 'waveform-bar';
      const pos = i / barCount;

      // Base height: random ambient noise
      let height = 5 + Math.random() * 15;

      // Check if near a spike
      let isSpike = false;
      let isSilence = false;
      let isLaughter = false;

      spikePositions.forEach(spike => {
        const dist = Math.abs(pos - spike.pos);
        if (dist < 0.02) {
          height = 50 + Math.random() * 30;
          if (spike.type === 'spike') isSpike = true;
          if (spike.type === 'laughter') isLaughter = true;
        } else if (dist < 0.04) {
          height = 25 + Math.random() * 20;
        }
      });

      silencePositions.forEach(s => {
        const dist = Math.abs(pos - s.pos);
        if (dist < 0.015) {
          height = 2 + Math.random() * 3;
          isSilence = true;
        }
      });

      if (isSpike) bar.classList.add('spike');
      if (isSilence) bar.classList.add('silence');
      if (isLaughter) bar.classList.add('laughter');

      bar.style.height = height + '%';
      bar.style.alignSelf = 'center';
      waveformEl.appendChild(bar);
    }

    // Add annotations
    const annotationEl = document.getElementById('waveformAnnotations');
    [...spikePositions, ...silencePositions].forEach(item => {
      const ann = document.createElement('div');
      ann.className = 'waveform-annotation';
      ann.style.left = (item.pos * 100) + '%';
      ann.textContent = item.label;
      annotationEl.appendChild(ann);
    });
  }

  // ── Generate transcript column for moment finder ──
  const transcriptCol = document.getElementById('transcriptColumn');
  const momentCardCol = document.getElementById('momentCards');
  if (transcriptCol && momentCardCol) {
    // Generate 60 lines to represent the transcript
    const highlightRanges = [
      { start: 19, end: 33, moment: 0 },
      { start: 32, end: 44, moment: 1 },
      { start: 49, end: 60, moment: 2 },
    ];

    const sampleLines = [
      'DM: Alright, welcome back everyone...',
      'DM: So last session, you all made it to the Astral Sea...',
      'DM: Hodim, you found a ring on the god\'s finger...',
      'Bixie: Wait, I thought the nest was behind the ribcage?',
      'DM: Yes, exactly. The nest is nestled in the god\'s ribcage.',
      'DM: Okay so you\'re approaching the ribcage now...',
      'DM: As you get closer, you can hear this wet, pulsing sound...',
      'Hodim: I hold up the ring. Does it react?',
      'DM: The ring flares with golden light...',
      'Hodim: Oh my god. That\'s incredible.',
      'Bixie: Is it... waking up?',
      'DM: Not waking up. But the ring is resonating...',
      'DM: Suddenly, three Correspond burst out...',
      'Hojberg: Oh great. Here we go.',
      'Bixie: How many?',
      'DM: Three initially. But you can see more stirring...',
      'Bixie: I draw my daggers. We need to move fast.',
      'Hojberg: I grip my glaive and step forward.',
      'Hodim: Wait. The ring is still glowing...',         // 19
      'Bixie: Use it how? We don\'t have time!',
      'Hodim: I channel my smite through the ring.',
      'DM: Roll for it.',
      'Hodim: Natural 20.',                                 // 23
      'Everyone: OH MY GOD!',
      'Hojberg: NO WAY!',
      'Bixie: Are you serious right now?!',
      'Calli: That\'s insane!',
      'DM: The ring ERUPTS with golden light...',            // 28
      'DM: The blast wave ripples outward...',
      'Hodim: The corruption... the ring is purging it?',
      'DM: The divine energy in the ring is antithetical...',
      'Calli: That\'s beautiful and terrifying.',             // 32
      'Hodim: Can I... can I heal a dead god?',
      'DM: That\'s... a very big question, Hodim.',
      'Bixie: While Hodim is having his existential crisis...',// 35
      'Hojberg: Classic Bixie.',
      'Calli: We\'re witnessing a divine miracle and she wants loot.',
      'Bixie: Dead things have stuff. That\'s just economics.',// 38
      'Hojberg: "That\'s just economics" - Bixie, professional rogue.',
      'Everyone: haha',
      'DM: You search the Correspond bodies...',
      'Bixie: I pick it up very carefully. What is this?',
      'DM: It\'s a Correspond Heartstone...',
      'Bixie: Oh that\'s disgusting. I love it. I\'m keeping it.',// 44
      'Hodim: Should you really be touching that?',
      'Bixie: Hodim, I appreciate your concern...',
      'Hojberg: She has. She really has.',
      'Everyone: haha',
      'DM: As you\'re examining the heartstone, you hear something...',// 49
      'Calli: That doesn\'t sound good.',
      'DM: Something massive starts to emerge...',
      'Bixie: Okay so when I said we need to move fast...',
      'Hojberg: Yeah we should have listened to you.',
      'Hodim: I step forward. The ring is still warm.',
      'Bixie: Hodim, that thing is TWENTY FEET TALL.',
      'Hodim: And I have a dead god\'s ring. I like my odds.',// 56
      'Hojberg: That\'s the most paladin thing you\'ve ever said.',
      'Everyone: haha',
      'DM: The Correspond Queen lets out a deafening roar...',
      'DM: Roll initiative, everyone.',                       // 60
    ];

    sampleLines.forEach((line, i) => {
      const lineNum = i + 1;
      const div = document.createElement('div');
      div.className = 'transcript-line';
      div.textContent = `${String(lineNum).padStart(2, '0')}  ${line}`;

      // Check if this line is in a highlight range
      highlightRanges.forEach(range => {
        if (lineNum >= range.start && lineNum <= range.end) {
          div.classList.add('highlight');
          div.dataset.moment = range.moment;
        }
      });

      transcriptCol.appendChild(div);
    });

    // Add moment cards
    const moments = [
      {
        rank: '#1 character_moment',
        title: 'Eas Threatens Galsariad: "I Can Change Your Brain"',
        arc: 'A player holds a mind-wiping spell in the air and delivers a full monologue to the ally who kept betraying them. Rolls a nat 1 on intimidation. Then a 20.',
        quote: '"I can turn your brain into scrambled eggs in a moment." - Eas'
      },
      {
        rank: '#2 character_moment',
        title: 'Bixie Confronts Sage About the Ruidium Spear',
        arc: 'After an ally nearly killed her while under corruption, Bixie calls it out directly. No yelling - controlled, precise anger.',
        quote: '"You almost tried to fucking kill me down there." - Bixie'
      },
      {
        rank: '#3 dramatic_reveal',
        title: 'The Vision of Alyxian\'s Death',
        arc: 'The party shares a vision of an ancient hero\'s final moment - striking down a god but taking the god\'s heart through his own chest.',
        quote: '"He struck Grummish a lethal blow... and took his divine heart through his own chest." - DM'
      },
      {
        rank: '#4 funny_banter [SELECTED]',
        title: 'Bixie on the Dragon: "He\'s Just Sitting There, Feet Crossed?"',
        arc: 'The city has a dragon. Bixie cannot believe nobody thought to just ask it for help. Cuts through all bureaucracy in 90 seconds.',
        quote: '"I\'m available." - Bixie'
      },
    ];

    moments.forEach(m => {
      const card = document.createElement('div');
      card.className = 'moment-card';
      card.innerHTML = `
        <div class="moment-card-rank">${m.rank}</div>
        <div class="moment-card-title">${m.title}</div>
        <div class="moment-card-arc">${m.arc}</div>
        <div class="moment-card-quote">${m.quote}</div>
      `;
      momentCardCol.appendChild(card);
    });
  }

  // ── Rubric bar animation ──
  function animateRubricBars() {
    document.querySelectorAll('.rubric-fill').forEach(fill => {
      const width = fill.style.width;
      fill.style.width = '0%';
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          fill.style.width = width;
        });
      });
    });
  }

  // ── Auto-scroll transcript in hero ──
  const scrollEl = document.querySelector('.raw-transcript');
  if (scrollEl) {
    let scrollSpeed = 0.3;
    let paused = false;

    scrollEl.addEventListener('mouseenter', () => { paused = true; });
    scrollEl.addEventListener('mouseleave', () => { paused = false; });

    function autoScroll() {
      if (!paused && scrollEl.scrollTop < scrollEl.scrollHeight - scrollEl.clientHeight) {
        scrollEl.scrollTop += scrollSpeed;
      } else if (scrollEl.scrollTop >= scrollEl.scrollHeight - scrollEl.clientHeight) {
        // Reset to top after reaching bottom
        setTimeout(() => {
          scrollEl.scrollTop = 0;
        }, 2000);
      }
      requestAnimationFrame(autoScroll);
    }
    setTimeout(autoScroll, 1500);
  }

  // ── Open first philosophy and first lesson by default ──
  const firstPhil = document.querySelector('.philosophy');
  if (firstPhil) firstPhil.classList.add('open');

  const firstLesson = document.querySelector('.lesson');
  if (firstLesson) firstLesson.classList.add('open');

  // ── Smooth section reveal on scroll ──
  const sections = document.querySelectorAll('.section:not(.section--hero)');
  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('section--visible');
        sectionObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.05 });

  sections.forEach(section => {
    section.classList.add('section--animated');
    sectionObserver.observe(section);
    // Fallback: make visible after 2s in case observer never fires
    setTimeout(() => section.classList.add('section--visible'), 2000);
  });

});

// "What should I do now?" recommendation engine. Plain JS, no JSX.

function getRecommendation({ leads, priorities, schedule }) {
  const today = todayISO();
  const tempWeight = { Hot: 0, Warm: 1, Cold: 2 };

  const openLeads = leads.filter((l) => l.status !== 'Closed');

  // 1. Overdue follow-ups — most overdue, hottest lead first.
  const overdue = openLeads
    .filter((l) => l.nextFollowUp && l.nextFollowUp < today)
    .sort((a, b) => {
      const dt = tempWeight[a.temp] - tempWeight[b.temp];
      if (dt !== 0) return dt;
      return (a.nextFollowUp < b.nextFollowUp ? -1 : 1);
    });
  if (overdue.length) {
    const l = overdue[0];
    const daysLate = -daysDiffFromToday(l.nextFollowUp);
    return {
      icon: '📞',
      action: `Call ${l.name} about ${l.property ? l.property + ' in ' + l.area : l.area}.`,
      reason: `Their follow-up is ${daysLate} day${daysLate > 1 ? 's' : ''} overdue and they're a ${l.temp.toLowerCase()} lead in "${l.status}" — waiting longer risks losing momentum on this deal.`,
    };
  }

  // 2. A meeting later today that isn't done yet.
  const meetingToday = schedule.find((s) => s.category === 'Meeting' && !s.done);
  if (meetingToday) {
    return {
      icon: '📅',
      action: `Prepare for "${meetingToday.label}" at ${meetingToday.time}.`,
      reason: `It's on today's schedule and still marked open — a few minutes of prep now avoids scrambling later.`,
    };
  }

  // 3. Follow-ups due exactly today.
  const dueToday = openLeads
    .filter((l) => l.nextFollowUp === today)
    .sort((a, b) => tempWeight[a.temp] - tempWeight[b.temp]);
  if (dueToday.length) {
    const l = dueToday[0];
    return {
      icon: '📞',
      action: `Reach out to ${l.name} about ${l.property ? l.property + ' in ' + l.area : l.area}.`,
      reason: `Their next follow-up is scheduled for today and they're a ${l.temp.toLowerCase()} lead — keep the conversation moving while it's fresh.`,
    };
  }

  // 4. A high-priority task that isn't done.
  const highPriority = priorities.find((p) => !p.done && p.level === 'High');
  if (highPriority) {
    return {
      icon: '⭐',
      action: `Tackle "${highPriority.title}".`,
      reason: `It's flagged High priority on today's list and still open — it'll have the biggest impact if you do it now.`,
    };
  }

  // 5. Hot leads stuck early in the pipeline.
  const hotStuck = openLeads
    .filter((l) => l.temp === 'Hot')
    .sort((a, b) => stageIndex(a.status) - stageIndex(b.status));
  if (hotStuck.length) {
    const l = hotStuck[0];
    return {
      icon: '🔥',
      action: `Push ${l.name}'s deal from "${l.status}" to the next stage.`,
      reason: `They're a hot lead and every day they sit in "${l.status}" is a day the deal could cool off.`,
    };
  }

  // 6. Any remaining open priority.
  const anyPriority = priorities.find((p) => !p.done);
  if (anyPriority) {
    return {
      icon: '✅',
      action: `Knock out "${anyPriority.title}".`,
      reason: `It's still open on today's priority list and nothing more urgent is waiting right now.`,
    };
  }

  return {
    icon: '🌿',
    action: 'You\'re fully caught up — spend the next hour prospecting for new leads.',
    reason: 'No overdue follow-ups, meetings, or open priorities right now, so this is a great moment to fill the top of your pipeline.',
  };
}

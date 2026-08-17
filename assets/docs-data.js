(() => {
  'use strict';

  const ICON = {
    github: '<svg viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M8 0C3.58 0 0 3.58 0 8C0 11.54 2.29 14.53 5.47 15.59C5.87 15.66 6.02 15.42 6.02 15.21C6.02 15.02 6.01 14.39 6.01 13.72C4 14.09 3.48 13.23 3.32 12.78C3.23 12.55 2.84 11.84 2.5 11.65C2.22 11.5 1.82 11.13 2.49 11.12C3.12 11.11 3.57 11.7 3.72 11.94C4.44 13.15 5.59 12.81 6.05 12.6C6.12 12.08 6.33 11.73 6.56 11.53C4.78 11.33 2.92 10.64 2.92 7.58C2.92 6.71 3.23 5.99 3.74 5.43C3.66 5.23 3.38 4.41 3.82 3.31C3.82 3.31 4.49 3.1 6.02 4.13C6.66 3.95 7.34 3.86 8.02 3.86C8.7 3.86 9.38 3.95 10.02 4.13C11.55 3.09 12.22 3.31 12.22 3.31C12.66 4.41 12.38 5.23 12.3 5.43C12.81 5.99 13.12 6.7 13.12 7.58C13.12 10.65 11.25 11.33 9.47 11.53C9.76 11.78 10.01 12.26 10.01 13.01C10.01 14.08 10 14.94 10 15.21C10 15.42 10.15 15.67 10.55 15.59C13.71 14.53 16 11.53 16 8C16 3.58 12.42 0 8 0Z"/></svg>',
    gitlab: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="#FC6D26" d="m23.6004 9.5927-.0337-.0862L20.3.9814a.851.851 0 0 0-.3362-.405.8748.8748 0 0 0-.9997.0539.8748.8748 0 0 0-.29.4399l-2.2055 6.748H7.5375l-2.2057-6.748a.8573.8573 0 0 0-.29-.4412.8748.8748 0 0 0-.9997-.0537.8585.8585 0 0 0-.3362.4049L.4332 9.5015l-.0325.0862a6.0657 6.0657 0 0 0 2.0119 7.0105l.0113.0087.03.0213 4.976 3.7264 2.462 1.8633 1.4995 1.1321a1.0085 1.0085 0 0 0 1.2197 0l1.4995-1.1321 2.4619-1.8633 5.006-3.7489.0125-.01a6.0682 6.0682 0 0 0 2.0094-7.003z"/></svg>',
    redmine: '<svg fill="#B32024" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="m1.092 15.088c.789.243 4.098 1.005 4.098 1.005.198.061.139.21.139.21-.228 1.798-.178 3.17-.178 3.644 0 .21-.153.18-.153.18h-4.83c-.209 0-.164-.19-.164-.19.04-.599.212-2.303.878-4.746 0 0 .033-.157.21-.103zm21.816 0c-.789.243-4.098 1.005-4.098 1.005-.198.061-.139.21-.139.21.228 1.798.178 3.17.178 3.644 0 .21.153.18.153.18h4.83c.21 0 .164-.19.164-.19-.04-.599-.212-2.303-.878-4.746 0 0-.034-.157-.21-.103zm-1.929-5.354-3.448 1.667c-.164.063-.082.212-.082.212.476 1.134.766 2.091.99 3.251.038.194.169.132.169.132l3.879-1.684s.116-.044.068-.193c-.172-.531-1.05-2.649-1.402-3.341 0 0-.062-.105-.174-.044zm-17.958 0 3.448 1.667c.164.063.082.212.082.212-.476 1.134-.766 2.091-.991 3.251-.037.194-.169.132-.169.132l-3.878-1.684s-.116-.044-.068-.193c.172-.531 1.05-2.649 1.402-3.341 0 0 .062-.105.174-.044zm4.085-4.368 2.302 2.681c.099.128-.032.222-.032.222-.923.498-1.59 1.25-2.161 2.111-.114.17-.236.046-.236.046l-2.917-2.184s-.126-.074-.016-.22c.854-1.134 1.63-1.934 2.871-2.689 0 0 .094-.089.189.033zm9.788 0-2.302 2.681c-.099.128.032.222.032.222.923.498 1.59 1.25 2.161 2.111.114.17.236.046.236.046l2.917-2.184s.126-.074.016-.22c-.854-1.134-1.63-1.934-2.871-2.689 0 0-.094-.089-.189.033zm-4.894 2.295c.388 0 1.105.037 1.444.093.177.03.221-.088.221-.088l1.449-3.028s.097-.114-.106-.188c-1.082-.396-1.657-.578-3.008-.578-1.35 0-1.926.182-3.008.578-.203.074-.106.188-.106.188l1.449 3.028s.044.118.221.088c.339-.056 1.056-.093 1.444-.093z"/></svg>'
  };

  const BRAND_ASSETS = {
    github: ['assets/brand-github.svg', true],
    gitlab: ['assets/brand-gitlab.svg', false],
    redmine: ['assets/brand-redmine.svg', false],
    gerrit: ['assets/brand-gerrit.svg', false, true]
  };

  function glyph(key) {
    const brand = BRAND_ASSETS[key];
    if (!brand) return `<span class="ve-provider-glyph sm letter">${key.slice(0, 2)}</span>`;
    const lightClass = brand[1] ? ' class="is-light"' : brand[2] ? ' class="is-white"' : '';
    return `<span class="ve-provider-glyph sm"><img${lightClass} src="${brand[0]}" alt="" aria-hidden="true"></span>`;
  }

  function tag(text, tone) {
    return `<span class="ve-tag${tone ? ' tone-' + tone : ''}">${text}</span>`;
  }

  function tbl(rows) { return `<div class="ve-tbl">${rows.join('')}</div>`; }
  function row(inner, extra) { return `<div class="ve-row"${extra || ''}>${inner}</div>`; }
  function keyNote(name, note) {
    return row(`<div class="ve-key"><span class="ve-name">${name}</span></div><span class="ve-note">${note}</span>`);
  }
  function keyTagNote(name, def, note) {
    return row(`<div class="ve-key"><span class="ve-name">${name}</span>${tag(def, 'muted')}</div><span class="ve-note">${note}</span>`);
  }

  const SECTIONS = [
    { id: 'start', label: 'Get started', title: 'Get started', desc: 'Install Virtual Engineer and get a first task through the pipeline.', pages: [
      { id: 'requirements', title: 'Requirements', desc: 'What the host needs before you install.' },
      { id: 'install', title: 'Install', desc: 'The one-line installer and its pinning options.' },
      { id: 'install-source', title: 'Install from source', desc: 'Existing checkout, .env, and start.sh.' },
      { id: 'first-project', title: 'First project', desc: 'From an assigned ticket to a change under review.' },
      { id: 'first-review', title: 'First review project', desc: 'Review incoming patchsets with no issue tracker.' }
    ] },
    { id: 'concepts', label: 'Concepts', title: 'Concepts', desc: 'How Virtual Engineer is put together, and the invariants that shape it.', pages: [
      { id: 'architecture', title: 'Architecture', desc: 'Orchestrator, gateway, sandbox, database.' },
      { id: 'tasks', title: 'Tasks and cycles', desc: 'The unit of work, and how many times it may run.' },
      { id: 'states', title: 'Task states', desc: 'One state machine for both workflows.' },
      { id: 'workflows', title: 'The two workflows', desc: 'code-gen and code-review, side by side.' },
      { id: 'capabilities', title: 'Capabilities and bindings', desc: 'Why the workflow never names a provider.' },
      { id: 'prompts', title: 'Prompts', desc: 'System, instructions, and the per-cycle user prompt.' },
      { id: 'trust', title: 'Trust boundaries', desc: 'What the host holds and what the sandbox sees.' }
    ] },
    { id: 'guides', label: 'Guides', title: 'Guides', desc: 'Task-shaped procedures for people running Virtual Engineer.', pages: [
      { id: 'configure-project', title: 'Configure a project', desc: 'Repository, branch, bindings, agent.' },
      { id: 'add-integration', title: 'Add an integration', desc: 'Credentials, validation, and hot refresh.' },
      { id: 'choose-engine', title: 'Choose an agent engine', desc: 'Pick by credential and model catalog.' },
      { id: 'tune-review', title: 'Tune review output', desc: 'Bound comments and raise the severity floor.' },
      { id: 'multi-repo', title: 'Multi-repo workspaces', desc: 'Scan manifests and classify members.' },
      { id: 'push-targets', title: 'Push targets and reviewers', desc: 'Commit order and per-provider reviewer rules.' },
      { id: 'author-prompt', title: 'Author a prompt', desc: 'Clone a built-in and bind the clone.' },
      { id: 'skills', title: 'Install skills', desc: 'Per-engine skill directories, installed host-side.' }
    ] },
    { id: 'hubs', label: 'Hubs', title: 'Topic hubs', desc: 'Cross-cutting subjects gathered on one page: concept, procedure, and reference together.', pages: [
      { id: 'sandbox', title: 'Sandbox', desc: 'Runtime policy, lifecycle, egress, and paths.' },
      { id: 'security', title: 'Security', desc: 'Credentials at rest, exposure, audit, disclosure.' },
      { id: 'review', title: 'Review', desc: 'Ingestion, bounds, and routing guarantees.' },
      { id: 'engines', title: 'Agent engines', desc: 'All eight engines, their auth and their models.' },
      { id: 'providers', title: 'Providers', desc: 'The four external systems and their quirks.' },
      { id: 'observability', title: 'Observability', desc: 'Transitions, cost, and live logs.' }
    ] },
    { id: 'reference', label: 'Reference', title: 'Reference', desc: 'Exhaustive lists. Consult these, do not read them.', pages: [
      { id: 'ref-config', title: 'Environment variables', desc: 'Every variable, its default and its effect.' },
      { id: 'ref-settings', title: 'System settings', desc: 'Runtime-editable limits in app_settings.' },
      { id: 'ref-states', title: 'States and transitions', desc: 'The complete edge list.' },
      { id: 'ref-policy', title: 'Sandbox policy schema', desc: 'Fields of the resolved runtime policy.' },
      { id: 'glossary', title: 'Glossary', desc: 'One term per concept.' }
    ] },
    { id: 'operations', label: 'Operations', title: 'Operations', desc: 'Running Virtual Engineer in production, indexed by symptom.', pages: [
      { id: 'debug', title: 'Debug a task', desc: 'Read the transition log and what it implies.' },
      { id: 'troubleshooting', title: 'Troubleshooting', desc: 'Symptom, cause, fix.' },
      { id: 'faq', title: 'FAQ', desc: 'Recurring operational questions.' }
    ] },
    { id: 'develop', label: 'Develop', title: 'Develop', desc: 'For contributors working on the codebase itself.', pages: [
      { id: 'dev-setup', title: 'Local setup', desc: 'Run the orchestrator from a checkout.' },
      { id: 'codebase', title: 'Codebase tour', desc: 'Where each responsibility lives.' },
      { id: 'migrations', title: 'Migrations', desc: 'Immutable history, fail-closed runner.' },
      { id: 'contributing-docs', title: 'Writing docs', desc: 'Rules this documentation follows.' }
    ] },
    { id: 'project', label: 'Project', title: 'Project', desc: 'License, source, and how to reach the maintainers.', pages: [
      { id: 'credits', title: 'Credits and license', desc: 'Maintainers, license, security contact.' }
    ] }
  ];

  const HOME = { id: 'home', title: 'Virtual Engineer', desc: 'A self-hosted orchestrator that turns assigned tickets into changes under review, and reviews incoming changes on its own.' };
  const MAP = { id: 'docs-map', title: 'All pages', desc: 'The complete page index.' };

  const STEPS = [
    { n: '1', text: 'Add an agent integration and test its connection.' },
    { n: '2', text: 'Add an issue-tracker integration and a source-control integration.' },
    { n: '3', text: 'Create an agent, then select its model and its system and instructions prompts.' },
    { n: '4', text: 'Create a project, bind its repository, branch, integrations, and agent.' },
    { n: '5', text: 'Enable the project, then assign a ticket to the agent.' }
  ];

  const STATES = [
    { name: 'DETECTED', dot: 'var(--info)', meaning: 'New code-gen task created from a ticket' },
    { name: 'CONTEXT_BUILDING', dot: 'var(--info)', meaning: 'Loading ticket, project, and push-target context' },
    { name: 'AGENT_RUNNING', dot: 'var(--accent)', meaning: 'Agent is editing files and may create local commits' },
    { name: 'IN_REVIEW', dot: 'var(--accent)', meaning: 'Change submitted to Gerrit, GitLab, or GitHub' },
    { name: 'FEEDBACK_PROCESSING', dot: 'var(--accent)', meaning: 'Deduplicating and normalizing review comments' },
    { name: 'RETRY_CYCLE', dot: 'var(--warn)', meaning: 'Preparing the next cycle with prior feedback' },
    { name: 'MERGED', dot: 'var(--ok)', meaning: 'External review reports the change merged' },
    { name: 'CLOSING', dot: 'var(--ok)', meaning: 'Closing the originating ticket' },
    { name: 'DONE', dot: 'var(--ok)', meaning: 'Successful completion' },
    { name: 'FAILED', dot: 'var(--danger)', meaning: 'Unrecoverable failure' },
    { name: 'ABANDONED', dot: 'var(--text-ghost)', meaning: 'Manual abandon, or a no-change outcome' },
    { name: 'REVIEW_PENDING', dot: 'var(--info)', meaning: 'Review task created, awaiting agent execution' },
    { name: 'REVIEW_RUNNING', dot: 'var(--accent)', meaning: 'Review agent analyzing a patchset' },
    { name: 'REVIEW_COMMENTING', dot: 'var(--accent)', meaning: 'Posting comments and the vote back' },
    { name: 'REVIEW_WATCHING', dot: 'var(--warn)', meaning: 'Waiting for a follow-up patchset or a terminal outcome' },
    { name: 'REVIEW_DONE', dot: 'var(--ok)', meaning: 'Review completed cleanly' },
    { name: 'REVIEW_FAILED', dot: 'var(--danger)', meaning: 'Review flow failed irrecoverably' }
  ];

  const CAPABILITIES = [
    { name: 'issue_tracking', desc: 'Where tickets are assigned from, scoped by a ticket project key — Redmine, GitLab Issues, or GitHub Issues.' },
    { name: 'source_control', desc: 'Where the repository lives and where the host pushes the resulting commits.' },
    { name: 'code_review', desc: 'Where the change is opened and where review events come back, scoped to a set of repositories.' },
    { name: 'agent_execution', desc: 'Which engine runs the cycle. A review-only project needs no issue tracker.' }
  ];

  const SANDBOX_STEPS = [
    { n: '1', text: 'The host creates a scratch workspace and clones every push target, recording a credential-free remote per local path.' },
    { n: '2', text: 'A uniquely named sandbox is created with the resolved runtime policy; credential env vars are split into a temporary provider.' },
    { n: '3', text: 'Configured skill sources are installed host-side, then the whole workspace — including .git — is uploaded to /sandbox.' },
    { n: '4', text: 'An optional post-clone script runs inside the sandbox, then the agent worker is executed with the repository as its workdir.' },
    { n: '5', text: 'Coding runs download the repository back and rebuild .git from the trusted remotes. Review runs download nothing.' },
    { n: '6', text: 'The sandbox, the temporary credential provider, and the host directory are all destroyed.' }
  ];

  const PATHS = [
    { name: '/sandbox/<repo>', desc: 'The uploaded workspace, and the agent working directory.' },
    { name: '/tmp/user-prompt.txt', desc: 'The per-cycle generated user prompt.' },
    { name: '/app/agent-worker/', desc: 'The worker runtime, read-only.' },
    { name: '/tmp/ve-agent-submission.json', desc: 'The MCP submission artifact.' }
  ];

  const POLICY_FIELDS = [
    { name: 'filesystem_policy.read_only', desc: 'Paths mounted read-only: /usr, /lib, /proc, /dev/urandom, /app, /etc, /var/log.' },
    { name: 'filesystem_policy.read_write', desc: 'Writable paths. Only /sandbox, /tmp and /dev/null; a floor rejects /, /usr, /lib, /etc, /app, /bin, /sbin, /boot, /var.' },
    { name: 'network_policies', desc: 'Absent by default, which means no egress. Populated per run by allowEgress({ hosts, binaries }).' },
    { name: 'landlock.compatibility', desc: 'best_effort — enforced where the kernel supports it.' },
    { name: 'process.run_as_user', desc: 'sandbox. Re-asserted by enforceSandboxFloor() after any override.' }
  ];

  const REVIEW_VARS = [
    { name: 'MAX_REVIEW_DIFF_CHARS', def: '60 000', note: 'Maximum diff characters injected into the review prompt.' },
    { name: 'MAX_REVIEW_COMMENTS', def: '20', note: 'Inline comments per pass; the rest fold into the summary.' },
    { name: 'MAX_REVIEW_REPLIES', def: '20', note: 'Discussion-thread replies posted per pass.' },
    { name: 'REVIEW_MIN_SEVERITY', def: 'info', note: 'Floor for an inline comment: nit < info < warning < error.' }
  ];

  const ENV_VARS = [
    { name: 'DATABASE_PATH', def: './data/virtual-engineer.db', note: 'SQLite file path. WAL mode.' },
    { name: 'ADMIN_API_HOST', def: '127.0.0.1', note: 'Bind host. Keep the Admin UI on loopback unless it sits behind a trusted reverse proxy.' },
    { name: 'ADMIN_API_PORT', def: '3100', note: 'Admin server port.' },
    { name: 'ADMIN_AUTH_SECRET', def: 'required', note: 'Encrypts provider credentials at rest. Minimum 32 characters; generate with openssl rand -hex 32.' },
    { name: 'ADMIN_TRUST_PROXY', def: 'false', note: 'Derive the client IP from X-Forwarded-For. Only behind a proxy that overwrites inbound forwarding headers.' },
    { name: 'AGENT_CONTAINER_IMAGE', def: 'virtual-engineer-workspace:latest', note: 'Image the sandbox is created from. Must contain a sandbox user whose home is /sandbox.' },
    { name: 'WORKSPACE_BASE_DIR', def: '/tmp/virtual-engineer/workspaces', note: 'Host scratch directory for the per-task workspace. No named volumes or bind mounts.' },
    { name: 'OPENSHELL_COMPUTE_DRIVER', def: 'docker', note: 'Sandbox compute driver. kubernetes is experimental.' },
    { name: 'MAX_COMMITS_PER_CYCLE', def: '10', note: 'Upper bound on commits the agent may create in one cycle.' }
  ];

  const DB_VARS = [
    { name: 'POLLING_INTERVAL_MS', def: '30 000', note: 'Tick interval for the polling loop.' },
    { name: 'MAX_AGENT_CYCLES', def: '3', note: 'Per-task cap for coding tasks. Exceeding it moves the task to FAILED.' },
    { name: 'MAX_RETRY_ATTEMPTS', def: '5', note: 'Per-ticket cap. Polling skips a ticket once its failed and abandoned attempts reach it.' },
    { name: 'AGENT_TIMEOUT_MS', def: '3 600 000', note: 'Host-side agent timeout, passed to the sandbox exec.' },
    { name: 'TICKET_CLOSE_MAX_RETRIES', def: '5', note: 'Retry count for closing the ticket after MERGED.' },
    { name: 'TICKET_CLOSE_RETRY_MIN_TIMEOUT_MS', def: '5 000', note: 'Minimum backoff between ticket-close retries.' }
  ];

  const ENGINES = [
    { name: 'GitHub Copilot', auth: 'GitHub OAuth device flow, or a personal access token', models: 'Copilot models, CLI-managed (auto by default)' },
    { name: 'Claude Code', auth: 'Anthropic API key, or Claude Pro/Max via OAuth (auth-code + PKCE)', models: 'Anthropic Claude models' },
    { name: 'Aider', auth: 'Per-backend API key (Ollama needs none)', models: 'OpenAI, Anthropic, Ollama, OpenRouter, DeepSeek, any OpenAI-compatible base URL' },
    { name: 'Goose', auth: 'Per-provider API key (Ollama and Bedrock need none)', models: 'Anthropic, OpenAI, OpenRouter, Ollama, DeepSeek, Groq, Gemini, Azure OpenAI, Bedrock, Perplexity, Mistral, xAI, Cerebras' },
    { name: 'Codex', auth: 'OpenAI API key, or a pasted Codex/ChatGPT access token', models: 'OpenAI Codex models, CLI-managed' },
    { name: 'Gemini CLI', auth: 'Gemini Developer API key, or a Vertex AI Express Mode key', models: 'Google Gemini models' },
    { name: 'OpenCode', auth: 'Per-backend API key (Ollama and Bedrock may need none)', models: 'Anthropic, OpenAI, OpenRouter, Ollama, DeepSeek, Groq, Gemini, Azure OpenAI, Bedrock, Perplexity, Mistral, xAI, Cerebras' },
    { name: 'Cursor', auth: 'Cursor API key', models: 'Cursor-router models — GPT, Claude, Gemini, Grok, and Composer' }
  ];

  const PROVIDERS = [
    { key: 'redmine', name: 'Redmine', caps: 'issue_tracking', desc: 'Ticket source for coding tasks. API key against your instance; issues assigned to the agent are picked up on the polling tick.' },
    { key: 'gitlab', name: 'GitLab', caps: 'issues · code · review', desc: 'Personal access token or OAuth device flow, on gitlab.com or self-hosted. Merge requests carry the change and receive inline comments, replies, and approval.' },
    { key: 'github', name: 'GitHub', caps: 'issues · code · review', desc: 'Personal access token or OAuth, with HMAC-signed webhooks. Reviewers must be usernames, not emails.' },
    { key: 'gerrit', name: 'Gerrit', caps: 'code · review', desc: 'SSH stream-events connection kept open per active integration. Changes get inline comments plus a code-review vote per patchset.' }
  ];

  const FORMATS = ['git submodules', 'west', 'Google repo', 'vcstool', 'VS Code multi-root', 'contrib packages', 'CMake FetchContent', 'kas (Yocto)', 'BitBake recipes'];

  const MEMBERS = [
    { name: 'internal', desc: 'Lives inside the root repository. No separate push target.' },
    { name: 'fork_pushable', desc: 'An enabled integration stands behind it, so VE can push to it.' },
    { name: 'patch_required', desc: 'Upstream-only. Must be patched locally rather than pushed.' },
    { name: 'ambiguous', desc: 'Matches several integrations. Needs a human decision before use.' }
  ];

  const GLOSSARY = [
    { term: 'Task', desc: 'One unit of work, of type code-gen or code-review, with a persisted state machine.' },
    { term: 'Cycle', desc: 'One agent execution inside one task. A coding task may run several.' },
    { term: 'Sandbox', desc: 'The ephemeral OpenShell environment a cycle runs in. Never called a container in this documentation.' },
    { term: 'Gateway', desc: 'The OpenShell service that creates sandboxes through a compute driver and enforces policy.' },
    { term: 'Capability', desc: 'A role a project needs filled: issue_tracking, source_control, code_review, agent_execution.' },
    { term: 'Binding', desc: 'The row that assigns one integration to one capability of one project.' },
    { term: 'Integration', desc: 'A configured external system or agent engine, with encrypted credentials.' },
    { term: 'Engine', desc: 'The agent CLI that executes a cycle. Eight are supported.' },
    { term: 'Push target', desc: 'A repository VE pushes to, ordered by commitOrder.' },
    { term: 'Transition', desc: 'An appended state_transitions row. The audit trail is made of these.' }
  ];

  const SYMPTOMS = [
    { symptom: 'Admin UI does not answer on 127.0.0.1:3100', fix: 'Check the orchestrator process and ADMIN_API_HOST. A non-loopback bind needs a reverse proxy in front of it.' },
    { symptom: 'Startup fails complaining about credentials', fix: 'ADMIN_AUTH_SECRET is missing or changed while encrypted credentials exist. Restore the original secret; it cannot be recovered from the database.' },
    { symptom: 'No task is created from an assigned ticket', fix: 'Confirm the project is enabled, the issue_tracking binding is scoped to the right ticket project key, and the ticket is assigned to the agent identity.' },
    { symptom: 'Tasks fail immediately in AGENT_RUNNING', fix: 'Usually a sandbox policy denial or a missing engine credential. Read the harvested denials for that sandbox and re-test the integration connection.' },
    { symptom: 'A ticket stopped being picked up', fix: 'Its failed and abandoned attempts reached MAX_RETRY_ATTEMPTS. Reset or raise the limit in System Settings.' },
    { symptom: 'Review comments flood a change', fix: 'Raise REVIEW_MIN_SEVERITY before touching MAX_REVIEW_COMMENTS.' }
  ];

  const FAQ = [
    { q: 'Can we run it fully self-hosted?', a: 'Yes. The orchestrator, SQLite database, OpenShell gateway, and sandboxes all run on your infrastructure. Keep the Admin UI on loopback or behind a trusted reverse proxy.' },
    { q: 'What happens if a cycle crashes mid-run?', a: 'SQLite runs in WAL mode and the state machine is persisted, so coding tasks resume at their last recorded state after a restart. AGENT_RUNNING restarts from scratch, since the sandbox is ephemeral.' },
    { q: 'Can the agent merge its own changes?', a: 'No. It proposes changes and votes on review; merging follows your existing branch protection.' },
    { q: 'Can we run several engines at once?', a: 'Yes. Multiple active integrations of the same provider run in parallel, and each agent selects its own engine and model.' },
    { q: 'How do we report a vulnerability?', a: 'Privately, to contact@savoirfairelinux.com rather than a public issue. Reports are acknowledged within 48 hours and assessed within 7 days.' }
  ];

  const TOUR = [
    { path: 'src/plugins/descriptors/', desc: 'One descriptor per integration: capabilities, config schema, connection validator.' },
    { path: 'src/state/', desc: 'Drizzle schema, the state machine, and transition validation.' },
    { path: 'src/orchestrator/', desc: 'Polling, task start, cycle sequencing, feedback processing.' },
    { path: 'src/review/', desc: 'Review trigger building, the review orchestrator, comment and vote posting.' },
    { path: 'src/sandbox/', desc: 'Policy resolution, the sandbox floor, the workspace runner.' },
    { path: 'agent-worker/', desc: 'What actually runs inside the sandbox.' },
    { path: 'drizzle/', desc: 'Immutable migration history, hash-validated at startup.' }
  ];

  const PAGE_CONTENT = {
    home: () => `
      <span class="ve-code">curl -fsSL https://raw.githubusercontent.com/savoirfairelinux/virtual-engineer/main/scripts/install.sh | bash</span>
      <p>The installer creates <span class="ve-m">.env</span>, generates <span class="ve-m">ADMIN_AUTH_SECRET</span>, builds the images, starts the OpenShell gateway, and launches the orchestrator. Then open <span class="ve-m">http://127.0.0.1:3100/admin</span> and create the first admin account.</p>
      <h2>Read the docs by audience</h2>
      <ul>
        <li><a href="#/start">Get started</a> and <a href="#/guides">Guides</a> are for people running Virtual Engineer.</li>
        <li><a href="#/concepts">Concepts</a> and <a href="#/reference">Reference</a> explain the system and list every value it accepts.</li>
        <li><a href="#/develop">Develop</a> is for contributors working on the codebase itself.</li>
      </ul>`,

    requirements: () => `
      <h2>Host requirements</h2>
      <ul>
        <li>Git, curl, and OpenSSL on the host.</li>
        <li>Docker 24 or later, with a running daemon. The default OpenShell compute driver is Docker; Kubernetes is experimental.</li>
        <li>Node.js 20 LTS for a packaged run, Node.js 22+ and npm 10+ for local development.</li>
        <li>OpenShell CLI 0.0.83 and a reachable gateway when you run the orchestrator outside <span class="ve-m">start.sh</span>.</li>
      </ul>
      <h2>What you also need</h2>
      <p>One agent-engine credential, and access to whichever ticket tracker, source-control, and review systems the project should use. Everything else is configured later from the Admin UI.</p>`,

    install: () => `
      <span class="ve-code">curl -fsSL https://raw.githubusercontent.com/savoirfairelinux/virtual-engineer/main/scripts/install.sh | bash</span>
      <p>The script clones the repository, writes <span class="ve-m">.env</span>, generates <span class="ve-m">ADMIN_AUTH_SECRET</span>, builds the agent and orchestrator images, starts local Keycloak when needed, starts the pinned OpenShell gateway, and launches the orchestrator.</p>
      <h2>Pinned and reviewable installs</h2>
      ${tbl([
        keyNote('VE_INSTALL_DIR', 'Target directory for the checkout.'),
        keyNote('VE_REF', 'Branch or tag to install.'),
        keyNote('VE_EXPECTED_COMMIT', 'Refuses to continue unless the checkout resolves to this commit.')
      ])}
      <h2>You should end up with</h2>
      <p>An Admin UI on <span class="ve-m">http://127.0.0.1:3100/admin</span> asking you to create the first admin account. If it does not answer, go to <a href="#/troubleshooting">Troubleshooting</a>.</p>
      <p>Next: <a href="#/first-project">Run your first project</a>.</p>`,

    'install-source': () => `
      <span class="ve-code">cp .env.example .env
printf '\\nADMIN_AUTH_SECRET=%s\\n' "$(openssl rand -hex 32)" >> .env
./scripts/start.sh</span>
      <p><span class="ve-m">start.sh</span> owns the complete self-hosted path: it builds both images, brings up the OpenShell gateway with its compute driver, and starts the orchestrator wired to it.</p>
      <h2>Keep the secret stable</h2>
      <p><span class="ve-m">ADMIN_AUTH_SECRET</span> encrypts provider credentials at rest with AES-256-GCM. It must be at least 32 characters, and startup fails closed if encrypted credentials exist and the secret is missing. Rotating it invalidates every stored credential.</p>
      <p>For a development loop instead of a deployment, see <a href="#/dev-setup">Local setup</a>.</p>`,

    'first-project': () => `
      <p>Everything below happens in the authenticated Admin UI. Nothing is configured through files.</p>
      <div style="display: flex; flex-direction: column; gap: 14px; margin: 22px 0 18px;">
        ${STEPS.map((s) => `<div style="display: flex; gap: 14px; align-items: flex-start;"><span style="width: 24px; height: 24px; flex: none; border-radius: 7px; background: var(--panel-2); border: 1px solid var(--border-soft); display: inline-flex; align-items: center; justify-content: center; font-family: var(--font-mono); font-size: 11.5px; color: var(--info);">${s.n}</span><span style="font-size: 14px; line-height: 1.65; color: var(--text-dim);">${s.text}</span></div>`).join('')}
      </div>
      <h2>You should end up with</h2>
      <p>A task appearing on the polling tick, walking from <span class="ve-m">DETECTED</span> to <span class="ve-m">IN_REVIEW</span>, and a change opened on your review system. If it stops earlier, open the task and read its transitions — see <a href="#/debug">Debug a task</a>.</p>`,

    'first-review': () => `
      <p>A review project needs no issue tracker. It needs a code-review integration, a source-control binding, and an agent.</p>
      <ul>
        <li>Bind a <span class="ve-m">code_review</span> integration and scope it to the repositories it should watch.</li>
        <li>Bind an agent whose prompts are <span class="ve-m">system_review</span> and <span class="ve-m">instructions_review</span>.</li>
        <li>Enable the project, then push a patchset or open a merge request.</li>
      </ul>
      <p>Gerrit arrives over an SSH stream-events connection; GitLab and GitHub arrive over webhooks. The task walks <span class="ve-m">REVIEW_PENDING → REVIEW_RUNNING → REVIEW_COMMENTING</span>, then waits in <span class="ve-m">REVIEW_WATCHING</span> for a follow-up patchset.</p>
      <p>Bounds and severity floors are in the <a href="#/review">review hub</a>.</p>`,

    architecture: () => `
      <p>The orchestrator always runs on the host. The agent never does. Everything an agent touches is an ephemeral sandbox that is destroyed when its cycle exits, along with the host scratch workspace.</p>
      <span class="ve-code">ticket source integration
  → PollingLoop.pollProjectTickets()
  → Orchestrator.startTaskForProject()
  → OpenShellWorkspaceRunner
      host clone → sandbox create → upload
      → post-clone hook → exec → download
  → agent-worker in the sandbox → AgentResult
  → host-side VCS push → review system
  → webhook feedback → Orchestrator</span>
      <h2>Components</h2>
      <ul>
        <li><strong>Orchestrator</strong> — a TypeScript process on the host. Owns polling, state, Git plumbing, and credentials.</li>
        <li><strong>OpenShell gateway</strong> — creates and destroys sandboxes through a compute driver, and enforces runtime policy.</li>
        <li><strong>Agent worker</strong> — runs inside the sandbox at <span class="ve-m">/app/agent-worker/</span>, with the workspace at <span class="ve-m">/sandbox/&lt;repo&gt;</span>.</li>
        <li><strong>SQLite</strong> — one file, WAL mode. State, integrations, prompts, cycles, and cost.</li>
        <li><strong>Admin UI</strong> — the only configuration surface, served on loopback by default.</li>
      </ul>
      <p>Read <a href="#/trust">Trust boundaries</a> next: it is the constraint that explains most of this shape.</p>`,

    tasks: () => `
      <p>A task is the unit of work and the unit of audit. It carries a <span class="ve-m">taskType</span> of <span class="ve-m">code-gen</span> or <span class="ve-m">code-review</span>, and every change to it is an appended row rather than an overwritten field.</p>
      <h2>Cycles</h2>
      <p>A cycle is one agent execution. A coding task may run several: the first implements the ticket, later ones fold in review feedback. <span class="ve-m">MAX_AGENT_CYCLES</span> caps them per task, <span class="ve-m">MAX_RETRY_ATTEMPTS</span> caps how often polling re-picks a failing ticket, and <span class="ve-m">MAX_COMMITS_PER_CYCLE</span> caps commits inside one cycle.</p>
      <h2>Cost</h2>
      <p>Per-cycle cost is derived from <span class="ve-m">assistant.usage</span> events and snapshotted onto <span class="ve-m">agent_cycles</span> at write time, so summaries never recompute at read time.</p>`,

    states: () => `
      <p>Both task types share one <span class="ve-m">TaskState</span> enum and one persisted transition map. <span class="ve-m">validateTransition()</span> returns <span class="ve-m">idempotent</span> for a self-edge, <span class="ve-m">valid</span> for a legal edge, and throws <span class="ve-m">InvalidTransitionError</span> otherwise or when the source state is terminal.</p>
      <div class="ve-tbl">
        ${STATES.map((st) => `<div style="display: flex; gap: 16px; padding: 11px 18px; border-bottom: 1px solid var(--border-soft); flex-wrap: wrap; align-items: center;"><span style="flex: 0 0 auto; min-width: 196px; display: inline-flex; align-items: center; gap: 9px;"><span style="width: 7px; height: 7px; border-radius: 50%; flex: none; background: ${st.dot};"></span><span class="ve-name">${st.name}</span></span><span style="flex: 1 1 220px;" class="ve-note">${st.meaning}</span></div>`).join('')}
      </div>
      <h2>Pause, resume, restart</h2>
      <p>There are no boolean pause columns. <span class="ve-m">pauseTask()</span> and <span class="ve-m">resumeTask()</span> append a <span class="ve-m">state_transitions</span> row where <span class="ve-m">from_state == to_state</span> and <span class="ve-m">metadata.action</span> is <span class="ve-m">pause</span> or <span class="ve-m">resume</span>, so both live in the same audit trail.</p>
      <p>On restart, <span class="ve-m">resumeActiveTasks()</span> resumes non-terminal code-gen tasks only. <span class="ve-m">AGENT_RUNNING</span> restarts from scratch because the sandbox is ephemeral, and <span class="ve-m">FEEDBACK_PROCESSING</span> stays idempotent because processed comments are persisted.</p>
      <p>The full edge list is in <a href="#/ref-states">Reference → States</a>.</p>`,

    workflows: () => `
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(min(100%, 300px), 1fr)); gap: 16px; margin: 24px 0 18px;">
        <div style="background: var(--panel); border: 1px solid var(--border-soft); border-radius: var(--radius-lg); padding: 20px;">
          <div style="font-family: var(--font-mono); font-size: 11.5px; color: var(--info); margin-bottom: 8px;">code-gen</div>
          <div style="font-size: 15px; font-weight: 600; margin-bottom: 8px;">Coding</div>
          <div class="ve-note">An assigned ticket becomes a task. The agent edits the workspace in the sandbox; the host pushes the resulting commits for review and feeds review comments into the next cycle.</div>
        </div>
        <div style="background: var(--panel); border: 1px solid var(--border-soft); border-radius: var(--radius-lg); padding: 20px;">
          <div style="font-family: var(--font-mono); font-size: 11.5px; color: var(--accent); margin-bottom: 8px;">code-review</div>
          <div style="font-size: 15px; font-weight: 600; margin-bottom: 8px;">Review</div>
          <div class="ve-note">A new patchset, merge request, or pull request becomes a task. The agent runs with <span class="ve-m">REVIEW_MODE=1</span> against the diff and posts inline findings, replies, and a decision.</div>
        </div>
      </div>
      <h2>Review routing is integration-scoped</h2>
      <p>A review task persists <span class="ve-m">ticketSourceLabel = &lt;type&gt;:&lt;integrationId&gt;</span>, so several active review integrations cannot collide on the same change number.</p>
      <p>Review runs download nothing back from the sandbox, so any file the reviewing agent edits is discarded by construction.</p>`,

    capabilities: () => `
      <p>Providers are never named in the workflow. A project holds one row per capability in <span class="ve-m">project_integration_bindings</span>, so tickets can come from Redmine while code goes to GitLab.</p>
      ${tbl(CAPABILITIES.map((c) => row(`<div class="ve-key">${tag(c.name, 'info')}</div><span class="ve-note">${c.desc}</span>`, ' style="align-items: flex-start;"')))}
      <p>Delivery targets live in the separate <span class="ve-m">project_push_targets</span> table, ordered by <span class="ve-m">commitOrder</span>. See <a href="#/push-targets">Push targets and reviewers</a>.</p>`,

    prompts: () => `
      <p>Every agent references one <span class="ve-m">system</span> prompt and one <span class="ve-m">instructions</span> prompt. Both are mandatory and resolution is fail-closed: there is no generic or provider-specific fallback, so a missing prompt stops the cycle instead of silently degrading it.</p>
      <p>The user prompt is generated per cycle from the ticket or the review and is never stored.</p>
      <h2>Seeded built-ins</h2>
      <span class="ve-code">system_generic_code
instructions_generic_code
instructions_feedback_code
system_review
instructions_review</span>
      <p>A fresh database seeds exactly these five. To change behavior, clone one and bind the clone — see <a href="#/author-prompt">Author a prompt</a>.</p>`,

    trust: () => `
      <p>One rule explains the architecture: the host owns credentials and Git, the sandbox owns the agent.</p>
      <h2>Host side</h2>
      <ul>
        <li>Clone, checkout, commit, and push. Push and review credentials never enter a sandbox.</li>
        <li>Provider credentials, AES-256-GCM encrypted in SQLite and masked on every admin read. Plaintext credential writes are rejected.</li>
        <li>Skill installation, which happens before upload.</li>
      </ul>
      <h2>Sandbox side</h2>
      <ul>
        <li>The workspace, including <span class="ve-m">.git</span>, uploaded rather than mounted.</li>
        <li>The generated user prompt at <span class="ve-m">/tmp/user-prompt.txt</span>.</li>
        <li>Exactly one model credential, attached as a short-lived OpenShell provider rather than passed on argv.</li>
      </ul>
      <p><span class="ve-m">splitManagedProviderEnv()</span> fails closed on an unmapped variable whose name contains <span class="ve-m">TOKEN</span>, <span class="ve-m">SECRET</span>, <span class="ve-m">API_KEY</span>, <span class="ve-m">PASSWORD</span>, or <span class="ve-m">CREDENTIAL</span>, so a new secret cannot leak into a sandbox by omission.</p>
      <p>The internal MCP server exposes only <span class="ve-m">ve_submit_review</span> or <span class="ve-m">ve_submit_changes</span> — no network tools, no database, no Docker socket.</p>`,

    'configure-project': () => `
      <p>A project is the object that ties a repository, a branch, a set of integrations, and an agent together.</p>
      <ul>
        <li>Set the repository and the base branch VE should work from.</li>
        <li>Bind one integration per capability the project needs. A coding project needs <span class="ve-m">issue_tracking</span>; a review project does not.</li>
        <li>Scope <span class="ve-m">issue_tracking</span> to a ticket project key, and <span class="ve-m">code_review</span> to the repositories it may act on.</li>
        <li>Bind an agent, then enable the project. Nothing is polled until it is enabled.</li>
      </ul>
      <p>Concurrency is per agent, not global: each agent carries its own limit for how many cycles may run at once.</p>`,

    'add-integration': () => `
      <p>Add the integration first, test its connection, and only then bind it to a project. An integration that fails its validator will fail the same way inside a cycle.</p>
      <ul>
        <li>Credentials are encrypted on write and masked on every read. You cannot retrieve one after saving it.</li>
        <li>Webhook secrets cannot be read back after creation. Rotation is per integration.</li>
        <li>Multiple active integrations of the same provider run in parallel, each addressable by its <span class="ve-m">integrationId</span>.</li>
        <li>Runtime dependencies hot-refresh after a change, so no restart is needed.</li>
      </ul>
      <p>Provider-specific notes are in the <a href="#/providers">providers hub</a>.</p>`,

    'choose-engine': () => `
      <p>Eight engines can execute a cycle. The choice affects authentication and model catalog, not the workflow.</p>
      <ul>
        <li>Pick by the credential you already have: an API key, a subscription OAuth flow, or a pasted access token.</li>
        <li>Aider, Goose, and OpenCode each wrap many LLM backends, so one integration can serve several models.</li>
        <li>The selected model lives on the <span class="ve-m">agents</span> table, not on the integration config.</li>
        <li>Copilot defaults to model <span class="ve-m">auto</span>; other CLIs pick their own default when no model is set.</li>
      </ul>
      <p>Per-engine authentication and skill conventions are in the <a href="#/engines">engines hub</a>.</p>`,

    'tune-review': () => `
      <p>Review output is bounded so one pass cannot flood a change. Findings below the severity floor are folded into the summary comment instead of being posted inline.</p>
      ${tbl(REVIEW_VARS.map((v) => keyTagNote(v.name, v.def, v.note)))}
      <p>Raise the floor before raising the comment cap: a quieter review is usually a more useful one.</p>`,

    'multi-repo': () => `
      <p>A coding project can span several repositories. Scanning the primary target inventories its declarative manifests read-only, without executing any build code, and reports what it finds. Nothing is persisted until you add a member explicitly and save.</p>
      <div style="display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 18px;">${FORMATS.map((f) => tag(f, 'muted')).join('')}</div>
      <h2>Member classification</h2>
      ${tbl(MEMBERS.map((m) => keyNote(m.name, m.desc)))}
      <p>Members VE cannot push become tracked vendor components; members it owns become push targets.</p>`,

    'push-targets': () => `
      <p>Push targets are ordered by <span class="ve-m">commitOrder</span>, so a dependency lands before the repository that consumes it.</p>
      <h2>Reviewers</h2>
      <p>Each target may carry up to 20 reviewer email addresses, and each provider treats them differently.</p>
      <ul>
        <li><strong>Gerrit</strong> receives one <span class="ve-m">r=&lt;email&gt;</span> push option per address.</li>
        <li><strong>GitLab</strong> resolves the addresses to numeric reviewer ids.</li>
        <li><strong>GitHub</strong> rejects reviewer emails, because it requires usernames.</li>
      </ul>`,

    'author-prompt': () => `
      <p>Prompts are database records, not files. Clone a built-in rather than editing it, so a fresh seed stays comparable.</p>
      <ul>
        <li>A <span class="ve-m">system</span> prompt sets the role and constraints. An <span class="ve-m">instructions</span> prompt sets the procedure for one workflow.</li>
        <li>Both are mandatory on every agent, and resolution is fail-closed.</li>
        <li>The user prompt is generated per cycle and never stored, so never put per-ticket detail in a stored prompt.</li>
        <li>Feedback cycles use <span class="ve-m">instructions_feedback_code</span>, which is a separate record from the first-pass instructions.</li>
      </ul>`,

    skills: () => `
      <p>Project skill sources are installed host-side before upload, into each engine's own project-relative directory.</p>
      <span class="ve-code">.claude/skills/
.agents/skills/
.goose/skills/
.codex/skills/
.opencode/skills/</span>
      <p>Aider, Gemini CLI, and Cursor have no confirmed convention and are skipped rather than guessed at. Because installation happens before upload, a skill source never needs sandbox network access.</p>`,

    sandbox: () => `
      <p>Isolation comes from OpenShell runtime policies, not from Docker flags. The sandbox spec carries only an image, env, command, an optional prompt, and an optional egress spec — there is no <span class="ve-m">networkMode</span>, <span class="ve-m">--read-only</span>, <span class="ve-m">--cap-drop</span>, or <span class="ve-m">--tmpfs</span>. VE never runs <span class="ve-m">docker run</span> for an agent; Docker appears only as the gateway's compute driver.</p>
      <h2>Base policy</h2>
      <span class="ve-code">version: 1
filesystem_policy:
  read_only:  [/usr, /lib, /proc, /dev/urandom,
               /app, /etc, /var/log]
  read_write: [/sandbox, /tmp, /dev/null]
landlock:
  compatibility: best_effort
process:
  run_as_user: sandbox
  run_as_group: sandbox</span>
      <p>No <span class="ve-m">network_policies</span> section means no egress: network is deny-by-default, and each run opens only what its adapter declares through <span class="ve-m">allowEgress({ hosts, binaries })</span>. Per-project and per-agent overrides compose on top, after which <span class="ve-m">enforceSandboxFloor()</span> re-asserts the sandbox user and rejects any <span class="ve-m">read_write</span> entry naming <span class="ve-m">/</span>, <span class="ve-m">/usr</span>, <span class="ve-m">/lib</span>, <span class="ve-m">/etc</span>, <span class="ve-m">/app</span>, <span class="ve-m">/bin</span>, <span class="ve-m">/sbin</span>, <span class="ve-m">/boot</span>, or <span class="ve-m">/var</span>.</p>
      <h2>Lifecycle per cycle</h2>
      <div style="display: flex; flex-direction: column; gap: 10px; margin-bottom: 18px;">
        ${SANDBOX_STEPS.map((s) => `<div style="display: flex; gap: 14px; align-items: baseline;"><span style="font-family: var(--font-mono); font-size: 11.5px; color: var(--text-ghost); width: 20px; flex: none;">${s.n}</span><span style="font-size: 13.5px; line-height: 1.65; color: var(--text-dim);">${s.text}</span></div>`).join('')}
      </div>
      <h2>Paths inside the sandbox</h2>
      ${tbl(PATHS.map((p) => keyNote(p.name, p.desc)))}
      <p>Policy denials are harvested best-effort after every attempt from the sandbox logs, scrubbed, and deduplicated per sandbox. Related: <a href="#/trust">Trust boundaries</a>, <a href="#/ref-policy">policy schema</a>, <a href="#/security">security hub</a>.</p>`,

    security: () => `
      <p>The agent runs with the least access it needs: an ephemeral sandbox per cycle, no push or review credentials inside it, and a record of everything it did.</p>
      <h2>Credentials at rest</h2>
      <ul>
        <li>Provider credentials are AES-256-GCM encrypted in SQLite under <span class="ve-m">ADMIN_AUTH_SECRET</span> and masked on every admin read.</li>
        <li>Plaintext credential writes are rejected.</li>
        <li>Webhook secrets are not readable after creation; rotation is per integration.</li>
        <li>Startup fails closed when encrypted credentials exist without the secret.</li>
      </ul>
      <h2>Exposure</h2>
      <p>The Admin UI binds to <span class="ve-m">127.0.0.1</span> by default. Put it behind a trusted reverse proxy before exposing it, and only enable <span class="ve-m">ADMIN_TRUST_PROXY</span> when that proxy overwrites inbound forwarding headers.</p>
      <h2>Audit</h2>
      <p>Every state transition, including pause and resume, is an appended <span class="ve-m">state_transitions</span> row. Nothing in the task lifecycle is edited in place.</p>
      <h2>Reporting a vulnerability</h2>
      <p>Report privately to <span class="ve-m">contact@savoirfairelinux.com</span> rather than a public issue. Reports are acknowledged within 48 hours and assessed within 7 days.</p>`,

    review: () => `
      <p>Everything about the review workflow, in one place.</p>
      <h2>Ingestion</h2>
      <span class="ve-code">webhook / Gerrit stream-event / review-assignment poll
  → buildReviewTrigger()
  → ReviewOrchestrator.startReviewTask()
  → sandbox run with REVIEW_MODE=1
  → provider posts comments and vote
  → REVIEW_WATCHING / REVIEW_DONE / REVIEW_FAILED</span>
      <h2>Bounds</h2>
      ${tbl(REVIEW_VARS.map((v) => keyTagNote(v.name, v.def, v.note)))}
      <h2>Guarantees</h2>
      <ul>
        <li>Routing is integration-scoped end to end, so two review integrations cannot collide on one change number.</li>
        <li>Review runs download nothing, so review-time edits are discarded.</li>
        <li>A follow-up patchset re-enters <span class="ve-m">REVIEW_RUNNING</span> from <span class="ve-m">REVIEW_WATCHING</span> instead of creating a second task.</li>
      </ul>
      <p>See also <a href="#/first-review">First review project</a>, <a href="#/tune-review">Tune review output</a>, <a href="#/prompts">prompts</a>.</p>`,

    engines: () => `
      <p>Each engine has its own adapter, connection validator, and model service. The workflow does not change with the engine.</p>
      ${tbl(ENGINES.map((e) => row(`<div class="ve-key"><span style="font-size: 14px; font-weight: 600; color: var(--text);">${e.name}</span></div><span class="ve-note"><strong style="color: var(--text-faint); font-weight: 500;">Auth</strong> · ${e.auth}</span><span class="ve-note"><strong style="color: var(--text-faint); font-weight: 500;">Models</strong> · ${e.models}</span>`)))}
      <p>Skill directories differ per engine — see <a href="#/skills">Install skills</a>.</p>`,

    providers: () => `
      <p>Four external systems, bound by capability rather than by name.</p>
      ${tbl(PROVIDERS.map((p) => row(`<div class="ve-key">${glyph(p.key)}<span style="font-size: 14px; font-weight: 600; color: var(--text);">${p.name}</span>${tag(p.caps, 'muted')}</div><span class="ve-note">${p.desc}</span>`)))}
      <p>Reviewer handling differs by provider — see <a href="#/push-targets">Push targets and reviewers</a>.</p>`,

    observability: () => `
      <p>Three sources answer almost every question about a run: the transition log, the cycle record, and the live agent stream.</p>
      <h2>Transitions</h2>
      <p>Every state change writes a <span class="ve-m">state_transitions</span> row with metadata. Timestamps are stored in seconds, so read them with <span class="ve-m">datetime(col, 'unixepoch')</span>.</p>
      <h2>Cost and model usage</h2>
      <p>Derived from <span class="ve-m">assistant.usage</span> events and snapshotted onto <span class="ve-m">agent_cycles</span> at write time. Summaries read those columns directly.</p>
      <h2>Live logs</h2>
      <p>The Admin UI streams agent logs over the shared agent event bus while a cycle runs. Sandbox policy denials are harvested after each attempt, scrubbed, and deduplicated.</p>
      <p>Query recipes are in <a href="#/debug">Debug a task</a>.</p>`,

    'ref-config': () => `
      <p>Environment variables carry system and infrastructure settings only. All provider configuration lives in the <span class="ve-m">integrations</span> table. Configuration is Zod-validated once at boot and throws listing every offending field; empty strings are preprocessed to <span class="ve-m">undefined</span>, so <span class="ve-m">FIELD=""</span> does not poison an optional setting.</p>
      ${tbl(ENV_VARS.map((v) => keyTagNote(v.name, v.def, v.note)))}`,

    'ref-settings': () => `
      <p>Workflow limits are seeded from the environment but live in <span class="ve-m">app_settings</span>, editable at runtime under Configuration → System Settings with no restart.</p>
      ${tbl(DB_VARS.map((v) => keyTagNote(v.name, v.def, v.note)))}`,

    'ref-states': () => `
      <p>The complete edge list. Any edge not listed here throws <span class="ve-m">InvalidTransitionError</span>.</p>
      <span class="ve-code">DETECTED            → CONTEXT_BUILDING | FAILED
CONTEXT_BUILDING    → AGENT_RUNNING | FAILED
AGENT_RUNNING       → IN_REVIEW | RETRY_CYCLE | FAILED | ABANDONED
IN_REVIEW           → FEEDBACK_PROCESSING | MERGED | ABANDONED | FAILED
FEEDBACK_PROCESSING → RETRY_CYCLE | IN_REVIEW | FAILED | ABANDONED
RETRY_CYCLE         → AGENT_RUNNING | ABANDONED | FAILED
MERGED              → CLOSING | DONE | FAILED
CLOSING             → DONE | FAILED

REVIEW_PENDING      → REVIEW_RUNNING | REVIEW_FAILED
REVIEW_RUNNING      → REVIEW_COMMENTING | REVIEW_FAILED
REVIEW_COMMENTING   → REVIEW_WATCHING | REVIEW_DONE | REVIEW_FAILED
REVIEW_WATCHING     → REVIEW_RUNNING | REVIEW_DONE | REVIEW_FAILED</span>
      <p>Terminal states: <span class="ve-m">DONE</span>, <span class="ve-m">FAILED</span>, <span class="ve-m">ABANDONED</span>, <span class="ve-m">REVIEW_DONE</span>, <span class="ve-m">REVIEW_FAILED</span>. What each state means is in <a href="#/states">Concepts → Task states</a>.</p>`,

    'ref-policy': () => `
      <p>The resolved runtime policy sent to the gateway per cycle.</p>
      ${tbl(POLICY_FIELDS.map((f) => keyNote(f.name, f.desc)))}
      <p>Overrides compose per project and per agent; <span class="ve-m">enforceSandboxFloor()</span> runs last and cannot be overridden. Narrative version: <a href="#/sandbox">sandbox hub</a>.</p>`,

    glossary: () => `
      <p>One term per concept, used consistently across this documentation.</p>
      ${tbl(GLOSSARY.map((g) => row(`<div class="ve-key"><span style="font-size: 13.5px; font-weight: 600; color: var(--text);">${g.term}</span></div><span class="ve-note">${g.desc}</span>`)))}`,

    debug: () => `
      <p>Start from the transition log. It is append-only, so it tells you what happened rather than what the current state implies.</p>
      <span class="ve-code">SELECT from_state, to_state, metadata,
       datetime(created_at, 'unixepoch') AS at
FROM state_transitions
WHERE task_id = 'X'
ORDER BY id;</span>
      <h2>Reading it</h2>
      <ul>
        <li>A row where <span class="ve-m">from_state == to_state</span> is a pause or resume, not a loop.</li>
        <li>Repeated <span class="ve-m">RETRY_CYCLE</span> rows mean review feedback kept coming back; check <span class="ve-m">MAX_AGENT_CYCLES</span>.</li>
        <li>A task that never left <span class="ve-m">CONTEXT_BUILDING</span> is a host-side clone or binding problem, not an agent problem.</li>
        <li>A cycle that ends in <span class="ve-m">FAILED</span> right after <span class="ve-m">AGENT_RUNNING</span> is usually a sandbox policy denial — check the harvested denials for that sandbox.</li>
      </ul>`,

    troubleshooting: () => tbl(SYMPTOMS.map((s) => row(`<div class="ve-key"><span style="font-size: 13.5px; font-weight: 600; color: var(--text);">${s.symptom}</span></div><span class="ve-note">${s.fix}</span>`))),

    faq: () => `
      <div style="display: flex; flex-direction: column; gap: 20px; margin-top: 24px;">
        ${FAQ.map((f) => `<div><div style="font-size: 14.5px; font-weight: 600; color: var(--text); margin-bottom: 7px;">${f.q}</div><div class="ve-note">${f.a}</div></div>`).join('')}
      </div>`,

    'dev-setup': () => `
      <p>Requires Node.js 22+, npm 10+, Docker 24+, OpenShell CLI 0.0.83, and a reachable OpenShell gateway.</p>
      <span class="ve-code">npm install
cp .env.example .env
printf '\\nADMIN_AUTH_SECRET=%s\\n' "$(openssl rand -hex 32)" >> .env
npm run db:migrate
npm run build:ui
docker build -f Dockerfile.agent -t virtual-engineer-workspace:latest .
npm run dev</span>
      <p><span class="ve-m">npm run dev</span> starts the host orchestrator only. Set <span class="ve-m">OPENSHELL_GATEWAY</span> to an existing CLI profile, or <span class="ve-m">OPENSHELL_GATEWAY_ENDPOINT</span> to a reachable endpoint, before running it. Use <span class="ve-m">./scripts/start.sh</span> for the complete Docker/OpenShell path.</p>`,

    codebase: () => `
      <p>Where to look before changing anything.</p>
      ${tbl(TOUR.map((t) => keyNote(t.path, t.desc)))}
      <p>Reference documentation lives in the repository: <a href="https://github.com/savoirfairelinux/virtual-engineer/blob/main/docs/ARCHITECTURE.md" target="_blank" rel="noopener">architecture and data flow</a>, <a href="https://github.com/savoirfairelinux/virtual-engineer/blob/main/SECURITY.md" target="_blank" rel="noopener">security architecture</a>, and the <a href="https://github.com/savoirfairelinux/virtual-engineer/blob/main/deploy/k8s/README.md" target="_blank" rel="noopener">Kubernetes deployment guide</a>.</p>`,

    migrations: () => `
      <p>Schema changes go through <span class="ve-m">src/state/schema.ts</span> and <span class="ve-m">npm run db:generate</span>, which writes an immutable migration under <span class="ve-m">drizzle/</span>.</p>
      <p>Applied migrations are never edited. The runner validates recorded SQL hashes against the checked-in history and fails closed on unknown or modified history, so a rewritten migration is a startup error rather than a silent divergence.</p>
      <h2>Adding a state</h2>
      <p>A new <span class="ve-m">TaskState</span> needs its enum entry, its edges in the transition map, and a migration. An edge that is not declared throws at runtime.</p>`,

    'contributing-docs': () => `
      <p>Documentation lives in the same repository and ships in the same pull request as the code it describes.</p>
      <h2>Rules</h2>
      <ul>
        <li>One page, one intention. A title needing "and" is two pages.</li>
        <li>Information exists in exactly one place; everywhere else links to it.</li>
        <li>Exact values — variable names, defaults, state names, paths — come from the code, never from memory.</li>
        <li>Concepts explain why and never contain procedures; guides do the reverse.</li>
        <li>Reference tables are generated from the source of truth where possible, so they cannot drift.</li>
        <li>Warnings are reserved for data loss and security regressions.</li>
      </ul>
      <h2>Audience</h2>
      <p>User-facing pages never describe source layout, and developer pages never explain how to configure a project. If a page needs both, it is two pages.</p>`,

    credits: () => `
      <p>Virtual Engineer is developed by <a href="https://savoirfairelinux.com" target="_blank" rel="noopener">Savoir-faire Linux</a> and released under GPL-3.0-only.</p>
      <p>Source, issues, and releases: <a href="https://github.com/savoirfairelinux/virtual-engineer" target="_blank" rel="noopener">github.com/savoirfairelinux/virtual-engineer</a>. Security reports go privately to <span class="ve-m">contact@savoirfairelinux.com</span>.</p>`,

    'docs-map': () => SECTIONS.map((sec) => `
      <h2>${sec.label}</h2>
      <ul>${sec.pages.map((pg) => `<li><a href="#/${pg.id}">${pg.title}</a> — ${pg.desc}</li>`).join('')}</ul>`).join('')
  };

  window.VEDocs = { SECTIONS, HOME, MAP, PAGE_CONTENT };
})();

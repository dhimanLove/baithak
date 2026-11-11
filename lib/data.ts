import type { Meeting, Person, TranscriptLine } from "./types";

export const PEOPLE: Person[] = [
  { id: "p-priya", name: "Priya Sharma" },
  { id: "p-rahul", name: "Rahul Verma" },
  { id: "p-ankit", name: "Ankit Mehta" },
  { id: "p-sneha", name: "Sneha Iyer" },
  { id: "p-vikram", name: "Vikram Singh" },
  { id: "p-meera", name: "Meera Nair" },
];

const [priya, rahul, ankit, sneha, vikram, meera] = PEOPLE;

const SPRINT_TRANSCRIPT: TranscriptLine[] = [
  { id: "t-001", speakerId: priya.id, text: "Right, let us get started. We have forty minutes on the calendar, so I will keep us to the three things that matter this sprint.", timestamp: "00:00" },
  { id: "t-002", speakerId: rahul.id, text: "Sounds good. Last sprint we carried over two tickets from the dispatch module, so I would like to close those first.", timestamp: "00:14" },
  { id: "t-003", speakerId: priya.id, text: "How close are we on those? Are they blocked on anything from the client side?", timestamp: "00:26" },
  { id: "t-004", speakerId: rahul.id, text: "One is waiting on their webhook credentials, which they promised last Tuesday. The other is purely on us, it is about eighty percent done.", timestamp: "00:38" },
  { id: "t-005", speakerId: ankit.id, text: "I can take the webhook integration if the credentials land by Wednesday. It is maybe a day and a half of work once I have them.", timestamp: "00:55" },
  { id: "t-006", speakerId: priya.id, text: "Good. I will chase their engineering manager today and treat Wednesday as a hard cutoff.", timestamp: "01:08" },
  { id: "t-007", speakerId: sneha.id, text: "On the design side, we finished the empty states and the loading skeletons. What is left is the offline banner, which I did not expect to need this quarter.", timestamp: "01:22" },
  { id: "t-008", speakerId: priya.id, text: "The offline banner came out of the NorthStar conversation. They specifically said drivers will be in low-connectivity areas on the highway.", timestamp: "01:36" },
  { id: "t-009", speakerId: sneha.id, text: "Then I will finish it by Friday. It is mostly a matter of getting the state machine right so we do not flash the banner on a brief signal drop.", timestamp: "01:49" },
  { id: "t-010", speakerId: vikram.id, text: "Let us be careful about scope. If we add the offline banner, are we dropping anything from this sprint?", timestamp: "02:01" },
  { id: "t-011", speakerId: priya.id, text: "Good question. We are dropping the bulk export for drivers. Meera and I agreed last week that it is an enterprise upsell item rather than something that belongs here.", timestamp: "02:14" },
  { id: "t-012", speakerId: meera.id, text: "That matches what I heard from sales. Two of the three enterprise prospects asked for it, but none of them made it a blocker for signing.", timestamp: "02:29" },
  { id: "t-013", speakerId: vikram.id, text: "Then I am comfortable. I will update the sprint board and the customer-facing changelog so support knows what to say.", timestamp: "02:42" },
  { id: "t-014", speakerId: ankit.id, text: "One more thing from my side. The load test for the routing service failed at around two thousand concurrent users. We are fine at the current volume, but I do not want to be surprised in Q4.", timestamp: "02:57" },
  { id: "t-015", speakerId: rahul.id, text: "What is the number we are actually serving now? I want to make sure we are testing against something realistic.", timestamp: "03:10" },
  { id: "t-016", speakerId: ankit.id, text: "Peak sustained is about four hundred, and our busiest day was just over six hundred. The failure at two thousand is not a fire, it is a warning.", timestamp: "03:21" },
  { id: "t-017", speakerId: priya.id, text: "Then let us write it down as a Q4 risk rather than a sprint item. Ankit, can you put together a short note on what would need to change?", timestamp: "03:38" },
  { id: "t-018", speakerId: ankit.id, text: "Yes, I will write it up before the end of the week. The short version is we need caching on the route lookup, and that is a design decision, not just a config change.", timestamp: "03:50" },
  { id: "t-019", speakerId: sneha.id, text: "Can you loop me in on that note? If it changes how the map view loads I would rather know now than rebuild it later.", timestamp: "04:04" },
  { id: "t-020", speakerId: ankit.id, text: "Will do, I will send it to both of you.", timestamp: "04:11" },
  { id: "t-021", speakerId: rahul.id, text: "Let us also talk about the release on Friday. Are we comfortable shipping on a Friday afternoon again?", timestamp: "04:18" },
  { id: "t-022", speakerId: priya.id, text: "I would rather move it to Thursday evening. If something goes wrong we would rather have a working day behind us than be watching it over the weekend.", timestamp: "04:31" },
  { id: "t-023", speakerId: vikram.id, text: "Agreed. Thursday, and I will send the changelog to support by Wednesday evening so they have the notes before the deploy.", timestamp: "04:45" },
  { id: "t-024", speakerId: priya.id, text: "That is everything on my list. Three decisions, four action items, and we are inside the time. Thanks everyone.", timestamp: "04:58" },
];

const CLIENT_TRANSCRIPT: TranscriptLine[] = [
  { id: "t-101", speakerId: priya.id, text: "Thank you for making time, we wanted to walk you through where the integration stands and what we need from your side.", timestamp: "00:00" },
  { id: "t-102", speakerId: rahul.id, text: "Before we go into detail, is there anything from last week's call that you would like us to come back to?", timestamp: "00:19" },
  { id: "t-103", speakerId: meera.id, text: "The only open item is the sandbox credentials. Our engineers never received them.", timestamp: "00:29" },
  { id: "t-104", speakerId: ankit.id, text: "That is on us. They were generated but the email bounced, so we regenerated and sent them again this morning.", timestamp: "00:38" },
  { id: "t-105", speakerId: priya.id, text: "Then let us park that. On timelines, we are targeting the pilot going live with your Pune fleet in the first week of November.", timestamp: "00:50" },
];

const HIRING_TRANSCRIPT: TranscriptLine[] = [
  { id: "t-201", speakerId: ankit.id, text: "We have three candidates at the same stage, so let us take them one at a time and keep this to the hour.", timestamp: "00:00" },
  { id: "t-202", speakerId: priya.id, text: "The bar for this role is that they can hold a design discussion with a product manager, not just write code against a spec.", timestamp: "00:16" },
  { id: "t-203", speakerId: sneha.id, text: "Agreed. I would rather we make a slower hire than someone who will need heavy review on system design.", timestamp: "00:28" },
];

const MEETINGS: Meeting[] = [
  {
    id: "m-001",
    title: "Sprint 24 Planning",
    date: "2026-09-12T09:30:00+05:30",
    durationMin: 42,
    participants: [priya, rahul, ankit, sneha, vikram, meera],
    summary:
      "We agreed the sprint will be spent closing the two carried-over dispatch tickets, shipping the offline banner for low-connectivity drivers, and deferring bulk export to Q4. Ankit flagged that load testing failed at two thousand concurrent users, which we agreed to treat as a Q4 architectural risk rather than a sprint blocker. The release moves from Friday afternoon to Thursday evening so support has a working day behind any issue. Meera confirmed with sales that bulk export is an enterprise upsell and not a blocker for any live prospect.",
    decisions: [
      "Bulk export for drivers is deferred to Q4 and scoped as an enterprise upsell item.",
      "The Q4 release moves to Thursday evening instead of Friday afternoon.",
      "The routing service load-test failure is logged as a Q4 risk, with a written note on the caching approach before sprint end.",
    ],
    actionItems: [
      {
        id: "a-001",
        text: "Chase NorthStar's engineering manager for the webhook credentials, with Wednesday as a hard cutoff",
        ownerId: priya.id,
        due: "2026-09-16",
        done: true,
      },
      {
        id: "a-002",
        text: "Finish the offline banner and its state machine so a brief signal drop does not flash it",
        ownerId: sneha.id,
        due: "2026-09-18",
        done: false,
      },
      {
        id: "a-003",
        text: "Update the sprint board and the customer-facing changelog for the deferred bulk export",
        ownerId: vikram.id,
        due: "2026-09-18",
        done: false,
      },
      {
        id: "a-004",
        text: "Write up what the routing service would need to handle two thousand concurrent users",
        ownerId: ankit.id,
        due: "2026-09-19",
        done: false,
      },
    ],
    transcript: SPRINT_TRANSCRIPT,
  },
  {
    id: "m-002",
    title: "Client Sync — NorthStar Logistics",
    date: "2026-09-18T15:00:00+05:30",
    durationMin: 35,
    participants: [priya, rahul, meera, ankit],
    summary:
      "NorthStar confirmed the pilot with their Pune fleet is targeted for the first week of November, which is ahead of what their board had assumed. Their engineering manager raised concerns about webhook reliability during peak dispatch windows and asked for a documented retry policy. We committed to sending a written integration guide before their next internal review. Meera will introduce us to their operations head so the rollout plan accounts for how their depots actually schedule shifts.",
    decisions: [
      "The pilot with NorthStar's Pune fleet goes live in the first week of November.",
      "A written webhook retry policy will be delivered before NorthStar's next internal review.",
      "An introduction to their operations head is requested to align the rollout with depot shift patterns.",
    ],
    actionItems: [
      {
        id: "a-101",
        text: "Send NorthStar the integration guide covering setup, auth and webhook verification",
        ownerId: rahul.id,
        due: "2026-09-22",
        done: true,
      },
      {
        id: "a-102",
        text: "Document the webhook retry policy and share it with their engineering manager",
        ownerId: ankit.id,
        due: "2026-09-24",
        done: false,
      },
      {
        id: "a-103",
        text: "Arrange an introduction to NorthStar's operations head for depot shift patterns",
        ownerId: meera.id,
        due: "2026-09-25",
        done: false,
      },
      {
        id: "a-104",
        text: "Draft the pilot success criteria and share them with NorthStar in writing",
        ownerId: meera.id,
        due: "2026-09-30",
        done: false,
      },
    ],
    transcript: CLIENT_TRANSCRIPT,
  },
  {
    id: "m-003",
    title: "Q4 Budget Review",
    date: "2026-09-22T11:00:00+05:30",
    durationMin: 51,
    participants: [vikram, meera, ankit],
    summary:
      "We reviewed the Q4 budget line by line and landed on protecting two headcount additions in platform engineering over hiring for the analytics surface. Cloud spend is forecast to rise by eighteen percent, driven almost entirely by the routing service scaling out, and the team agreed to enable the reserved tier before the Diwali freeze. Marketing agreed to hold the field event spend until the pilot results are in. Ankit flagged that if the load-test work becomes a full re-architecture, it will need a budget conversation in October rather than being absorbed silently.",
    decisions: [
      "Two platform engineering hires proceed in Q4; the analytics surface role is deferred.",
      "The reserved cloud tier is enabled before the Diwali change freeze to absorb routing service growth.",
      "The field event budget is held until the NorthStar pilot results are available.",
    ],
    actionItems: [
      {
        id: "a-201",
        text: "Move the routing service onto the reserved cloud tier ahead of the change freeze",
        ownerId: ankit.id,
        due: "2026-09-28",
        done: true,
      },
      {
        id: "a-202",
        text: "Prepare a revised Q4 forecast that models the eighteen percent cloud increase",
        ownerId: vikram.id,
        due: "2026-09-30",
        done: false,
      },
      {
        id: "a-203",
        text: "Re-open the budget line for the routing re-architecture once the Q4 note is written",
        ownerId: vikram.id,
        due: "2026-10-07",
        done: false,
      },
      {
        id: "a-204",
        text: "Confirm the reserved tier pricing with the cloud account team before sign-off",
        ownerId: meera.id,
        due: "2026-09-30",
        done: false,
      },
    ],
    transcript: [],
  },
  {
    id: "m-004",
    title: "Product Roadmap — Oct to Dec",
    date: "2026-09-24T16:30:00+05:30",
    durationMin: 28,
    participants: [priya, sneha, vikram],
    summary:
      "The roadmap for the quarter is a consolidation quarter rather than a launch quarter. We are prioritising reliability work, the offline experience and the enterprise bulk export over any new surface area. Sneha argued for finishing the design system documentation before new features, and the team agreed that untagged components were slowing every new screen. Priya will write the quarter narrative for the board, framed around what we deliberately did not build and why. The team also agreed to hold a mid-quarter checkpoint rather than a full replan.",
    decisions: [
      "Q4 is scoped as a consolidation quarter focused on reliability and the enterprise bulk export.",
      "Design system documentation is completed before any new feature surface is started.",
      "A mid-quarter checkpoint replaces a full replan at the end of November.",
    ],
    actionItems: [
      {
        id: "a-401",
        text: "Finish and publish the design system component documentation",
        ownerId: sneha.id,
        due: "2026-10-02",
        done: true,
      },
      {
        id: "a-402",
        text: "Write the quarter narrative for the board, including what we chose not to build",
        ownerId: priya.id,
        due: "2026-10-03",
        done: false,
      },
      {
        id: "a-403",
        text: "Set a date for the mid-quarter reliability checkpoint in November",
        ownerId: vikram.id,
        due: "2026-10-06",
        done: false,
      },
      {
        id: "a-404",
        text: "Pull the open support tickets from the last month into the roadmap doc",
        ownerId: priya.id,
        due: "2026-10-07",
        done: false,
      },
    ],
    transcript: [],
  },
  {
    id: "m-005",
    title: "Vendor Onboarding — ClearStack Analytics",
    date: "2026-09-26T10:00:00+05:30",
    durationMin: 22,
    participants: [rahul, meera],
    summary:
      "ClearStack passed the security review with two conditions, both on their side, and neither is expected to hold up the integration. The data residency requirement means the production workspace must be created in their Mumbai region, which is a provisioning step on their side. Rahul asked for sandbox access by next week so the team can validate event schemas before committing to the production workspace. We agreed to start with two dashboards only rather than the full catalogue, to keep the first month small.",
    decisions: [
      "Production workspace will be provisioned in ClearStack's Mumbai region to satisfy data residency.",
      "Integration starts with two dashboards rather than the full catalogue.",
      "Sandbox access is a prerequisite before any production workspace is committed.",
    ],
    actionItems: [
      {
        id: "a-501",
        text: "Request sandbox access from ClearStack and confirm the Mumbai region provisioning steps",
        ownerId: rahul.id,
        due: "2026-09-30",
        done: true,
      },
      {
        id: "a-502",
        text: "Validate the event schemas against the two agreed dashboards once sandbox is live",
        ownerId: rahul.id,
        due: "2026-10-05",
        done: false,
      },
      {
        id: "a-503",
        text: "Draft the internal one-pager on what analytics data is and is not stored with the vendor",
        ownerId: meera.id,
        due: "2026-10-08",
        done: false,
      },
      {
        id: "a-504",
        text: "Confirm the contract renewal date and the notice period with ClearStack",
        ownerId: meera.id,
        due: "2026-10-09",
        done: false,
      },
    ],
    transcript: [],
  },
  {
    id: "m-006",
    title: "Hiring Review — Backend Engineer (L4)",
    date: "2026-09-29T14:00:00+05:30",
    durationMin: 33,
    participants: [ankit, priya, sneha],
    summary:
      "The panel reviewed two strong candidates and one that did not clear the bar, and we are making an offer for the L4 backend role. The strongest candidate handled a system design discussion well but had no experience owning a service end to end, which we weighed carefully. Ankit will run the technical follow-up on distributed systems before the offer is formally released. Priya asked that we not compress the timeline simply to fill the role, and the panel agreed the start date moves to mid-November. Sneha will design the onboarding plan so the first month is not entirely spent on infrastructure work.",
    decisions: [
      "An offer is extended for the L4 backend engineer, pending the distributed systems follow-up.",
      "The target start date moves to mid-November rather than compressing the notice period.",
      "Onboarding will include a scoped first-month project rather than infrastructure-only work.",
    ],
    actionItems: [
      {
        id: "a-601",
        text: "Run the distributed systems follow-up and report back before the offer is released",
        ownerId: ankit.id,
        due: "2026-10-02",
        done: true,
      },
      {
        id: "a-602",
        text: "Draft the scoped first-month project plan for the incoming hire",
        ownerId: sneha.id,
        due: "2026-10-09",
        done: false,
      },
      {
        id: "a-603",
        text: "Confirm the revised mid-November start date with the candidate and recruiter",
        ownerId: priya.id,
        due: "2026-10-06",
        done: false,
      },
      {
        id: "a-604",
        text: "Write up the interview feedback against the role scorecard while it is fresh",
        ownerId: ankit.id,
        due: "2026-10-05",
        done: false,
      },
    ],
    transcript: HIRING_TRANSCRIPT,
  },
];

export const LIVE_SCRIPT: TranscriptLine[] = [
  { id: "l-01", speakerId: priya.id, text: "Can everyone hear me? Good. Let us start, I will share my screen once we are all in.", timestamp: "00:04" },
  { id: "l-02", speakerId: rahul.id, text: "Loud and clear. I am joining from the Bengaluru office so the audio may be slightly delayed.", timestamp: "00:12" },
  { id: "l-03", speakerId: priya.id, text: "That is fine. So the agenda today is the pilot go-live date and the two open integration risks.", timestamp: "00:21" },
  { id: "l-04", speakerId: ankit.id, text: "Before we get there, I want to flag that the sandbox environment is behaving differently from production. Response times are roughly double.", timestamp: "00:33" },
  { id: "l-05", speakerId: rahul.id, text: "Is that a data volume thing or an actual configuration difference?", timestamp: "00:41" },
  { id: "l-06", speakerId: ankit.id, text: "Configuration. The sandbox is still running the old caching layer, so every request is hitting the database directly.", timestamp: "00:49" },
  { id: "l-07", speakerId: priya.id, text: "Then please do not read too much into the numbers. If anything, the sandbox is a useful worst case.", timestamp: "01:00" },
  { id: "l-08", speakerId: sneha.id, text: "That is actually reassuring. The offline behaviour we tested last week was on the sandbox, so real devices should be better.", timestamp: "01:11" },
  { id: "l-09", speakerId: priya.id, text: "Right. Let us take the go-live date first. We had pencilled in the first week of November. Does anyone have a reason to move it?", timestamp: "01:23" },
  { id: "l-10", speakerId: meera.id, text: "Nothing from our side. Their operations team confirmed their depot staff would be trained by the end of October.", timestamp: "01:34" },
  { id: "l-11", speakerId: vikram.id, text: "One dependency. If the webhook credentials do not arrive by Wednesday, the integration testing window compresses to under two days.", timestamp: "01:45" },
  { id: "l-12", speakerId: ankit.id, text: "Two days is not enough. I would want at least four so we are not testing on a Sunday evening.", timestamp: "01:53" },
  { id: "l-13", speakerId: priya.id, text: "Agreed. Then Wednesday is a hard cutoff for the credentials, and if they slip we move the date rather than compress the testing.", timestamp: "02:04" },
  { id: "l-14", speakerId: rahul.id, text: "I will chase it today. I have a direct line to their engineering manager now, which is better than going through the account manager.", timestamp: "02:15" },
  { id: "l-15", speakerId: sneha.id, text: "Second risk is the offline banner. We are confident in the state machine but we have only tested it on two Android devices.", timestamp: "02:27" },
  { id: "l-16", speakerId: vikram.id, text: "Which two? If we are claiming driver support then the older devices matter more than anything else.", timestamp: "02:37" },
  { id: "l-17", speakerId: sneha.id, text: "A Redmi from 2021 and a Samsung from 2022. I can borrow two more from the QA lab for Thursday.", timestamp: "02:48" },
  { id: "l-18", speakerId: priya.id, text: "Please do that, and note the results even if everything passes. I want the record to show we tested it properly.", timestamp: "02:59" },
  { id: "l-19", speakerId: ankit.id, text: "On the retention side, are we storing raw location history or only the trip summary? This came up in the security review.", timestamp: "03:11" },
  { id: "l-20", speakerId: meera.id, text: "Trip summary only. I confirmed that with their compliance team last Thursday and they were satisfied.", timestamp: "03:21" },
  { id: "l-21", speakerId: ankit.id, text: "Perfect, that matches what is in the code. I will write it into the integration guide so nobody has to ask again.", timestamp: "03:31" },
  { id: "l-22", speakerId: priya.id, text: "Let us close with the escalation path. Who does the driver call if the app is down on a highway with no connectivity?", timestamp: "03:43" },
  { id: "l-23", speakerId: rahul.id, text: "There is a number on the dispatch screen and it routes to their depot supervisor, not to us. I think that is the right call for v1.", timestamp: "03:55" },
  { id: "l-24", speakerId: priya.id, text: "Agreed, we keep it out of our hands for now. I will write up the decisions and circulate them before end of day.", timestamp: "04:07" },
];

export function getDummyMeetings(): Meeting[] {
  return MEETINGS;
}

export function getDummyMeeting(id: string): Meeting | undefined {
  return MEETINGS.find((m) => m.id === id);
}

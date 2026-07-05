import { PartData } from './types';

export const EXAM_DATA: PartData[] = [
  {
    number: 1,
    title: "Part 1 · Q1–13",
    passageTitle: "The Birth of a Global Tournament: A History of the FIFA World Cup",
    kicker: "Reading Passage 1",
    paragraphs: [
      {
        id: "A",
        text: "The FIFA World Cup, now football's most celebrated event, began far more modestly than its current global spectacle would suggest. The inaugural tournament took place in Uruguay in 1930, an unlikely choice motivated partly by the host nation's recent Olympic football triumphs and its willingness to fund travel and accommodation for visiting teams. Only thirteen national squads ultimately competed, a disappointingly small turnout driven by the reluctance of several European federations to undertake the lengthy three-week sea voyage across the Atlantic. Despite the modest scale, the event proved a resounding success on home soil: Uruguay defeated Argentina in the final to become the first nation to lift the trophy, cementing football's status as a genuine international, rather than merely regional, pursuit."
      },
      {
        id: "B",
        text: "The original trophy, sculpted in gold-plated sterling silver and lapis lazuli, was initially named \"Victory\" but was renamed in 1946 in honour of Jules Rimet, the FIFA president credited with founding the tournament. The competition's early momentum was abruptly halted by global conflict: the 1942 and 1946 editions were both cancelled owing to the Second World War. During this period, the trophy itself narrowly escaped destruction. Italy, having won the tournament in 1938, retained custody of it throughout the war, and an Italian federation official reportedly kept it hidden in a shoebox beneath his bed to prevent its seizure by occupying forces, only revealing its location once hostilities had ended."
      },
      {
        id: "C",
        text: "When international competition resumed in 1950, Brazil hosted a considerably expanded tournament and constructed the Maracanã Stadium specifically for the occasion, anticipating a home victory. Instead, an underdog Uruguayan side stunned a capacity crowd of roughly two hundred thousand spectators, winning the deciding match and inflicting what remains one of football's most referenced upsets. The following decade brought technological transformation, as portions of the 1954 tournament were broadcast on television for the first time, gradually extending the competition's reach beyond stadium attendees. By 1958, a seventeen-year-old Brazilian forward named Pelé had announced himself on the world stage, foreshadowing a period of Brazilian dominance that would come to define the sport's mid-century history."
      },
      {
        id: "D",
        text: "The Jules Rimet Trophy endured further misadventures. Ahead of the 1966 tournament in England, it was stolen while on public display, only to be discovered a week later, wrapped in newspaper, by a dog named Pickles during a walk in South London. Brazil's victory in 1970, its third title, entitled the nation to retain the trophy permanently under the competition's original rules — an arrangement that, in retrospect, proved unfortunate. In 1983, the trophy was stolen again from the Brazilian football federation's headquarters and was never recovered; investigators believe it was melted down for its precious metal content. A replacement, the current FIFA World Cup Trophy, had already been commissioned in 1974 from an Italian sculptor, with the stipulation that winning nations would henceforth receive only a gold-plated replica to keep, while the original trophy is returned after each tournament."
      },
      {
        id: "E",
        text: "Participation numbers have grown in distinct phases rather than through steady incremental change. Following the initial thirteen-team format, the tournament largely settled at sixteen participating nations for much of the twentieth century. This figure rose to twenty-four in 1982, reflecting mounting pressure from federations in Africa, Asia, and North America for greater representation on football's largest stage. A further expansion to thirty-two teams followed in 1998, a format that endured for six consecutive tournaments and came to be regarded, by many long-time observers, as football's definitive competitive structure."
      },
      {
        id: "F",
        text: "Alongside these structural changes, the tournament's commercial and cultural footprint has expanded just as dramatically, evolving from a modest gathering funded by a hopeful host nation into a multi-billion-dollar broadcasting and sponsorship phenomenon watched by billions across the globe. This trajectory of near-constant reinvention, more than any single match or trophy, may be the tournament's most consistent tradition. It is a pattern that continued into the 2026 edition, which introduced the most far-reaching structural overhaul in the competition's ninety-six-year history."
      }
    ],
    questions: [
      {
        id: 1,
        part: 1,
        type: "TFNG",
        stem: "Uruguay was chosen as the first host partly because it offered to cover visiting teams' travel and lodging costs.",
        correctAnswer: "TRUE",
        explanation: "Paragraph A explicitly notes Uruguay offered its \"willingness to fund travel and accommodation for visiting teams.\"",
        paragraphRef: "A"
      },
      {
        id: 2,
        part: 1,
        type: "TFNG",
        stem: "All of the European national federations refused to send teams to the first tournament.",
        correctAnswer: "FALSE",
        explanation: "Paragraph A states there was a \"reluctance of several European federations to undertake the lengthy three-week sea voyage\", meaning several (not all) refused.",
        paragraphRef: "A"
      },
      {
        id: 3,
        part: 1,
        type: "TFNG",
        stem: "The trophy was intended to be named after Jules Rimet from the very beginning.",
        correctAnswer: "FALSE",
        explanation: "Paragraph B explains that the original trophy \"was initially named 'Victory' but was renamed in 1946 in honour of Jules Rimet.\"",
        paragraphRef: "B"
      },
      {
        id: 4,
        part: 1,
        type: "TFNG",
        stem: "The identity of the official who hid the trophy during the Second World War is confirmed elsewhere in the passage.",
        correctAnswer: "NOT GIVEN",
        explanation: "The text mentions only \"an Italian federation official\" but does not reveal his specific identity, name, or role anywhere else.",
        paragraphRef: "B"
      },
      {
        id: 5,
        part: 1,
        type: "TFNG",
        stem: "Brazil expected to win the 1950 final on home soil.",
        correctAnswer: "TRUE",
        explanation: "Paragraph C states Brazil constructed the Maracanã Stadium specifically \"anticipating a home victory.\"",
        paragraphRef: "C"
      },
      {
        id: 6,
        part: 1,
        type: "TFNG",
        stem: "Television broadcasts of the World Cup began in 1958.",
        correctAnswer: "FALSE",
        explanation: "Paragraph C notes that portions of the 1954 tournament (not 1958) \"were broadcast on television for the first time.\"",
        paragraphRef: "C"
      },
      {
        id: 7,
        part: 1,
        type: "SUMMARY",
        stem: "Brazil's 1970 victory meant the team could keep the original trophy...",
        correctAnswer: "permanently",
        explanation: "Paragraph D states that Brazil's victory \"entitled the nation to retain the trophy permanently.\"",
        paragraphRef: "D"
      },
      {
        id: 8,
        part: 1,
        type: "SUMMARY",
        stem: "with investigators suspecting it had been...",
        correctAnswer: "melted down",
        explanation: "Paragraph D specifies that \"investigators believe it was melted down for its precious metal content.\"",
        paragraphRef: "D"
      },
      {
        id: 9,
        part: 1,
        type: "SUMMARY",
        stem: "A new prize, commissioned in...",
        correctAnswer: "1974",
        explanation: "Paragraph D notes \"A replacement, the current FIFA World Cup Trophy, had already been commissioned in 1974.\"",
        paragraphRef: "D"
      },
      {
        id: 10,
        part: 1,
        type: "SUMMARY",
        stem: "replaced it, though under revised rules, winning nations now only keep a...",
        correctAnswer: "gold-plated replica",
        explanation: "Paragraph D mentions that winning nations \"would henceforth receive only a gold-plated replica to keep.\"",
        paragraphRef: "D"
      },
      {
        id: 11,
        part: 1,
        type: "MC",
        stem: "According to the passage, the tournament held in 1950 is most notable for",
        options: [
          "A. the first live radio broadcast to a global audience.",
          "B. an unexpected result that upset the host nation.",
          "C. the introduction of a 32-team format.",
          "D. Pelé's debut on the international stage."
        ],
        correctAnswer: "B",
        explanation: "Paragraph C describes the 1950 tournament in Brazil, where an underdog Uruguayan side stunned the crowd, \"winning the deciding match and inflicting what remains one of football's most referenced upsets.\"",
        paragraphRef: "C"
      },
      {
        id: 12,
        part: 1,
        type: "MC",
        stem: "The increase to 24 participating teams in 1982 is presented in the passage as a response to",
        options: [
          "A. complaints about ticket pricing.",
          "B. demands for wider international representation.",
          "C. a decline in television viewership.",
          "D. concerns about player safety."
        ],
        correctAnswer: "B",
        explanation: "Paragraph E states that the rise to 24 teams reflected \"mounting pressure from federations in Africa, Asia, and North America for greater representation on football's largest stage.\"",
        paragraphRef: "E"
      },
      {
        id: 13,
        part: 1,
        type: "MC",
        stem: "The final paragraph suggests that the World Cup's most defining characteristic has been",
        options: [
          "A. its consistent format across decades.",
          "B. its focus on South American teams.",
          "C. its ongoing pattern of change and reinvention.",
          "D. its reliance on a single host nation model."
        ],
        correctAnswer: "C",
        explanation: "Paragraph F highlights \"This trajectory of near-constant reinvention, more than any single match or trophy, may be the tournament's most consistent tradition.\"",
        paragraphRef: "F"
      }
    ]
  },
  {
    number: 2,
    title: "Part 2 · Q14–26",
    passageTitle: "A New Era for the Global Game",
    kicker: "Reading Passage 2",
    paragraphs: [
      {
        id: "A",
        text: "The FIFA World Cup has long been considered the pinnacle of international sporting events, serving not only as an athletic showcase but also as a barometer for global socio-economic shifts. Since its inception in Uruguay in 1930, the tournament has periodically altered its format to accommodate changing political landscapes and commercial realities. However, historical evidence suggests that previous structural expansions were modest adjustments when contrasted with the 2026 iteration. Co-hosted by Canada, Mexico, and the United States, this specific tournament represents a fundamental shift away from localized hosting models toward an expansive, continental paradigm. By rewriting long-established frameworks of scale and tournament architecture, the event's governing bodies are attempting a complex experiment in large-scale logistics. (Example: ii)"
      },
      {
        id: "B",
        text: "The clearest sign of this transformation is the unprecedented increase in the number of participating teams. For nearly three decades, the tournament adhered strictly to a stable 32-team matrix, which balanced elite athletic competition with broad geographic representation. In the 2026 format, this baseline has expanded to 48 national teams — a fifty percent surge in the volume of competitors. Academic analysts of sports sociology remain sharply divided on the merits of this development. Skeptics argue that such a sudden expansion inevitably dilutes the competitive standard, leading to lopsided matches during the preliminary stages. Conversely, proponents emphasize its capacity for geopolitical inclusivity. Emerging footballing nations, historically marginalized by restrictive continental qualification quotas, are granted access to international exposure, which subsequently stimulates grassroots funding and corporate sponsorship within those developing domestic markets."
      },
      {
        id: "C",
        text: "To absorb this influx of teams without compromising the financial viability of the tournament, the competitive blueprint required a radical overhaul. The solution was the implementation of a 12-group phase, with each group comprising four distinct teams. This administrative shift yields a staggering 72 group-stage fixtures. Furthermore, the format marks the resurrection of a mechanism abandoned at the conclusion of the twentieth century: the qualification of the eight most successful third-placed finishers. The integration of these teams into the elimination bracket has necessitated a brand-new \"Round of 32\" phase. Consequently, the comprehensive itinerary has swelled to 104 matches, a dramatic increase from the 64 fixtures characteristic of the preceding tournament in Qatar. For the participating athletes, this structural extension demands unprecedented physical endurance, as the two eventual finalists must navigate an exhausting eight-match journey rather than the traditional seven."
      },
      {
        id: "D",
        text: "Distributing an operation of this magnitude required a geographical reach that few single nations could realistically sustain without substantial financial risk. The resulting tripartite hosting strategy is spread across 16 host cities in three countries, covering a vast and varied territory. The sheer spatial distance — extending from the high altitude of Central Mexico to the maritime climates of Western Canada and the American Atlantic coast — introduces considerable practical difficulties. Unlike historical hosts that incurred massive public debt to erect specialized, purpose-built infrastructure, the 2026 organizational committee relied almost exclusively on existing, multi-purpose arenas primarily designed for American gridiron football. While this strategic choice effectively circumvents the chronic issue of \"white elephant\" venues — expensive stadiums left economically unviable and derelict post-event — it introduces a logistical trade-off. Organizers face the immense task of harmonizing divergent transnational transport systems, security protocols, and customs frameworks for a transient population of millions of international spectators."
      },
      {
        id: "E",
        text: "Beyond sheer scale, the 2026 event acts as a live laboratory for structural innovations aimed at changing the pace of play. Modern football has increasingly been plagued by systematic gamesmanship, particularly the deliberate deceleration of play by teams attempting to protect a favorable score. To mitigate this trend, match officials have been empowered to enforce rigid countdown parameters during dead-ball situations, imposing strict time caps on restarts like throw-ins and goal kicks. Simultaneously, the technological oversight assigned to the Video Assistant Referee (VAR) system has been expanded. The system is now integrated into a broader spectrum of field decisions, including the adjudication of complex out-of-bounds disputes and the review of contentious disciplinary actions, such as second yellow cards."
      },
      {
        id: "F",
        text: "Ultimately, these changes illustrate a broader philosophical shift. The integration of widespread ancillary entertainment, such as synchronized multi-city concert series featuring global pop icons, intentionally mirrors corporate entertainment formulas exemplified by the National Football League's championship events. This deliberate cross-pollination indicates that international football is actively discarding its legacy as an insulated athletic competition. Instead, it is embracing a new identity as a global entertainment platform, setting a precedent that will likely dictate the organization of all future international sporting mega-events."
      }
    ],
    questions: [
      {
        id: 14,
        part: 2,
        type: "HEADING",
        stem: "Paragraph B",
        correctAnswer: "i",
        explanation: "Paragraph B focuses on the 48-team expansion, presenting both the negative view of skeptics and the positive view of proponents. This represents 'i. Divergent Perspectives on Expanded Participation'.",
        paragraphRef: "B"
      },
      {
        id: 15,
        part: 2,
        type: "HEADING",
        stem: "Paragraph C",
        correctAnswer: "iv",
        explanation: "Paragraph C details how the game layout was restructured (12 groups, 104 matches, Round of 32) and how this demands extra physical stamina ('eight-match journey'). This is 'iv. Restructuring the Competitive Layout and Player Demands'.",
        paragraphRef: "C"
      },
      {
        id: 16,
        part: 2,
        type: "HEADING",
        stem: "Paragraph D",
        correctAnswer: "v",
        explanation: "Paragraph D describes using existing NFL stadiums to bypass 'white elephants' (architectural reutilization) but highlights the enormous transnational transport and customs challenge (obstacles). This is 'v. Architectural Reutilization and Its Accompanying Obstacles'.",
        paragraphRef: "D"
      },
      {
        id: 17,
        part: 2,
        type: "HEADING",
        stem: "Paragraph E",
        correctAnswer: "vii",
        explanation: "Paragraph E describes time countdown rules on dead-balls and expanding the VAR system to combat gamesmanship. This is 'vii. Regulating Match Tempo through Practical and Electronic Upgrades'.",
        paragraphRef: "E"
      },
      {
        id: 18,
        part: 2,
        type: "HEADING",
        stem: "Paragraph F",
        correctAnswer: "iii",
        explanation: "Paragraph F outlines how the tournament integrates pop concerts and NFL-style branding, showing football's shift to a mixed entertainment event. This is 'iii. The Evolutionary Shift Toward Hybrid Entertainment'.",
        paragraphRef: "F"
      },
      {
        id: 19,
        part: 2,
        type: "TFNG",
        stem: "Sociologists generally agree that allowing more teams into the tournament will lower the athletic standard of the games.",
        correctAnswer: "FALSE",
        explanation: "Paragraph B states that academic analysts \"remain sharply divided on the merits of this development,\" not in general agreement.",
        paragraphRef: "B"
      },
      {
        id: 20,
        part: 2,
        type: "TFNG",
        stem: "The system of allowing certain third-placed teams to advance to the next stage is an entirely novel invention for the 2026 tournament.",
        correctAnswer: "FALSE",
        explanation: "Paragraph C refers to this as \"the resurrection of a mechanism abandoned at the conclusion of the twentieth century,\" indicating it was used before, not a completely novel invention.",
        paragraphRef: "C"
      },
      {
        id: 21,
        part: 2,
        type: "TFNG",
        stem: "The decision to use existing gridiron stadiums helped organizers avoid creating financially burdensome, disused venues.",
        correctAnswer: "TRUE",
        explanation: "Paragraph D states that relying on existing NFL arenas \"effectively circumvents the chronic issue of 'white elephant' venues — expensive stadiums left economically unviable.\"",
        paragraphRef: "D"
      },
      {
        id: 22,
        part: 2,
        type: "TFNG",
        stem: "Spectators traveling between host nations are exempt from standard customs regulations during the tournament window.",
        correctAnswer: "NOT GIVEN",
        explanation: "Paragraph D mentions the need for \"harmonizing divergent transnational transport systems... and customs frameworks,\" but never says spectators are exempt from these regulations.",
        paragraphRef: "D"
      },
      {
        id: 23,
        part: 2,
        type: "SUMMARY",
        stem: "Modern football matches are frequently disrupted by tactics involving...",
        correctAnswer: "gamesmanship",
        explanation: "Paragraph E notes that modern football \"has increasingly been plagued by systematic gamesmanship.\"",
        paragraphRef: "E"
      },
      {
        id: 24,
        part: 2,
        type: "SUMMARY",
        stem: "the technical responsibilities of the...",
        correctAnswer: "VAR",
        explanation: "Paragraph E explains that the technological oversight assigned to the \"Video Assistant Referee (VAR)\" has been expanded. (Only \"VAR\" fits within the standard choose-word range).",
        paragraphRef: "E"
      },
      {
        id: 25,
        part: 2,
        type: "SUMMARY",
        stem: "incorporating comprehensive...",
        correctAnswer: "ancillary entertainment",
        explanation: "Paragraph F discusses \"the integration of widespread ancillary entertainment, such as synchronized multi-city concert series.\"",
        paragraphRef: "F"
      },
      {
        id: 26,
        part: 2,
        type: "SUMMARY",
        stem: "transforming the tournament... into a highly coordinated...",
        correctAnswer: "entertainment platform",
        explanation: "Paragraph F mentions that the tournament is \"embracing a new identity as a global entertainment platform.\"",
        paragraphRef: "F"
      }
    ]
  },
  {
    number: 3,
    title: "Part 3 · Q27–40",
    passageTitle: "The World Cup Bid: Prestige, Promises, and the Price of Hosting",
    kicker: "Reading Passage 3",
    paragraphs: [
      {
        id: "A",
        text: "Few events elicit as fierce a competition to host as football's World Cup, with candidate nations investing years of diplomatic effort and vast public resources merely for the right to stage the tournament. Bidding committees routinely promise a familiar constellation of benefits: surges in tourism revenue, world-class infrastructure, thousands of new jobs, and a lasting elevation of the host nation's international standing. Yet an increasingly vocal contingent of economists and urban planners has begun to interrogate these claims with considerable skepticism, arguing that the gap between projected and realized benefits is frequently vast. This divergence between promotional rhetoric and empirical outcome has transformed the World Cup bid from a straightforward matter of national pride into a genuinely contested question of public policy."
      },
      {
        id: "B",
        text: "Central to this skepticism is a substantial body of post-tournament economic assessment, which has repeatedly failed to detect the dramatic GDP growth that host governments so often forecast in their bidding documents. Independent analyses conducted after successive tournaments have found that any measurable economic uplift tends to be modest, temporary, and concentrated in sectors such as hospitality, rather than distributed broadly across the host economy. Compounding this disappointment is the phenomenon of displacement: tourists who might otherwise have visited a host country during the tournament period are frequently offset by regular travellers who avoid the destination altogether, deterred by inflated prices, congested transport networks, and heightened security measures. Some researchers go further still, contending that construction spending on tournament-specific infrastructure represents an opportunity cost, diverting public funds away from projects, such as schools or hospitals, that might have delivered more durable social returns."
      },
      {
        id: "C",
        text: "Nowhere is this tension more visible than in the fate of purpose-built stadiums once the tournament concludes. Several host nations, eager to showcase architectural ambition, have commissioned vast venues far exceeding what their domestic football leagues could ever hope to fill on a weekly basis. The result, in a number of well-documented cases, has been a scattering of underused or entirely abandoned \"white elephant\" stadiums, whose ongoing maintenance costs continue to burden public budgets long after the closing ceremony. Not every host has fallen into this trap, however. Nations with existing top-tier sporting infrastructure, or those that have deliberately designed stadiums for post-tournament conversion into smaller community venues, have generally avoided the most severe forms of this legacy problem, suggesting that outcomes depend heavily on planning decisions made years in advance rather than on hosting itself being inherently wasteful."
      },
      {
        id: "D",
        text: "Given this consistently ambiguous economic record, the persistent enthusiasm of nations to host the tournament might appear puzzling, were the underlying motivation purely financial. Political scientists studying the phenomenon suggest that the calculus is rarely about direct economic return at all. Hosting rights are increasingly understood as an instrument of soft power: an opportunity for a nation to project a curated image of modernity, hospitality, and organisational competence to a global television audience numbering in the billions. For some governments, particularly those seeking to reposition their international reputation or attract long-term foreign investment unrelated to football itself, this reputational dividend is judged to justify expenditure that would be difficult to defend on narrow cost-benefit grounds alone."
      },
      {
        id: "E",
        text: "Beyond questions of fiscal prudence, the preparation for recent tournaments has drawn sustained scrutiny over the treatment of construction labour, particularly in nations reliant on large migrant workforces to complete stadiums and transport links within tight deadlines. Investigations by international labour organisations have documented cases of unsafe working conditions, restrictive employment practices, and, in some instances, preventable deaths during construction phases. These findings have prompted several hosting nations to introduce reforms to labour law and monitoring systems, changes which critics argue arrived only in response to external pressure and reputational risk, rather than through voluntary policy leadership."
      },
      {
        id: "F",
        text: "Taken together, these strands of evidence resist any tidy verdict on whether hosting the World Cup constitutes a wise national investment. The tournament clearly delivers genuine, if difficult to quantify, reputational and cultural value, alongside occasional infrastructure that a nation might otherwise never have built. Equally clearly, the price of that value is often measured only partially in monetary terms, encompassing environmental, social, and labour costs that rarely feature in a bidding nation's original prospectus. What does appear consistent across decades of hosting decisions is that the calculation being made is rarely, in the end, a strictly economic one."
      }
    ],
    questions: [
      {
        id: 27,
        part: 3,
        type: "TFNG", // Used TFNG for Yes/No/Not Given in standard structure
        stem: "Independent economic assessments have generally confirmed the dramatic growth predicted in bidding documents.",
        correctAnswer: "NO",
        explanation: "Paragraph B states that post-tournament economic assessments have \"repeatedly failed to detect the dramatic GDP growth that host governments so often forecast.\"",
        paragraphRef: "B"
      },
      {
        id: 28,
        part: 3,
        type: "TFNG",
        stem: "The abandonment of stadiums after the tournament is an inevitable consequence of hosting the World Cup.",
        correctAnswer: "NO",
        explanation: "Paragraph C explicitly notes: \"Not every host has fallen into this trap, however,\" indicating it is not an inevitable consequence.",
        paragraphRef: "C"
      },
      {
        id: 29,
        part: 3,
        type: "TFNG",
        stem: "Nations with pre-existing top-level sports infrastructure tend to avoid the worst stadium legacy problems.",
        correctAnswer: "YES",
        explanation: "Paragraph C states that nations with existing top-tier sporting infrastructure \"have generally avoided the most severe forms of this legacy problem.\"",
        paragraphRef: "C"
      },
      {
        id: 30,
        part: 3,
        type: "TFNG",
        stem: "The specific number of workers who died during World Cup construction projects is stated in the passage.",
        correctAnswer: "NOT GIVEN",
        explanation: "Paragraph E refers to \"preventable deaths during construction phases\" but does not state any specific numbers.",
        paragraphRef: "E"
      },
      {
        id: 31,
        part: 3,
        type: "MATCHING_ENDINGS",
        stem: "Economic uplift following a World Cup tends to be",
        correctAnswer: "B",
        explanation: "Paragraph B explains that any economic uplift is \"modest, temporary, and concentrated in sectors such as hospitality\" (Option B: concentrated in a narrow set of industries rather than spread widely).",
        paragraphRef: "B"
      },
      {
        id: 32,
        part: 3,
        type: "MATCHING_ENDINGS",
        stem: "Diverting public funds toward tournament infrastructure may mean",
        correctAnswer: "E",
        explanation: "Paragraph B states that construction spending represents an opportunity cost, \"diverting public funds away from projects, such as schools or hospitals\" (Option E: other public projects receiving less funding).",
        paragraphRef: "B"
      },
      {
        id: 33,
        part: 3,
        type: "MATCHING_ENDINGS",
        stem: "Hosting rights are increasingly viewed by political scientists as",
        correctAnswer: "D",
        explanation: "Paragraph D explains that hosting is increasingly understood \"as an instrument of soft power: an opportunity... to project a curated image...\" (Option D: a tool for shaping a country's global image).",
        paragraphRef: "D"
      },
      {
        id: 34,
        part: 3,
        type: "MATCHING_ENDINGS",
        stem: "Reforms to labour law in some hosting nations appear to have been driven by",
        correctAnswer: "C",
        explanation: "Paragraph E notes that critics argue changes in labour regulations \"arrived only in response to external pressure and reputational risk\" (Option C: external scrutiny and reputational concerns).",
        paragraphRef: "E"
      },
      {
        id: 35,
        part: 3,
        type: "MATCHING_ENDINGS",
        stem: "The overall record on World Cup hosting suggests that there is",
        correctAnswer: "G",
        explanation: "Paragraph F concludes that these strands \"resist any tidy verdict on whether hosting... constitutes a wise national investment\" (Option G: no single, straightforward conclusion).",
        paragraphRef: "F"
      },
      {
        id: 36,
        part: 3,
        type: "MC",
        stem: "According to Paragraph B, the economic benefits of hosting a World Cup are best described as",
        options: [
          "A. widespread and long-lasting.",
          "B. modest and concentrated in specific sectors.",
          "C. entirely absent in every host nation.",
          "D. exclusively found in the transport sector."
        ],
        correctAnswer: "B",
        explanation: "Paragraph B says: \"any measurable economic uplift tends to be modest, temporary, and concentrated in sectors such as hospitality.\"",
        paragraphRef: "B"
      },
      {
        id: 37,
        part: 3,
        type: "MC",
        stem: "The passage suggests that \"white elephant\" stadiums result primarily from",
        options: [
          "A. a lack of interest from local football fans.",
          "B. planning decisions made well before the tournament.",
          "C. insufficient funding during construction.",
          "D. poor weather conditions affecting stadium design."
        ],
        correctAnswer: "B",
        explanation: "Paragraph C explains that stadium outcome \"depends heavily on planning decisions made years in advance rather than on hosting itself being inherently wasteful.\"",
        paragraphRef: "C"
      },
      {
        id: 38,
        part: 3,
        type: "MC",
        stem: "Which statement best reflects the writer's overall stance in the final paragraph?",
        options: [
          "A. Hosting the World Cup is rarely worthwhile for any nation.",
          "B. The value of hosting cannot be judged by economic measures alone.",
          "C. All host nations experience the same range of benefits and costs.",
          "D. Labour and environmental costs outweigh any potential benefits."
        ],
        correctAnswer: "B",
        explanation: "Paragraph F mentions that the tournament delivers genuine reputational and cultural value, and concluding that \"the calculation being made is rarely, in the end, a strictly economic one.\"",
        paragraphRef: "F"
      },
      {
        id: 39,
        part: 3,
        type: "COMBO_MC",
        stem: "Which TWO of the following are identified in the passage as consequences of hosting a World Cup? Choose TWO letters, A–E. (First Selection)",
        options: [
          "A. a guaranteed rise in national GDP",
          "B. reputational and cultural value for the host nation",
          "C. universal praise from international labour organisations",
          "D. environmental, social, and labour-related costs",
          "E. the elimination of existing football stadiums"
        ],
        correctAnswer: "B",
        explanation: "Paragraph F explicitly identifies that hosting \"delivers genuine, if difficult to quantify, reputational and cultural value\" (B).",
        paragraphRef: "F"
      },
      {
        id: 40,
        part: 3,
        type: "COMBO_MC",
        stem: "Which TWO of the following are identified in the passage as consequences of hosting a World Cup? Choose TWO letters, A–E. (Second Selection)",
        options: [
          "A. a guaranteed rise in national GDP",
          "B. reputational and cultural value for the host nation",
          "C. universal praise from international labour organisations",
          "D. environmental, social, and labour-related costs",
          "E. the elimination of existing football stadiums"
        ],
        correctAnswer: "D",
        explanation: "Paragraph F explicitly identifies that hosting \"encompassing environmental, social, and labour costs\" (D).",
        paragraphRef: "F"
      }
    ]
  }
];

export const HEADING_OPTIONS = [
  { value: "i", text: "i. Divergent Perspectives on Expanded Participation" },
  { value: "ii", text: "ii. A Fundamental Departure from Historical Hosting Models" },
  { value: "iii", text: "iii. The Evolutionary Shift Toward Hybrid Entertainment" },
  { value: "iv", text: "iv. Restructuring the Competitive Layout and Player Demands" },
  { value: "v", text: "v. Architectural Reutilization and Its Accompanying Obstacles" },
  { value: "vi", text: "vi. A Retrospective Look at Early Football Architecture" },
  { value: "vii", text: "vii. Regulating Match Tempo through Practical and Electronic Upgrades" },
  { value: "viii", text: "viii. The Historical Limits of Single-Nation Bids" }
];

export const SENTENCE_ENDINGS = [
  { value: "A", text: "A. a decision made almost exclusively on cultural grounds." },
  { value: "B", text: "B. concentrated in a narrow set of industries rather than spread widely." },
  { value: "C", text: "C. external scrutiny and reputational concerns rather than internal policy initiative." },
  { value: "D", text: "D. a tool for shaping a country's global image and reputation." },
  { value: "E", text: "E. other public projects, such as healthcare or education, receiving less funding." },
  { value: "F", text: "F. a rare example of unanimous international agreement." },
  { value: "G", text: "G. no single, straightforward conclusion about its economic wisdom." },
  { value: "H", text: "H. permanently resolved once construction reforms are introduced." }
];

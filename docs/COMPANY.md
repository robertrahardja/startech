# Company Overview

What StarTech Innovation is, what it sells, and how this website fits into
the wider set of repositories. Written 2026-09-28 from a survey of the
working repositories.

This repository is **public**. Client names, contacts and contract values
are deliberately left out, as they are in the pitch deck ("client names
withheld under confidentiality"). Keep it that way when editing.

## The company

| | |
| --- | --- |
| Legal name | StarTech Innovation Pte Ltd |
| UEN | 202110461R |
| Managing Director | Robert Rahardja |
| Web | [startech-innovation.com](https://startech-innovation.com) |
| Tagline | Business. Finance. Tech. |

A small Singapore **custom software house**. Every engagement is scoped,
built and delivered by the Managing Director personally, with specialists
brought in as the work demands.

### Positioning

The current pitch deck (`brand/profile/pitch_content.py`) positions the
company as "a custom software house, not an ERP vendor". The ERP work
appears only as evidence of capability on complex systems.

Four practices:

- **Business systems**: operations platforms, CRM, inventory, documents
  and workflow that replace spreadsheets and disconnected tools.
- **AI implementation**: retrieval over the client's own documents,
  domain-tuned models and automation, with source attribution.
- **Finance workflows**: invoicing, bank-statement import, reconciliation
  and document generation, with an audit trail for the client's
  accountant. No accounting-engine or payroll-accuracy claims.
- **Cross-border operations**: multi-currency, multi-language systems
  for companies trading between Singapore, Japan and the region.

### Markets

- Singapore SMEs first.
- Japan, through cross-border trade (used-car export).
- Indonesia as an adjacent market.

### How engagements run

- Roughly 12 weeks: discovery, architecture, build, deployment, then
  support.
- A written scope and cost before any code.
- Deployed on the client's own cloud account, database and repository.
- Much of the work is rescue: rebuilding what an earlier vendor or an
  off-the-shelf tool did not deliver.
- Singapore's PSG grant used to lower the net cost in quotes. PSG closed
  on 29 September 2026; quotes now say whether a project may qualify for
  the EDGE Grant, with no percentage until Enterprise Singapore confirms it.

## Portfolio

The repositories sit alongside this one under `~/Projects/startech/`.
Status is as of 2026-09-28.

### Client work

| Area | Status |
| --- | --- |
| Operations system for a Japan used-car exporter | Live in production, most active client |
| Related demos: auction site, shipping tracker, export-site quote | Demo, prototype and research |
| ERP for a Singapore ground-transport operator | Pitch and scaffold, quiet since June |
| AI co-pilot and learning-coach work for an edtech partner | Closed mid-2026 |

### Products

| Product | Repository | Status |
| --- | --- | --- |
| Multi-tenant ERP with Singapore compliance (GST, CPF) | `startech_erp_java` | Most mature code, active |
| StarTech Central: accounting and compliance as a service for SMEs | `startech_central` | Planning only |
| Primary-school practice app for parents | `~/Projects/st_edu_sass` | Research only |

### Internal tools

- `st_dasboard`: the CEO dashboard, becoming "StarTech Hub".
- `ref/`: the internal knowledge base (services, grants, Singapore
  accounting fixtures).
- `homelab_template`: a reusable infrastructure template.
- `st_bible`: the internal handbook app.

### Related company

**Alliance Digital Concierge (VIPhealth)** is a separate company that the
Managing Director co-founded. It is a cross-border medical concierge for
Indonesian patients receiving care in Singapore. It is not a StarTech
product.

## Claims to keep honest

The capability deck (`brand/profile/pitch_content.py`, served as
`public/assets/startech-capability-deck-*.pdf`) used to state **"4
production systems delivered and live"**. Rewritten on 2026-11-02 in all
eight languages to what holds up:

1. Cross-border trading system (Japan): live with the client.
2. AI co-pilot (Singapore): delivered; the engagement completed in 2026.
3. Payroll engine: the ERP. Shown as an internal build, not yet deployed,
   with no accuracy claim.
4. Patient-owned health record: VIPhealth belongs to the related company,
   not StarTech, so it is no longer shown. Its slot now shows the working
   demos on both sites.

The deck no longer claims accounting engines or payroll compliance, gives
its markets as Singapore and Japan, and ends with the spreadsheet offer.
Re-check these lines whenever a client engagement starts or ends.

The A4 company profile (`brand/profile/content.py`) and the technical
profile deck (`brand/profile/deck_content.py`) were rewritten to the same
claims on 2026-11-02, in English and Indonesian. They had said "Singapore,
Indonesia", "strategy to production in 90 days" and, in the profile, that
StarTech runs PSG and SFEC applications. The technical deck also claimed
"5-engine verification" and "schema-per-tenant isolation". The ERP's own
August 2026 verification report contradicts both claims, so they were
removed. Its ERP test figures are now labelled as an internal build, not
deployed.

The website was brought in line on 2026-11-08, in all seven languages.
"Selected work" now shows two client systems (the Japan exporter, live;
the Singapore co-pilot, delivered in 2026) and the ERP as an internal
build, tested and not deployed, with no payroll, CPF or five-engine
claims. The health record is gone; a link to the working demos sits
below the cases instead. Practices, industries, objections and the demo
pages no longer claim payroll, general ledger, KYC and AML, Xero or
QuickBooks integration, HL7 and FHIR records or AI triage, and
healthcare gave way to trading and logistics. The EDGE answer says
Enterprise Singapore decides support and StarTech is not a pre-approved
EDGE vendor. The approach says about twelve weeks, not 90 days, and the
hero counts the site's seven languages. The hero's 7,060 figure is
labelled as the internal ERP build, not deployed. The ERP case said "51
REST controllers"; the ERP source has 115 classes annotated
`@RestController` (git HEAD c194396, 22 Sep 2026; 102 at the end of
August), so the site now says 115. The onboarding, contract-review,
training and financial-report demos describe drafts for HR, a lawyer, a
trainer or an accountant to review, with no CPF, Employment Act,
SkillsFuture, WSQ or financial-statement claims.

Other inconsistencies:

- The capability deck says its 7,060 tests are in "our Singapore payroll
  engine". They cover all 484 calculation classes in the ERP build, payroll
  included. The profile and technical deck say it that way.
- The site publishes `info@`, but the contact form delivers to Gmail, so
  enquiries arrive in two places. See [OPERATIONS.md](OPERATIONS.md).

## This repository

The public website. See [OPERATIONS.md](OPERATIONS.md) for hosting, email,
deploys and open issues.

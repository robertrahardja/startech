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
- **Financial and compliance systems**: accounting engines,
  reconciliation, payroll compliance and regulatory reporting.
- **Cross-border operations**: multi-currency, multi-jurisdiction systems
  across Singapore, Indonesia and Japan.

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

The pitch deck states **"4 production systems delivered and live"**. It
maps them as follows:

1. Cross-border trading system (Japan): live.
2. AI co-pilot (Singapore): client work.
3. Payroll engine: the ERP. It is not clearly running for a client in
   production.
4. Patient-owned health record: VIPhealth, which belongs to the related
   company, not StarTech.

Items 3 and 4 are the claims a technical prospect is most likely to probe.
Re-check the wording before the deck is used again.

Other inconsistencies:

- The older A4 profile (`brand/profile/content.py`) says "Singapore,
  Indonesia" and "strategy to production in 90 days". The newer deck says
  "Singapore, Japan".
- The site publishes `info@`, but the contact form delivers to Gmail, so
  enquiries arrive in two places. See [OPERATIONS.md](OPERATIONS.md).

## This repository

The public website. See [OPERATIONS.md](OPERATIONS.md) for hosting, email,
deploys and open issues.

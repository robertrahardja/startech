/**
 * Mailer: the RPC entrypoint hq (st-dasboard) sends email through. hq binds
 * it with a service binding:
 *
 *   [[services]]
 *   binding = "MAILER"
 *   service = "startech"
 *   entrypoint = "Mailer"
 *
 * It has no fetch handler and is not reachable over HTTP: only the default
 * export in worker/index.ts answers requests. hq cannot send mail itself
 * because the Resend key is a secret of this Worker only.
 *
 * Every method returns `{ ok: false, error }` instead of throwing, so a
 * refusal never surfaces in hq as an RPC exception.
 */

import { WorkerEntrypoint } from "cloudflare:workers";
import { notifyOwner, outreachStatus, sendOutreach, type MailerEnv } from "./mailer";
import type { OutreachMessage } from "./outreach-rules";
import type { SendResult, StatusResult } from "./resend";

export class Mailer extends WorkerEntrypoint<MailerEnv> {
  /** One outreach email from OUTREACH_FROM; refused without the unsubscribe and address footer. */
  send(message: OutreachMessage): Promise<SendResult> {
    return sendOutreach(this.env, message);
  }

  /** Resend's last event for a sent email: "delivered", "bounced", "complained"... */
  status(id: string): Promise<StatusResult> {
    return outreachStatus(this.env, id);
  }

  /** A plain-text email to StarTech's own inbox, such as hq's weekly report. */
  notifyOwner(subject: string, text: string): Promise<SendResult> {
    return notifyOwner(this.env, subject, text);
  }
}

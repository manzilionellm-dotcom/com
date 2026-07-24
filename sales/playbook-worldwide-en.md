# Closing playbook — worldwide English market

Language: English. Channel: WhatsApp. Currency: USD.

This is a script for a human operator. Nothing here is sent automatically. The
system drafts; a person sends.

## Rule zero — what counts as a sale

A sale exists when money has actually arrived: a Cryptomus payment confirmed,
or a payment you have personally verified. An opened chat, a sent payment link
and a promise to pay tomorrow are not sales and must not be recorded as such.

When a payment lands, record it immediately — it takes ten seconds and it is
the only thing that makes revenue measurable:

```
node scripts/sale.mjs confirm <ref_id> <plan> <amount> <expires_at> <consent>
```

The `<ref_id>` is the six-character reference at the end of the customer's
first message (`Ref: AB7XKD`). It ties the sale back to the page that produced
it. If the customer deleted it, pass `NONE` — an honestly unattributed sale is
worth more than a guessed one.

## 1. First reply — short

Answer within the hour if you can. Long opening messages lower reply rates.

> Hi! Happy to help. Which device will you watch on, and which channels or
> sport matter most to you?

## 2. Qualify — at most three questions

1. Which device? (Firestick, Smart TV, Android box, iPhone, MAG, PC)
2. What do they most want to watch? (a league, a country's channels, VOD)
3. How long do they want it for? (1, 3, 6 or 12 months)

Stop there. A fourth question costs more replies than it gains.

## 3. Recommend one plan

Recommend a single plan, not a menu. The customer already saw the menu on the
pricing page; a second menu restarts the decision.

- Undecided or first-time buyer → 1 month at $10. Low commitment, easy yes.
- Knows what they want → 3 months at $25 ($8.33/month).
- Price-driven, asks about discounts → 6 months at $35 or 12 months at $60.

Frame longer terms by what they save, using the real numbers: 12 months at $60
is $5/month against $10/month monthly — half price for committing up front.

## 4. Send the payment link

Send the link directly. Do not ask "would you like the link?" — that is an
extra round trip that loses people.

## 5. Objections — answer with facts, never with promises

| They say | Answer with |
|---|---|
| "Does it work in my country?" | The service is not region-locked. Take the 24h free trial and check on your own connection before paying. |
| "Will it buffer?" | Buffering is usually the local connection, not the stream. Test it free for 24h on the device you will actually use. |
| "Is it legal?" | Point to the terms page. Do not improvise claims about broadcasting rights. |
| "Can I get a refund?" | Yes — the 24h money-back guarantee as written on /refund. Quote the actual policy, not a friendlier version of it. |
| "Can I pay another way?" | Offer only the methods actually enabled in checkout. |
| "Give me a better price" | Do not invent discounts. Move them to a longer term, where the lower monthly price is real. |

Never write: "zero buffering", "100% guaranteed", "all channels", "unlimited",
"reply within 5 minutes". If it is not operationally true, it becomes a refund
and a bad review later.

## 6. Follow-up — twice, then stop

- **Day 1:** one short message. "Still thinking it over? Happy to answer
  anything." 
- **Day 3:** the last one. "Closing this off — the trial is here whenever you
  want it."

Then stop. After a purchase, a refusal, or silence following the day-3 message,
send nothing further. Continuing past this point is how WhatsApp Business
numbers get banned, which costs the entire conversion channel.

## 7. Renewal

Renewal is the cheapest revenue available: no acquisition cost. It is also the
fastest way to get banned if handled carelessly.

- Only for customers who explicitly agreed to be contacted about renewal
  (`consent = yes` when the sale was recorded).
- Day −7 from expiry: first reminder. Day −2: last one. Nothing after that.
- Payment confirmed, or a "no" → stop immediately.

Reminders are drafted into `outbox/<market>/` with the send date and the
consent record. A human reviews and sends them. The system never sends
outbound commercial messages by itself: unsolicited automated messaging
carries real penalties (CASL, GDPR, CAN-SPAM) and gets the number banned.

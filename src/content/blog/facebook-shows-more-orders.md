---
title: "Why Facebook shows more orders than you actually got"
description: "Your Ads Manager says 40 purchases, your order sheet says 25. The usual reasons, and how to fix them."
date: 2026-11-05
category: "Tracking"
author: "Ecommetrix Team"
---

This is one of the most common questions we get. Ads Manager shows one number, your order sheet shows another, and you do not know which one to trust.

## Reason 1: the same order is counted twice

If you use both the Meta Pixel (in the browser) and the Conversions API (from your server), each purchase is sent to Meta twice. That is good, because if one is blocked the other still gets through. But Meta needs an **event ID** on both to know they are the same order. Without it, one order becomes two.

**Fix:** send the same `event_id` from the Pixel and from the server for every purchase.

## Reason 2: the thank-you page is loaded again

Some sites fire the purchase event every time the thank-you page opens. If the customer refreshes, or comes back to the page from their email, it counts again.

**Fix:** fire the purchase event only once per order, for example by checking the order ID.

## Reason 3: cancelled and fake orders

Cash on delivery orders that get cancelled, returned or never confirmed still count as purchases in Meta. Your sheet only counts delivered orders.

**Fix:** compare with confirmed orders, not delivered ones, and keep in mind that the gap shows your cancellation rate too.

## Reason 4: attribution window

Meta gives credit to an ad if someone clicked it within 7 days or viewed it within 1 day before buying. Some of those people may have bought anyway.

**Fix:** check the attribution setting in your report columns, and judge results over a week or two, not one day.

## What we usually do

We check the Pixel and server events, add deduplication, make sure the purchase event fires once, and set up a simple sheet that compares Meta numbers with real confirmed orders. Once the numbers match, budget decisions get much easier.

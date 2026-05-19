"use client";

import { useEffect } from "react";
import { captureFromLocation } from "../lib/utm";
import { track } from "../lib/analytics";

/**
 * Mount once in the root layout. Captures UTM/click-id on first paint,
 * fires `page_view` for SPA navigations, exposes window.bivTrack for
 * inline handlers in legacy markup.
 */
export default function TrackingProvider() {
  useEffect(() => {
    captureFromLocation();
    track("page_view", {
      page: typeof location !== "undefined" ? location.pathname + location.search : undefined,
      label: typeof document !== "undefined" ? document.title : undefined,
    });

    // Expose for non-React inline handlers (footer links, etc.)
    type TW = Window & {
      bivTrack?: (event: string, payload?: Record<string, unknown>) => void;
    };
    (window as TW).bivTrack = (event, payload) =>
      track(event as Parameters<typeof track>[0], payload);

    // Track SPA-style navigations triggered by next/link
    let lastPath = location.pathname + location.search;
    const fire = () => {
      const current = location.pathname + location.search;
      if (current !== lastPath) {
        lastPath = current;
        track("page_view", { page: current });
      }
    };

    window.addEventListener("popstate", fire);
    // Patch pushState/replaceState to detect programmatic nav
    const origPush = history.pushState;
    const origReplace = history.replaceState;
    history.pushState = function (this: History, ...args: Parameters<History["pushState"]>) {
      const r = origPush.apply(this, args);
      fire();
      return r;
    };
    history.replaceState = function (this: History, ...args: Parameters<History["replaceState"]>) {
      const r = origReplace.apply(this, args);
      fire();
      return r;
    };

    return () => {
      window.removeEventListener("popstate", fire);
      history.pushState = origPush;
      history.replaceState = origReplace;
    };
  }, []);

  return null;
}

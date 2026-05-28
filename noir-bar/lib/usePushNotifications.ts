"use client";
import { useState, useEffect } from "react";

export function usePushNotifications(venueId: string) {
  const [supported, setSupported] = useState(false);
  const [subscribed, setSubscribed] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setSupported("serviceWorker" in navigator && "PushManager" in window);
    checkSubscription();
  }, []);

  async function checkSubscription() {
    if (!("serviceWorker" in navigator)) return;
    const reg = await navigator.serviceWorker.ready;
    const sub = await reg.pushManager.getSubscription();
    setSubscribed(!!sub);
  }

  async function subscribe() {
    setLoading(true);
    try {
      const reg = await navigator.serviceWorker.register("/sw.js");
      await navigator.serviceWorker.ready;

      const sub = await reg.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: "BFo14Ot6nPhZ3vAHFr1m3IdI9nXvw8ypBV0I-LpY02px9UlnxtM6nvNbjUUJsXcQVznxQCbugwvEHSfqYAPMGok",
      });

      await fetch("/api/admin/push-subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ subscription: sub.toJSON(), venueId }),
      });

      setSubscribed(true);
    } catch (e) {
      console.error("Error suscribiendo:", e);
    }
    setLoading(false);
  }

  async function unsubscribe() {
    setLoading(true);
    const reg = await navigator.serviceWorker.ready;
    const sub = await reg.pushManager.getSubscription();
    if (sub) await sub.unsubscribe();
    setSubscribed(false);
    setLoading(false);
  }

  return { supported, subscribed, loading, subscribe, unsubscribe };
}
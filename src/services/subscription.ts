'use server';

import { cookies } from "next/headers";
import { SubscriptionResponseType } from "../types/types";
import { API_TOKEN, API_URL } from "./articles";

const SUBSCRIPTION_COOKIE = "vercel-daily-news-subscription";
const SUBSCRIPTION_TOKEN_COOKIE = "vercel-daily-news-subscription-token";

export async function subscribeUser() {
  try {
    const path = `${API_URL}/subscription/create`

    const response = await fetch(path, {
      method: 'POST',
      headers: {
        'accept': 'application/json',
        'x-vercel-protection-bypass': API_TOKEN,
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to subscribe user: ${response.statusText}`);
    }
    const subData: SubscriptionResponseType = await response.json();
    if (subData.success) {
      const data: SubscriptionResponseType = await activateUser(String(subData.data?.token));
      if (data.success) {
        return { success: true, data: data.data}
      }
    }

    return { success: false }
  } catch (error) {
    return { error: `${error}: CATCH Failed to subscribe user.`, success: false }
  }
}

export async function activateUser(token: string): Promise<SubscriptionResponseType> {
  try {
    const path = `${API_URL}/subscription`

    const response = await fetch(path, {
      method: 'POST',
      headers: {
        'accept': 'application/json',
        'x-vercel-protection-bypass': API_TOKEN,
        'x-subscription-token': token
      },
    });

    if (!response.ok) {
      return {error: `Failed to activate user: ${response.statusText}`, success: false }
    }
    const data: SubscriptionResponseType = await response.json();

    return { success: true, data: data.data} as SubscriptionResponseType
  } catch (error) {
    return { error: `${error}: CATCH Failed to activate user.`, success: false } as SubscriptionResponseType
  }
}

export async function deactivateUser(token: string): Promise<SubscriptionResponseType> {
  try {
    const path = `${API_URL}/subscription`

    const response = await fetch(path, {
      method: 'DELETE',
      headers: {
        'accept': 'application/json',
        'x-vercel-protection-bypass': API_TOKEN,
        'x-subscription-token': token
      },
    });

    if (!response.ok) {
      return {error: `Failed to activate user: ${response.statusText}`, success: false }
    }
    const data: SubscriptionResponseType = await response.json();

    return { success: true, data: data.data} as SubscriptionResponseType
  } catch (error) {
    return { error: `${error}: CATCH Failed to deactivate user.`, success: false } as SubscriptionResponseType
  }
}


export async function checkUserSubscriptionState() {
  const cookieStore = await cookies();
  const subscriptionCookie = cookieStore.get(SUBSCRIPTION_COOKIE)?.value === "true";
  const subscriptionToken = cookieStore.get(SUBSCRIPTION_TOKEN_COOKIE)?.value;

  if (subscriptionToken && subscriptionCookie) {
    try {
      const path = `${API_URL}/subscription`
      
      const response = await fetch(path, {
        method: 'GET',
        headers: {
          'accept': 'application/json',
          'x-vercel-protection-bypass': API_TOKEN,
          'x-subscription-token': subscriptionToken,
        },
      });
      
      if (!response.ok) {
        throw new Error(`Failed to get subscription: ${response.statusText}`);
      }

      const data: SubscriptionResponseType = await response.json();

      if (data?.data?.status !== 'active') {
        clearCookies();
        return { success: false, error: 'User not active.' }
      }
      return { success: true, data: data.data}
    } catch (error) {
      return { error: `${error}: CATCH Failed to get subscription.`, success: false }
    }
  }

  return { success: false }
}

export async function setCookies(token: string): Promise<boolean | void> {
  const cookieStore = await cookies();

  cookieStore.set(SUBSCRIPTION_COOKIE, "true", {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
  });

  cookieStore.set(SUBSCRIPTION_TOKEN_COOKIE, token, {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
  });

  return true;
}

export async function clearCookies(): Promise<string> {
  const cookieStore = await cookies();
  const subscriptionToken = cookieStore.get(SUBSCRIPTION_TOKEN_COOKIE)?.value || '';

  cookieStore.delete(SUBSCRIPTION_COOKIE);
  cookieStore.delete(SUBSCRIPTION_TOKEN_COOKIE);

  return String(subscriptionToken);
}
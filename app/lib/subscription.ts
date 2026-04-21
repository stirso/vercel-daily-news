import { cookies } from "next/headers";
import { SubscriptionResponseType } from "./types";
import { API_TOKEN, API_URL } from "./articles";

const SUBSCRIPTION_COOKIE = "vercel-daily-news-subscription";
const SUBSCRIPTION_TOKEN_COOKIE = "vercel-daily-news-subscription-token";

export async function subscribeUser() {
  try {
    const path = `${API_URL}/subscriptions/create`

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

    const data: ResponseType = await response.json();
    return { success: true, data: data.data}
  } catch (error) {
    return { error: `${error}: CATCH Failed to subscribe user.`, success: false }
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

      console.log('check USER SUBSCRIPTION STATE > ', data)
      return { success: true, data: data.data}
    } catch (error) {
      return { error: `${error}: CATCH Failed to get subscription.`, success: false }
    }
  }

  return { success: false }
}
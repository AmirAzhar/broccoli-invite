import { InviteFormData } from "../components/InviteFormModal/InviteFormModal.d";
import { config } from "../config/config";

const { INVITE_API_URL } = config;

export async function submitInvite(
  data: InviteFormData
): Promise<{ success: boolean; errorMessage: string | null }> {
  try {
    const response = await fetch(INVITE_API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: data.fullName, email: data.email }),
    });
    if (response.ok) {
      return { success: true, errorMessage: null };
    } else {
      const errorData = await response.json();
      return {
        success: false,
        errorMessage: errorData.errorMessage || "An error occurred. Please try again.",
      };
    }
  } catch (error) {
    console.log(error);
    return { success: false, errorMessage: "Network error. Please try again." };
  }
}

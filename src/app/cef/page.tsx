import { redirect } from "next/navigation";
import { site } from "@/lib/site";

export default function CefPage() {
  redirect(site.cef2Path);
}

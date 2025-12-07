'use client'
import useLoginListener from "@/hooks/useLoginState";

export default function AuthListener() {
  useLoginListener();
  return null;
}